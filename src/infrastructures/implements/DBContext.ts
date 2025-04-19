import { injectable, inject, type interfaces } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { IDBContext } from '@infrastructures/interfaces/IDBContext.js';
import { MikroORM, EntityManager } from '@mikro-orm/postgresql';


@injectable()
export class DBContext implements IDBContext {
    private _ormFactory: interfaces.Factory<Promise<MikroORM>>;
    private _orm!: MikroORM;
    private _emRequestScope: Nullable<EntityManager>;
    private _emTransientScope: EntityManager[];

    constructor(
        @inject(TYPES.MikroORMFactoryAsync) ormFactory: interfaces.Factory<Promise<MikroORM>>
    ){
        this._ormFactory = ormFactory;
        this._emRequestScope = null;
        this._emTransientScope = [];
    }

    /**
     * Get a entity manager for record manipulations
     * @param requestScope request scope (true) or transient scope (false)
     * @returns 
     */
    public async GetEntityManager(requestScope: boolean = true): Promise<EntityManager> {
        if(!this._orm){
            this._orm = await this._ormFactory() as MikroORM;
        }

        if(!requestScope){
            const newEm = this._orm.em.fork() as EntityManager;
            this._emTransientScope.push(newEm);
            return newEm;
        }

        if(!this._emRequestScope){
            this._emRequestScope = this._orm.em.fork() as EntityManager;
        }
        return this._emRequestScope;
    }

    /**
     * Clear all forks of entity managers
     */
    public async ClearAllEntityManagers(): Promise<void> {
        //Clear request scope one
        if(this._emRequestScope){
            this._emRequestScope.clear();
        }
        //Clear transient scope ones
        for(const em of this._emTransientScope){
            if(em){
                em.clear();
            }
        }
    }
}