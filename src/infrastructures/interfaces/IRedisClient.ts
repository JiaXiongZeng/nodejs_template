import { RedisClientType, RedisDefaultModules } from 'redis';

export interface IRedisClient {
    /**
     * Get the inner Redies client from this wrapper
     * @returns RedisClient
     */
    GetClient(): RedisClientType<RedisDefaultModules>;
    /**
     * Connect to Redeis Server
     */
    Connect(): void;
    /**
     * Disconnect from Redis Server
     */
    Close(): Promise<void>;
}