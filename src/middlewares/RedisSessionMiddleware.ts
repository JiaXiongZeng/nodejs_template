import { Request, Response, NextFunction } from "express";
import session from "express-session";
import { injectable, inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPES } from '@infrastructures/di/types';
import { IRedisSessionStore } from "@infrastructures/interfaces/IRedisSessionStore";

// Middleware class
@injectable()
export class RedisSessionMiddleware extends BaseMiddleware {
    private readonly _store: IRedisSessionStore;

    constructor(
        @inject(TYPES.IRedisSessionStore) store: IRedisSessionStore
    ){
        super();
        this._store = store;
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this._store.Connect();

        const sessionMiddleware = session({
            store: this._store.GetStore(),
            secret: req.config.SessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: { 
                secure: false,
                httpOnly: true,
                sameSite: 'strict'
            }
        });
        sessionMiddleware(req, res, next);

        // Avoid keeping the store open
        res.on('finish', async () => {
                    await this._store.Close();
                });
    }
}