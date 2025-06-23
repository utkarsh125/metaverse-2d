import jwt, { JwtPayload } from "jsonwebtoken"

import { JWT_PASSWORD } from "./config";
import { OutgoingMessage } from "./types";
import { RoomManager } from "./RoomManager";
import { WebSocket } from "ws";
import client from "@metaverse/db/client"

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

    constructor(private ws: WebSocket){

        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;

    }

    initHandlers(){
        this.ws.on("message", async(data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type){

                //Case 1 to join the space
                case "join":{ 
                    const spaceId = parsedData.payload.spaceId;

                    const token = parsedData.payload.token;

                    const userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).userId

                    if(!userId){
                        this.ws.close()
                    }else{
                        this.userId = userId
                    }
                    RoomManager.getInstance().addUser(spaceId, this)

                    //get the space
                    const space = await client.space.findFirst({
                        where: {
                            id: spaceId
                        }
                    })

                    //close the connection if space doesn't exist
                    if(!space){
                       this.ws.close()
                       return
                    }

                    this.spaceId = spaceId;

                    RoomManager.getInstance().addUser(spaceId, this);
                    this.x = Math.floor(Math.random() * space?.width)
                    this.y = Math.floor(Math.random() * space?.height)
                    this.send({
                        type: "space-joined",
                        payload: {
                            
                            spawn: {
                                x: Math.floor(Math.random() * space.width),
                                y: Math.floor(Math.random() * space.height)
                            },
                            userId: RoomManager.getInstance().rooms.get(spaceId)?.map((u) => ({id: u.id})) ?? []
                        }
                    })

                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        oayload: {
                            userId: this.id,
                            x: this.x,
                            y: this.y
                        },
                        
                    }, this, this.spaceId!)
                    break;
                }


                case "move":
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const xDisplacement = Math.abs(this.x - moveX);
                    const yDisplacement = Math.abs(this.y - moveY);

                    if(xDisplacement == 1 && yDisplacement == 0 || (xDisplacement == 0 && yDisplacement == 1)){
                        this.x = moveX;
                        this.y = moveY;

                        RoomManager.getInstance().broadcast({
                            type: "move",
                            payload: {
                                x: this.x,
                                y: this.y,
                            }

                        }, this, this.spaceId!)
                    }
                    
                    this.send({
                        type: "movement-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    })

                    

            }
        })
    }


    destroy() {

        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.spaceId!)
        RoomManager.getInstance().removeUser(this, this.spaceId!)
    }

    send(payload: OutgoingMessage){
        this.ws.send(JSON.stringify(payload));
    }
}