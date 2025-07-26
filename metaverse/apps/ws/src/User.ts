import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { WebSocket } from "ws";
import client from "@metaverse/db/client";
import { checkWebSocketConnection, removeWebSocketConnection, listCurrentConnections } from "./rateLimit";

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
    public avatarId?: string;
    public avatarImageUrl?: string;
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
                        
                        let userData: any = null;
                        
                        if (token) {
                            // Normal authentication flow
                            const decoded = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).userId;
                            if (!decoded) {
                                this.ws.close();
                                return;
                            }
                            userId = decoded;
                            
                            // Get username and avatar from database
                            userData = await client.user.findUnique({
                                where: { id: userId },
                                include: {
                                    avatar: true
                                }
                            });
                            this.username = userData?.username || providedUsername || this.username;
                            this.avatarId = userData?.avatarId;
                            this.avatarImageUrl = userData?.avatar?.imageUrl;
                            
                            console.log(`[DEBUG] User ${this.username} (${userId}) avatar info:`, {
                                avatarId: this.avatarId,
                                avatarImageUrl: this.avatarImageUrl
                            });
                        } else {
                            // Test mode - use provided username and consistent test user ID
                            console.log("No token provided, using test mode");
                            // Use username as the basis for user ID to prevent multiple connections
                            const testUsername = providedUsername || "Test User";
                            userId = "test-user-" + testUsername.toLowerCase().replace(/\s+/g, '-');
                            this.username = testUsername;
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

                        // Check if user is already connected to this space
                        console.log(`[User] Checking connection for user ${userId} to space ${spaceId}`);
                        const canConnect = await checkWebSocketConnection(userId, spaceId);
                        if (!canConnect) {
                            console.log(`[User] Connection denied for user ${userId} to space ${spaceId} - already connected`);
                            this.send({
                                type: "error",
                                payload: {
                                    message: "You are already connected to this space from another session."
                                }
                            });
                            this.ws.close();
                            return;
                        }
                        console.log(`[User] Connection allowed for user ${userId} to space ${spaceId}`);
                        
                        // Debug: log current connections
                        listCurrentConnections();

                        this.spaceId = spaceId;
                        this.x = parsedData.payload.x || Math.floor(Math.random() * space.width);
                        this.y = parsedData.payload.y || Math.floor(Math.random() * space.height);
                        
                        // Add user to room (RoomManager will check for duplicates)
                        RoomManager.getInstance().addUser(spaceId, this);

                        // Send current state to joining user
                        this.send({
                            type: "space-joined",
                            payload: {
                                users: RoomManager.getInstance().rooms.get(spaceId)
                                    ?.filter(u => u.userId !== this.userId)
                                    ?.map(u => ({
                                        userId: u.userId,
                                        username: u.username,
                                        x: u.x,
                                        y: u.y,
                                        avatarId: u.avatarId,
                                        avatarImageUrl: u.avatarImageUrl
                                    })) ?? []
                            }
                        });

                        // Send the user's own avatar information to themselves
                        console.log(`[DEBUG] Sending user-avatar-update to ${this.username}:`, {
                            userId: this.userId,
                            avatarId: this.avatarId,
                            avatarImageUrl: this.avatarImageUrl
                        });
                        this.send({
                            type: "user-avatar-update",
                            payload: {
                                userId: this.userId,
                                avatarId: this.avatarId,
                                avatarImageUrl: this.avatarImageUrl
                            }
                        });

                        // Notify others about new user
                        if (this.spaceId) {
                            console.log(`[DEBUG] Broadcasting user-joined for ${this.username}:`, {
                                userId: this.userId,
                                username: this.username,
                                avatarId: this.avatarId,
                                avatarImageUrl: this.avatarImageUrl
                            });
                            RoomManager.getInstance().broadcast({
                                type: "user-joined",
                                payload: {
                                    userId: this.userId,
                                    username: this.username,
                                    x: this.x,
                                    y: this.y,
                                    avatarId: this.avatarId,
                                    avatarImageUrl: this.avatarImageUrl
                                }
                            }, this, this.spaceId);
                        }
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
        if (this.spaceId && this.userId) {
            console.log(`[User] Destroying user ${this.userId} from space ${this.spaceId}`);
            
            // Remove WebSocket connection tracking
            removeWebSocketConnection(this.userId, this.spaceId);
            
            RoomManager.getInstance().broadcast({
                type: "user-left",
                payload: {
                    userId: this.userId
                }
            }, this, this.spaceId);
            RoomManager.getInstance().removeUser(this, this.spaceId);
            
            // Debug: list current connections
            listCurrentConnections();
        }
    }

    send(payload: OutgoingMessage) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(payload));
        }
    }
}