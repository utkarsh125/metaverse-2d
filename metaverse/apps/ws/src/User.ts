import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { WebSocket } from "ws";
import client from "@metaverse/db/client";

function getRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export class User {
    public id: string;
    public userId?: string;
    public username: string;  // Make username required
    private spaceId?: string;
    private x: number;
    private y: number;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.id = getRandomString(10);
        this.username = "Anonymous";  // Default username
        this.x = 0;
        this.y = 0;
        this.ws = ws;
        this.initHandlers();
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            try {
                const parsedData = JSON.parse(data.toString());
                console.log("Received message:", parsedData);

                switch (parsedData.type) {
                    case "join":
                        const spaceId = parsedData.payload.spaceId;
                        const token = parsedData.payload.token;
                        const providedUsername = parsedData.payload.username;
                        
                        let userId: string;
                        
                        if (token) {
                            // Normal authentication flow
                            const decoded = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).userId;
                            if (!decoded) {
                                this.ws.close();
                                return;
                            }
                            userId = decoded;
                            
                            // Get username from database
                            const user = await client.user.findUnique({
                                where: { id: userId }
                            });
                            this.username = user?.username || providedUsername || this.username;
                        } else {
                            // Test mode - use provided username and test user ID
                            console.log("No token provided, using test mode");
                            userId = "test-user-" + this.id;
                            this.username = providedUsername || "Test User " + this.id;
                        }
                        
                        this.userId = userId;
                        const space = await client.space.findFirst({
                            where: {
                                id: spaceId
                            }
                        });

                        if (!space) {
                            this.ws.close();
                            return;
                        }

                        this.spaceId = spaceId;
                        this.x = parsedData.payload.x || Math.floor(Math.random() * space.width);
                        this.y = parsedData.payload.y || Math.floor(Math.random() * space.height);
                        
                        // Add user to room
                        RoomManager.getInstance().addUser(spaceId, this);

                        // Send current state to joining user
                        this.send({
                            type: "space-joined",
                            payload: {
                                users: RoomManager.getInstance().rooms.get(spaceId)
                                    ?.filter(u => u.id !== this.id)
                                    ?.map(u => ({
                                        userId: u.userId,
                                        username: u.username,
                                        x: u.x,
                                        y: u.y
                                    })) ?? []
                            }
                        });

                        // Notify others about new user
                        RoomManager.getInstance().broadcast({
                            type: "user-joined",
                            payload: {
                                userId: this.userId,
                                username: this.username,
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId);
                        break;

                    case "movement":
                        if (!this.spaceId) return;

                        const moveX = parsedData.payload.x;
                        const moveY = parsedData.payload.y;
                        const xDisplacement = Math.abs(this.x - moveX);
                        const yDisplacement = Math.abs(this.y - moveY);

                        // Allow only one tile movement at a time
                        if ((xDisplacement === 1 && yDisplacement === 0) || 
                            (xDisplacement === 0 && yDisplacement === 1)) {
                            this.x = moveX;
                            this.y = moveY;
                            RoomManager.getInstance().broadcast({
                                type: "movement",
                                payload: {
                                    userId: this.userId,
                                    x: this.x,
                                    y: this.y
                                }
                            }, this, this.spaceId);
                        } else {
                            // Reject invalid movement
                            this.send({
                                type: "movement-rejected",
                                payload: {
                                    x: this.x,
                                    y: this.y
                                }
                            });
                        }
                        break;

                    case "chat":
                        if (!this.spaceId) return;

                        const message = parsedData.payload.message;
                        if (message && typeof message === 'string' && message.trim().length > 0) {
                            RoomManager.getInstance().broadcast({
                                type: "chat",
                                payload: {
                                    userId: this.userId,
                                    username: this.username,
                                    message: message.trim()
                                }
                            }, this, this.spaceId);
                        }
                        break;
                }
            } catch (error) {
                console.error("Error handling message:", error);
                this.send({
                    type: "error",
                    payload: {
                        message: "Failed to process message"
                    }
                });
            }
        });
    }

    destroy() {
        if (this.spaceId) {
            RoomManager.getInstance().broadcast({
                type: "user-left",
                payload: {
                    userId: this.userId
                }
            }, this, this.spaceId);
            RoomManager.getInstance().removeUser(this, this.spaceId);
        }
    }

    send(payload: OutgoingMessage) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(payload));
        }
    }
}