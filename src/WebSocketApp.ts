import { WebSocketAppBase, IWebSocketUserData } from "@infrastructures/implements/WebSocketAppBase.js";
import { WebSocket } from 'uWebSockets.js';
import { MessageHandlerProvider, ChatRoom, UserStatus, 
         WsReqMessage, WsResMessage, WsResMessageStatus } from '@webSocket/providers/ChatMessageHandlerProvider.js';

export class WebSocketApp extends WebSocketAppBase {
    private readonly _wsConns: Record<string, WebSocket<IWebSocketUserData>> = {};
    private readonly _rooms: Record<string, ChatRoom> = {
        'room1': {
            Id: 'room1',
            Members: [],
            Messages: []
        }
    };
    private readonly _users: Record<string, UserStatus> = {};
    private readonly _messageHandlerProvider = new MessageHandlerProvider<IWebSocketUserData>(this._wsConns, this._rooms, this._users);

    constructor(){
        super({
            onOpen: async (ws) => {
                //Test asynchronous operation
                await Promise.resolve<void>(void 0);

                //Get the login info while webSocket connection built
                const wsData = ws.getUserData();
                const session = await wsData.GetSession();
                const loginId = session?.LoginUser.Id;
                if(!loginId){
                    return;
                }

                const prevConn = this._wsConns[loginId];
                if(prevConn){
                    try{
                        prevConn.close();
                    }catch{
                        //Do nothing
                    }
                }
                this._wsConns[loginId] = ws;
            },
            onMessaging: async (ws, message, isBinary) => {
                // console.log("Receive message from client: " + Buffer.from(message).toString('utf8'));
                // const wsData = ws.getUserData();

                // const original = await wsData.GetSession();
                // await wsData.SetSession({
                //     LoginUser: {
                //         Id: "Good",
                //         Name: "Hi",
                //         Password: "Day",
                //         Email: "",
                //         Roles: ["admin"],
                //         Resources: ['id4']
                        
                //     }
                // });

                // return 1;

                // const status = ws.send(message, isBinary);
                // return status;

                try {
                    //GetSession will interfere the buffer
                    //Cache message first
                    const strMsg = Buffer.from(message).toString('utf8');
                    const data: WsReqMessage = JSON.parse(strMsg);

                    //Always validate login status while messaging
                    const wsData = ws.getUserData();
                    const session = await wsData.GetSession();
                    if(!session){
                        const errorMsg: WsResMessage = {
                                        MessageId: data.MessageId,
                                        Status: WsResMessageStatus.Error,
                                        Type: data.Type,
                                        Message: 'Session expired!'
                                    };
                        ws.sendObject(errorMsg);

                        //If session expired, automatically closing the connection
                        ws.close();
                        return;
                    }
                    
                    this._messageHandlerProvider.handleMessage(ws, data);
                } catch(e) {
                    console.error(e);
                }
            },
            onMessaged: (ws, message, isBinary, returnVal) => {
                const ok:number = returnVal;
                if(ok == 1){
                    ws.close();
                }
            },
            onDrain: (ws) => {
                // Check ws.getBufferedAmount(). 
                // Use this to guide / drive your backpressure throttling.
                console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
            },
            onClose: async (ws, code, message) => {
                const wsData = ws.getUserData();
                await wsData.CloseSession();
                console.log('WebSocket closed');
            }
        });
    }
}