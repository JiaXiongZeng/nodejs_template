export enum MessageStatus {
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

export enum RequestMessageType {
    JoinRoom = "joinRoom",
    SendMessage = "sendMessage",
    UpdateStatus = "updateStatus",
}

export enum ResponseMessageType {
    NewMessage = "newMessage",
}

export interface ResponseMessage {
    Status: MessageStatus,
    Type: RequestMessageType | ResponseMessageType,
    Message?: string,
    Payload?: any
}