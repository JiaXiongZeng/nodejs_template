import { Container, interfaces } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { MikroORM } from '@mikro-orm/postgresql';
import { IConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { IDBContext } from '@infrastructures/interfaces/IDBContext.js';
import { DBContext } from '@infrastructures/implements/DBContext.js';
import { ScopedDbContextMiddleware, ScopedDBContext } from '@middlewares/ScopedDbContextMiddleware.js';
import { EsmUtility } from '@infrastructures/implements/EsmUtility.js';
import { join } from 'path';

Container.prototype.addORM = function () {
    const container = this as Container;
    const esmUtility = new EsmUtility();

    /************************ Asynchronous Dependencies  ************************/
    const initORM = async () => {
        const configs = await container.getAsync<IConfigSettings>(TYPES.IConfigSettings);
        const dbConfig = configs.DBConnections.chatwai;

        const dirName = esmUtility.GetDirName(import.meta.url);
        const entitiesDir = join(dirName, '../..', '/repositories/models/entities');

        const orm = await MikroORM.init({
            host: dbConfig.Host,
            port: dbConfig.Port,
            dbName: dbConfig.Database,
            user: dbConfig.UserNmae,
            password: dbConfig.Password,
            forceUtcTimezone: false,
            entities: [
                `${entitiesDir}/**/*.js`
            ],
            entitiesTs: [
                `${entitiesDir}/**/*.ts`
            ],
            debug: dbConfig.Debug
        });
        return orm;
    };

    container.bind<Promise<MikroORM>>(TYPES.MikroORMAsync)
        .toDynamicValue(initORM)
        .inSingletonScope();

    /************************ Synchronous Dependencies  ************************/
    /* It's necessary to wrap asynchronous one with factory because inversify didn't support asynchronous injection */
    container.bind<interfaces.Factory<Promise<MikroORM>>>(TYPES.MikroORMFactoryAsync)
        .toFactory<Promise<MikroORM>>((context) => {
            return async () => {
                const orm = await context.container.getAsync<Promise<MikroORM>>(TYPES.MikroORMAsync);
                return orm;
            };
        });

    //Inject to middlewares
    container.bind<IDBContext>(TYPES.IDBContext).to(DBContext);

    //Used for services consuming the instantiated DB context by middlewares
    container.bind<ScopedDBContext>(TYPES.ScopedDBContext).to(DBContext);

    //A middleware responses for DB context releated affairs
    container.bind<ScopedDbContextMiddleware>(TYPES.ScopedDBContextMiddleware).to(ScopedDbContextMiddleware);
}