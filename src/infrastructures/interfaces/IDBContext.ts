import { EntityManager } from '@mikro-orm/postgresql';

export interface IDBContext {
    /**
     * Get a entity manager for record manipulations
     * @param requestScope request scope (default: true) or transient scope (false)
     */
    GetEntityManager(requestScope?: boolean): Promise<EntityManager>;

    /**
     * Clear all forks of entity managers
     */
    ClearAllEntityManagers(): Promise<void>;
}