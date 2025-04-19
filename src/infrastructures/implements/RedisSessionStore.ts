import { injectable, inject } from 'inversify';
import { RedisStore } from 'connect-redis';
//import { RedisClient } from '@infrastructures/implements/RedisClient';
import { RedisJsonStore } from '@infrastructures/implements/RedisJsonStore.js';
import { RedisJsonClient } from '@infrastructures/implements/RedisJsonClient.js';
import { IRedisSessionStore } from '@infrastructures/interfaces/IRedisSessionStore.js';
import { type IConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { TYPES } from '@infrastructures/di/types.js';

@injectable()
export class RedisSessionStore implements IRedisSessionStore {
   //private _redisClient: RedisClient;
   private _redisClient: RedisJsonClient;
   private _configs: IConfigSettings;
   private _redisStore: RedisStore;

   constructor(
      //@inject(TYPES.IRedisClient) redisClient: RedisClient,
      @inject(TYPES.IRdiesJsonClient) redisClient: RedisJsonClient,
      @inject(TYPES.IConfigSettings) configs: IConfigSettings
   ) {
      // Inject Redis client
      this._redisClient = redisClient;

      // Inject Configurations
      this._configs = configs;

      // // Use a new Redis client per request (Save as string)
      //this._redisStore = new RedisStore({
      // Use a new Redis client per request (Save as JsonObject)
      this._redisStore = new RedisJsonStore({
         client: this._redisClient.GetClient(),
         prefix: this._configs.SessionIdPrefix
      });
   }

   public GetStore(): RedisStore {
      return this._redisStore;
   }

   public async Connect(): Promise<void> {
      await this._redisClient.Connect();
   }

   public async Close(): Promise<void> {
      await this._redisClient.Close();
   }
}
