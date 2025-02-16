import { container } from '@infrastructures/di/inversify.config';
import { TYPES } from '@infrastructures/di/types';
//import { IRedisClient } from '@infrastructures/interfaces/IRedisClient';
import { IRedisJsonClient } from '@infrastructures/interfaces/IRedisJsonClient';
import { RedisModules } from '@infrastructures/implements/RedisJsonClient';
import { IConfigSettings } from '@middlewares/ConfigMiddleware'
import { App, TemplatedApp, SHARED_COMPRESSOR, WebSocket } from 'uWebSockets.js';
import { RedisClientType } from 'redis';
import cookie from 'cookie';
import crypto from 'crypto';
import { SessionData as OriSessionData, Cookie } from 'express-session';

export type ProtectedSessionData = Omit<OriSessionData, 'cookie'> & {
    readonly cookie: Cookie;
}

export type SessionData = Omit<OriSessionData, 'cookie'>;

export interface IWebSocketUserData {
    Promises: Promise<void>[];
    SessionIdPrefix: string;
    SessionId: string;    
    GetSession: () => Promise<Nullable<ProtectedSessionData>>;
    SetSession: (sessionData: SessionData) => Promise<void>;
    CloseSession: () => Promise<void>;    
};

export interface WebSocketUserDataOption {
    SessionIdPrefix: string;
    SessionId: string;
}

export class WebSocketUserData implements IWebSocketUserData {    
    public readonly Promises: Promise<void>[];
    public readonly SessionIdPrefix: string;
    public readonly SessionId: string;
        
    public readonly GetSession: () => Promise<Nullable<ProtectedSessionData>>;
    public readonly SetSession: (sessionData: SessionData) => Promise<void>;
    public readonly CloseSession: () => Promise<void>;

    private readonly GetRedisSessionKey: () => string;
    private readonly RedisClient: RedisClientType<RedisModules>;
    private _cookieInfoCache?: Cookie;    

    constructor(opts: WebSocketUserDataOption) {
        this.Promises = [];
        this.SessionIdPrefix = opts.SessionIdPrefix;
        this.SessionId = opts.SessionId;

        //const redisWrapper = container.get<IRedisClient>(TYPES.IRedisClient);
        const redisWrapper = container.get<IRedisJsonClient>(TYPES.IRdiesJsonClient);
        this.RedisClient = redisWrapper.GetClient();
        
        this.GetRedisSessionKey = () => {
            return `${this.SessionIdPrefix}${this.SessionId}`;
        };
        this.GetSession = async () => { 
            let result: Nullable<ProtectedSessionData> = null;
            const redisSessionKey = this.GetRedisSessionKey();
            if(this.RedisClient && redisSessionKey){
                if(!this.RedisClient.isOpen){
                    await this.RedisClient.connect();
                }
                //const sessionJson = await this.RedisClient.get(redisSessionKey);
                const sessionJson = await this.RedisClient.json.get(redisSessionKey);
                if (sessionJson) {
                    //result = JSON.parse(sessionJson) as ProtectedSessionData;
                    result = sessionJson as unknown as ProtectedSessionData;

                    // Cache the cookie info
                    this._cookieInfoCache = result.cookie;
                }
            }
            return result;
        };
        this.SetSession = async (sessionData: SessionData) => {
            const redisSessionKey = this.GetRedisSessionKey();
            if(this.RedisClient && redisSessionKey){
                if(!this.RedisClient.isOpen){
                    await this.RedisClient.connect();
                }

                //If no cookie info cached, getting it from Redis
                if(!this._cookieInfoCache){
                    await this.GetSession();
                }

                if(!this._cookieInfoCache){
                    throw Error("The cookie info is not included in the session!");
                }
                const newSessionData: ProtectedSessionData= {                    
                    // Make sure the cookie info is mutable
                    cookie: this._cookieInfoCache,
                    ...sessionData
                }
                //await this.RedisClient.set(redisSessionKey, JSON.stringify(newSessionData));
                await this.RedisClient.json.set(redisSessionKey, '$', newSessionData as any);
            }
        };
        this.CloseSession = async() => {
            if(this.RedisClient && this.RedisClient.isOpen){
                await this.RedisClient.quit();
            }
        }
    }
}

export interface WebSocketAppBaseOption {
    onOpen?: (ws: WebSocket<IWebSocketUserData>) => void | Promise<void>;
    onMessaging?: (ws: WebSocket<IWebSocketUserData>, message: ArrayBuffer, isBinary: boolean) => any | Promise<any>;
    onMessaged?: (ws: WebSocket<IWebSocketUserData>, message: ArrayBuffer, isBinary: boolean, returnVal?: any) => void | Promise<void>;
    onDrain?: (ws: WebSocket<IWebSocketUserData>) => void;
    onClose?: (ws: WebSocket<IWebSocketUserData>, code: number, message: ArrayBuffer) => void | Promise<void>;
}

export class WebSocketAppBase {
    private _app: TemplatedApp;
    private _configs: IConfigSettings;

    private _onOpen?: (ws: WebSocket<IWebSocketUserData>) => void | Promise<void>;
    private _onMessaging?: (ws: WebSocket<IWebSocketUserData>, message: ArrayBuffer, isBinary: boolean) => any | Promise<any>;
    private _onMessaged?: (ws: WebSocket<IWebSocketUserData>, message: ArrayBuffer, isBinary: boolean, returnVal?: any) => void | Promise<void>;
    private _onDrain?: (ws: WebSocket<IWebSocketUserData>) => void;
    private _onClose?: (ws: WebSocket<IWebSocketUserData>, code: number, message: ArrayBuffer) => void | Promise<void>;

    public get app(): TemplatedApp {
        return this._app;
    }

    public get configs(): IConfigSettings {
        return this._configs;
    }

    constructor(opts: WebSocketAppBaseOption) {
        this._app = App();

        // Initialize the configs
        this._configs = container.get<IConfigSettings>(TYPES.IConfigSettings);

        // Assign event callbacks
        this._onOpen = opts.onOpen;
        this._onMessaging = opts.onMessaging;
        this._onMessaged = opts.onMessaged;
        this._onDrain = opts.onDrain;
        this._onClose = opts.onClose;

        //Initialize web socket
        this.initializeWebSocket();
    }

    // Normalize the function to asynchronized one
    // for resolve the uncertainty
    private invokeAsync<T>(
        func: (...args: any[]) => T | Promise<T>,
        ...args: any[]
    ): Promise<T> {
        if (func.constructor.name === "AsyncFunction") {
            return func(...args) as Promise<T>; // Call async function directly
        } else {
            return Promise.resolve(func(...args)); // Wrap sync function result in a Promise
        }
    }

    // Validating the seesion is fruaded or not
    private validateSessionId(
        sessionId: string, 
        sessionHash: string) {        
    
        if (!sessionId || !sessionHash) {
            return false; // Invalid structure
        }
    
        // Recompute the hash using the session ID and secret
        const computedHash = crypto
            .createHmac('sha256', this._configs.SessionSecret)
            .update(sessionId)
            .digest('base64')
            .replace(/=+$/, ''); // Remove trailing '=' to match express-session
    
        // Compare the computed hash with the hash from the cookie
        return computedHash === sessionHash;
    }

    // Use uWebSoeckt.js & asynchronous control with Promise to make a consistent flow logic
    private initializeWebSocket() {
        // Make the asynchronous methods run as the same sequential order
        // Always compatiable with the following sequence: 
        //   1. open 
        //   2. message
        //   3. close
        const openHandler = async (ws: WebSocket<IWebSocketUserData>) => {
            const wsData = ws.getUserData();

            const doLogic = async () => {
                try {
                    if(this._onOpen){
                        await this.invokeAsync(this._onOpen, ws);
                    }
                    
                    return Promise.resolve<void>(void 0);
                } catch(e) {
                    return Promise.reject<void>(e);
                }
            }
            const result = doLogic();
            wsData.Promises.push(result);
            return result;
        }

        const messageHandler = async (
            ws: WebSocket<IWebSocketUserData>,
            message: ArrayBuffer, 
            isBinary: boolean
        ) => {
            const wsData = ws.getUserData();
            const doLogic = async () => {
                try {
                    // Wait until the connection built successfully
                    await Promise.all(wsData.Promises);

                    // Preceed to run the onMessaging event
                    let returnVal: any;
                    if(this._onMessaging){
                        returnVal = await this.invokeAsync(this._onMessaging, ws, message, isBinary);
                    }

                    // The post-processing after the onMessaging event finished
                    return Promise.resolve<void>(void 0)
                                  .then(async () => {
                                        if(this._onMessaged){
                                            await this.invokeAsync(this._onMessaged, ws, message, isBinary, returnVal);
                                        }
                                   });
                } catch(e) {
                    return Promise.reject<void>(e);
                }
            }
            const result = doLogic();
            wsData.Promises.push(result);
            return result;
        }

        this._app.ws<IWebSocketUserData>('/*', {
            /* Options */
            compression: SHARED_COMPRESSOR,
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 10,
            /* Handlers */
            upgrade: (res, req, context) => {
                const cookieHeader = req.getHeader('cookie');
                if (!cookieHeader) {
                    res.writeStatus('401 Unauthorized').end();
                    return;
                }

                // Get the session cookie with same-site orign
                const cookies = cookie.parse(cookieHeader);
                const connectSid = cookies['connect.sid'];
                if (!connectSid || !connectSid.startsWith('s:')) {
                    res.writeStatus('401 Unauthorized').end();
                    return;
                }
            
                // Get the session id & the HMAC validation hash string
                const [sessionId, sessionHash] = connectSid.slice(2).split('.');
                // Validate whether the session id is fruaded or not
                if (!this.validateSessionId(sessionId, sessionHash)) {
                    res.writeStatus('401 Unauthorized').end();
                    return;
                }
                
                // Upgrade the http connection to websocket connection
                res.upgrade<IWebSocketUserData>(
                    new WebSocketUserData({
                        SessionIdPrefix: this._configs.SessionIdPrefix,
                        SessionId: sessionId
                    }),
                    req.getHeader('sec-websocket-key'),
                    req.getHeader('sec-websocket-protocol'),
                    req.getHeader('sec-websocket-extensions'),
                    context
                );
            },
            // The original callback didn't promise the order of async function,
            // Wrap it to keep the order persistent
            open: openHandler,
            // Same as above
            message: messageHandler,
            drain: (ws) => {
                if(this._onDrain){
                    this._onDrain(ws); 
                }
            },
            close: (ws, code, message) => {
                const wsData = ws.getUserData();
                Promise.all(wsData.Promises)
                       .then(async () => {
                            if(this._onClose){
                                await this.invokeAsync(this._onClose, ws, code, message);
                            }
                       });              
            }
        });
    }
}