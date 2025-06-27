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
    private spaceId?: string;
    private x: number;
    private y: number;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;
        this.ws = ws;
        this.initHandlers()
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            console.log(data)
            const parsedData = JSON.parse(data.toString());
            console.log(parsedData)
            console.log("parsedData")
            switch (parsedData.type) {
                case "join":
                    console.log("join received")
                    const spaceId = parsedData.payload.spaceId;
                    const token = parsedData.payload.token;
                    
                    let userId: string;
                    
                    if (token) {
                        // Normal authentication flow
                        const decoded = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).userId;
                        if (!decoded) {
                            this.ws.close()
                            return
                        }
                        userId = decoded;
                    } else {
                        // Test mode - use a test user ID
                        console.log("No token provided, using test mode");
                        userId = "test-user-" + this.id;
                    }
                    
                    console.log("join received 2")
                    this.userId = userId
                    const space = await client.space.findFirst({
                        where: {
                            id: spaceId
                        }
                    })
                    console.log("join received 3")
                    if (!space) {
                        this.ws.close()
                        return;
                    }
                    console.log("join received 4")
                    this.spaceId = spaceId
                    RoomManager.getInstance().addUser(spaceId, this);
                    this.x = Math.floor(Math.random() * space?.width);
                    this.y = Math.floor(Math.random() * space?.height);
                    this.send({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                            users: RoomManager.getInstance().rooms.get(spaceId)?.filter(x => x.id !== this.id)?.map((u) => ({id: u.id})) ?? []
                        }
                    });
                    console.log("join received 5")
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,
                            x: this.x,
                            y: this.y
                        }
                    }, this, this.spaceId!);
                    break;
                case "move":
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const xDisplacement = Math.abs(this.x - moveX);
                    const yDisplacement = Math.abs(this.y - moveY);
                    if ((xDisplacement == 1 && yDisplacement== 0) || (xDisplacement == 0 && yDisplacement == 1)) {
                        this.x = moveX;
                        this.y = moveY;
                        RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                userId: this.userId,
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId!);
                        return;
                    }
                    
                    this.send({
                        type: "movement-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    });
                    break;
                case "chat":
                    const message = parsedData.payload.message;
                    if (message && typeof message === 'string' && message.trim().length > 0) {
                        // Get user info from database
                        const user = await client.user.findUnique({
                            where: { id: this.userId }
                        });
                        
                        RoomManager.getInstance().broadcast({
                            type: "chat",
                            payload: {
                                userId: this.userId,
                                username: user?.username || 'Anonymous',
                                message: message.trim()
                            }
                        }, this, this.spaceId!);
                    }
                    break;
            }
        });
    }

    destroy() {
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.spaceId!);
        RoomManager.getInstance().removeUser(this, this.spaceId!);
    }

    send(payload: OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}