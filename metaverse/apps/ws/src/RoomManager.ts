import { OutgoingMessage } from "./types";
import { User } from "./User";

export class RoomManager{

    rooms: Map<String, User[]> = new Map();

    static instance: RoomManager;

    private constructor(){

        this.rooms = new Map();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new RoomManager();
        }

        return this.instance;
    }

    public removeUser(user: User, spaceId: string) {
        if (!this.rooms.has(spaceId)) {
            return;
        }
        this.rooms.set(spaceId, (this.rooms.get(spaceId)?.filter((u) => u.userId !== user.userId) ?? []));
    }

    public addUser(spaceId: string, user: User){

        if(!this.rooms.has(spaceId)){
            this.rooms.set(spaceId, [user]);
            return;
        }

        // Check if user is already in the room (by userId, not connection id)
        const existingUsers = this.rooms.get(spaceId) ?? [];
        const userExists = existingUsers.some(u => u.userId === user.userId);
        
        if (!userExists) {
            this.rooms.set(spaceId, [...existingUsers, user]);
        } else {
            console.log(`[RoomManager] User ${user.userId} already exists in space ${spaceId}, not adding duplicate`);
        }
    }

    public broadcast(message: OutgoingMessage, user: User, roomId: String){

        if(!this.rooms.has(roomId)){
            return;
        }

        this.rooms.get(roomId)?.forEach((u) => {
            if( u.userId !== user.userId){
                u.send(message);
            }
        })

    }
}