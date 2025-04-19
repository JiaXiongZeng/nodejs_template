import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import config from 'config';

// Augment the Request interface globally
declare global {
  namespace Express {
    interface Request {
      config: IConfigSettings;
    }
  }
}

// Configuration Structure
export interface IConfigSettings {
    readonly Port: number;
    readonly GeminiAPIKey: string;
    readonly SessionSecret: string;
    readonly SessionIdPrefix: string;
    readonly Redis: IRedisSettings;
    readonly WebSocket: IWebSocketSettings;
    readonly DBConnections: IDBConnections;
}

export interface IRedisSettings {
    readonly Host: string;
    readonly Port: number;
    readonly Database: string;
}

export interface IWebSocketSettings {
    readonly Port: number;
    readonly Host: string;
}

export interface IDBConnections {
  readonly chatwai: IDBConnectionInfo;
}

export interface IDBConnectionInfo {
  readonly Host: string;
  readonly Port: number;
  readonly UserNmae: string;
  readonly Password: string;
  readonly Database: string;
  readonly Debug: boolean;
}

@injectable()
export class ConfigSettings implements IConfigSettings {
  private _port: number;
  private _geminiAPIKey: string;
  private _sessionSecret: string;
  private _sessionIdPrefix: string;
  private _redis: any;
  private _webSocket: any;
  private _dbConnections: any;

  constructor() {
    this._port = config.get<number>("port");
    this._geminiAPIKey = config.get<string>("gemini_api_key");
    this._sessionSecret = config.get<string>("session_secret");
    this._sessionIdPrefix = config.get<string>("session_id_prefix");
    this._redis = config.get("redis");
    this._webSocket = config.get("web_socket");
    this._dbConnections = config.get("db_connections");
  }

  public get Port(): number {
    return this._port;
  }

  public get GeminiAPIKey(): string {
    return this._geminiAPIKey;
  }

  public get SessionSecret(): string {
    return this._sessionSecret;
  }

  public get SessionIdPrefix(): string {
    return this._sessionIdPrefix;
  }

  public get Redis(): IRedisSettings {
    return {
      Host: this._redis.host,
      Port: this._redis.port,
      Database: this._redis.database
    }
  }

  public get WebSocket(): IWebSocketSettings {
    return {
      Host: this._webSocket.host,
      Port: this._webSocket.port
    }
  }

  public get DBConnections(): IDBConnections {
    const connPart = this._dbConnections;
    return {
      chatwai: {
          Host: connPart.chatwai.host,
          Port: connPart.chatwai.port,
          UserNmae: connPart.chatwai.username,
          Password: connPart.chatwai.password,
          Database: connPart.chatwai.database,
          Debug: false || connPart.chatwai.debug
      }
    }
  }
}

// Middleware to inject config into the req object
export const configMiddleware = (config: IConfigSettings) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.config = config; // Inject the config into the request object
        next();
    };
}