import { v4 as uuidv4 } from 'uuid';

enum WebSocketRequestStatus {
    Pending,
    Executed,
    Failed
}

type RequestInfo = {
    MessageId: string
} & Record<string, any>

export enum WebSocketConnStatus {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

export class WebSocketOrdinalMessageUtility {
    private url: string;
    private ws!: WebSocket;
    private requestStatusLog: Map<string, WebSocketRequestStatus>;
    private requestStatusLogClear!: NodeJS.Timeout;
    private promises: Promise<any>[];
    
    /**
     * Global on web socket open event
     */
    public onOpen?: (e: Event) => void;
    /**
     * Global on web socket close event
     */
    public onClose?: (e: CloseEvent) => void;
    /**
     * Global on web socket error event
     */
    public onError?: (e: Event) => void;
    /**
     * Global on web socket message event
     */
    public onMessage?: (e: MessageEvent) => void;

    constructor(url: string){
        this.url = url;
        this.requestStatusLog = new Map<string, WebSocketRequestStatus>();
        this.promises = [];
    }

    /**
     * Connect to web socket
     * @returns 
     */
    public async Open(): Promise<boolean> {
        // Initialize web socket
        this.ws = new WebSocket(this.url);

        // Empty status log
        this.requestStatusLog.clear();

        // Close the clear
        if(this.requestStatusLogClear){
            try {
                clearInterval(this.requestStatusLogClear);
            } catch(e) {
                //Do nothing
            }
        }

        // Initialize web socket event handlers
        if(this.onOpen){
            this.ws.addEventListener('open', this.onOpen);
        }

        if(this.onClose){
            this.ws.addEventListener('close', this.onClose);
        }

        if(this.onError){
            this.ws.addEventListener('error', this.onError);
        }

        if(this.onMessage){
            this.ws.addEventListener('message', this.onMessage);
        }

        const result = new Promise<boolean>((resolve, reject) => {
            const onOpenSuccess = (_e: Event) => {
                resolve(true);
                this.ws.removeEventListener('open', onOpenSuccess);

                //Periodically clean up the executed or failed request history
                //The frequency is 1 time per 60 seconds
                this.requestStatusLogClear = setInterval(() => {
                    this.requestStatusLog.forEach((val, key, map) => {
                        if(val != WebSocketRequestStatus.Pending){
                            map.delete(key);
                        }
                    })
                }, 60 * 1000);
            }

            const onOpenFailed = (e: Event) => {
                reject(e);
                this.ws.removeEventListener('error', onOpenFailed);
            }

            this.ws.addEventListener('open', onOpenSuccess);
            this.ws.addEventListener('error', onOpenFailed);
        });
        
        this.promises = [];
        this.promises.push(result);
        return result;
    }

    /**
     * Check the connection is opened or not
     * @returns 
     */
    public IsOpen(): boolean {
        return (this.ws.readyState == WebSocketConnStatus.OPEN);
    }

    /**
     * Close from web socket
     * @param code user defined code for close connection
     * @param reason user defined reason for close connection
     */
    public async Close(code?: number, reason?: string): Promise<void> {
        await Promise.all(this.promises);

        if(!this.IsOpen()){
            return;
        }

        try {
            this.ws.close(code, reason);
        } catch(e) {
            //console.log(e);
        }

        if(this.requestStatusLogClear){
            clearInterval(this.requestStatusLogClear);
        }
    }

    /**
     * Send message to server by web socket
     * @param message message object
     * @returns a strong typed promise for post-processing
     */
    public async Send<T>(message: object): Promise<T> {
        // //If connection loss, try to reconnect the websocket
        // if(!this.IsOpen()){
        //     await this.Open();
        //     //Delay 0.5 second for server side initailization
        //     await new Promise<void>(resolve => {
        //         setTimeout(() => {
        //             resolve(void 0);
        //         }, 0.5 * 1000);
        //     });
        // }

        const uuid = uuidv4();

        const requestInfo: RequestInfo = {
            MessageId: uuid,
            ...message
        };

        const result = new Promise<T>((resolve, reject) => {
            const onMessageSent = (e: MessageEvent) => {
                const data: RequestInfo = JSON.parse(e.data);
                if(data.MessageId && this.requestStatusLog.has(data.MessageId)){
                    this.requestStatusLog.set(data.MessageId, WebSocketRequestStatus.Executed);
                    const { MessageId, ...rest } = data;
                    resolve(rest as T);
                    this.ws.removeEventListener('message', onMessageSent);
                }                
            }

            // const onMessageFailed = (evt: Event) => {
            //     reject(evt);
            //     this.ws.removeEventListener('error', onMessageFailed);
            // }

            this.ws.addEventListener('message', onMessageSent);
            //this.ws.addEventListener('error', onMessageFailed);

            try {
                this.requestStatusLog.set(uuid, WebSocketRequestStatus.Pending);
                this.ws.send(JSON.stringify(requestInfo));
            } catch(err) {
                this.requestStatusLog.set(uuid, WebSocketRequestStatus.Failed);
                reject(err);
            }
        });

        return result;
    }
}