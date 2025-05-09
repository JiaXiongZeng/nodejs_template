import { WebSocket } from 'uWebSockets.js';

export interface ChatRoom {
    Id: string;
    Members: string[];
    Messages: ChatMessage[];
}

interface ChatMessage {
    Sender: string;
    Content: string;
    Timestamp: Date;
}

export type WsReqMessage = {
    MessageId: string,
    Type: WsReqMessageType,
    //Parameters?: any[]
} & Record<string, any>;

enum WsReqMessageType {
    JoinRoom = "joinRoom",
    SendMessage = "sendMessage",
    UpdateStatus = "updateStatus",
}

enum WsResMessageType {
    NewMessage = "newMessage",
}

type WsReqMessageHandler<T> = (ws: WebSocket<T>, data: WsReqMessage) => void;

export interface WsResMessage {
    MessageId: string,
    Status: WsResMessageStatus,
    Type: WsReqMessageType | WsResMessageType,
    Message?: string,
    Payload?: any
}

export enum WsResMessageStatus {
    Success = 0,
    Warn = 5,
    Error = 10,
    Failure = 20
}

export enum UserStatus {
    Online = "online",
    Offline = "offline",
    Idle = "idle"
}

interface broadcastParams {
    group: BroadcastGroup,
    roomId?: string,
    message: WsResMessage
}

enum BroadcastGroup {
    Friends = "frineds",
    ChatRoom = "chatroom",
}

export class MessageHandlerProvider<T> {
    private handlers: Record<string, WsReqMessageHandler<T>> = {};

    constructor(
        private wsConns: Record<string, WebSocket<T>>,
        private chatRooms: Record<string, ChatRoom>,
        private userStatus: Record<string, UserStatus>
    ) {
        this.registerHandlers();
    }

    private registerHandlers() {
        this.handlers[WsReqMessageType.JoinRoom] = this.handleJoinRoom.bind(this);
        this.handlers[WsReqMessageType.SendMessage] = this.handleSendMessage.bind(this);
        this.handlers[WsReqMessageType.UpdateStatus] = this.handleUpdateStatus.bind(this);
    }

    public handleMessage(ws: WebSocket<T>, data: WsReqMessage) {
        const handler = this.handlers[data.Type];
        if (handler) {
            handler(ws, data);
        } else {
            const errorMsg: WsResMessage = {
                MessageId: data.MessageId,
                Status: WsResMessageStatus.Error,
                Type: data.Type,
                Message: 'Unknown message type'
            };
            ws.sendObject(errorMsg);
        }
    }

    private handleJoinRoom(ws: WebSocket<T>, data: WsReqMessage) {
        const { UserId: userId, RoomId: roomId } = data;
        // Check if room exists
        if (!this.chatRooms[roomId]) {
            const errorMsg: WsResMessage = {
                MessageId: data.MessageId,
                Status: WsResMessageStatus.Error,
                Type: data.Type,
                Message: 'Chatroom does not exist'
            };
            ws.sendObject(errorMsg);
            return;
        }

        // Push the member into chatroom (Temporary)
        const members = this.chatRooms[roomId].Members;
        if(members.indexOf(userId) == -1){
            members.push(userId);
        }

        // Successfully response
        const resMsg: WsResMessage = {
            MessageId: data.MessageId,
            Status: WsResMessageStatus.Success,
            Type: data.Type,
            Message: `User [${userId}] joined room [${roomId}]`
        }

        // Broadcast message to room members
        this.broadcastToRoom({
            group: BroadcastGroup.ChatRoom,
            roomId: roomId, 
            message: resMsg
        });
    }

    private handleSendMessage(ws: WebSocket<T>, data: WsReqMessage) {
        const { RoomId: roomId, Sender: sender, Content:content } = data;
        if (!this.chatRooms[roomId]) {
            const errorMsg: WsResMessage = {
                MessageId: data.MessageId,
                Status: WsResMessageStatus.Error,
                Type: data.Type,
                Message: 'Chatroom does not exist'
            };
            ws.sendObject(errorMsg);
            return;
        }
        
        // Add message to chat room
        const message: ChatMessage = {
            Sender: sender,
            Content: content,
            Timestamp: new Date()
        };
        this.chatRooms[roomId].Messages.push(message);

        // Successfully response
        const resMsg: WsResMessage = {
            MessageId: data.MessageId,
            Status: WsResMessageStatus.Success,
            Type: WsResMessageType.NewMessage,
            Payload: {
                RoomId: roomId,
                Message: message
            }
        };

        // Broadcast message to room members
        this.broadcastToRoom({
            group: BroadcastGroup.ChatRoom,
            roomId: roomId, 
            message: resMsg
        });
    }

    private handleUpdateStatus(ws: WebSocket<T>, data: WsReqMessage) {
        const { UserId: userId, Status: status } = data;

        // Update user status (Temporary)
        this.userStatus[userId] = status;

        // Successfully response
        const resMsg: WsResMessage = {
            MessageId: data.MessageId,
            Status: WsResMessageStatus.Success,
            Type: data.Type,
            Payload: {
                UserId: userId,
                Status: status
            }
        }

        // Broadcast status update to all users
        this.broadcastToRoom({
            group: BroadcastGroup.Friends,
            message: resMsg
        });
    }

    private broadcastToRoom(params: broadcastParams): void {
        const { group, roomId, message } = params;
        switch (group) {
            case BroadcastGroup.ChatRoom:
                if(roomId){
                    const theRoom = this.chatRooms[roomId];
                    if (theRoom) {
                        const roomMembers = theRoom.Members;
                        roomMembers.forEach((memberId) => {
                            const theWs = this.getSocketByUserId(memberId);
                            if (theWs) {
                                theWs.sendObject(message);
                            }
                        });
                    }
                }
                break;
            case BroadcastGroup.Friends:
                //Not implemented (Shoud be friends list in the session)
                for(const userId in this.wsConns){
                    this.wsConns[userId].sendObject(message);
                }
                break;
        }
    }

    private getSocketByUserId(userId: string): Nullable<WebSocket<T>> {
        if(this.wsConns && this.wsConns[userId]){
            return this.wsConns[userId];
        }
        return null;
    }
}