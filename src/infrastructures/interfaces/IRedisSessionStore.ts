import { RedisStore } from 'connect-redis';

export interface IRedisSessionStore {
    /**
     * Get the inner Redis store from this wrapper
     * @returns RedisStore
     */
    GetStore(): RedisStore,
    /**
     * Connect to Redis session
     */
    Connect(): Promise<void>,
    /**
     * Disconnect from Redis session
     */
    Close(): Promise<void>
}