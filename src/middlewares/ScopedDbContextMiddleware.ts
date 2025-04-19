import { injectable, inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { type IDBContext } from '@infrastructures/interfaces/IDBContext.js';

/**
 * Used for ScopedDBContext injection
 */
export type ScopedDBContext = IDBContext;

@injectable()
export class ScopedDbContextMiddleware extends BaseMiddleware {
    private readonly _dbContext: IDBContext;

    constructor(
        @inject(TYPES.IDBContext) dbContext: IDBContext
    ){
        super();
        this._dbContext = dbContext;
    }

    public handler(req: Request, res: Response, next: NextFunction): void {
        this.bind<ScopedDBContext>(TYPES.ScopedDBContext).toConstantValue(this._dbContext);

        // Avoid keeping entities managers leak
        res.on('finish', async () => {
            await this._dbContext.ClearAllEntityManagers();
        });

        next();
    }
}