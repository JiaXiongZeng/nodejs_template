import { SessionData } from 'express-session';
import { RedisClientType } from 'redis';
import { RedisStore } from 'connect-redis';
import { RedisModules } from '@infrastructures/implements/RedisJsonClient';

declare interface RedisStoreOptions {
   client: RedisClientType;
   prefix?: string;
   scanCount?: number;
   serializer?: Serializer;
   ttl?: number | {
       (sess: SessionData): number;
   };
   disableTTL?: boolean;
   disableTouch?: boolean;
}

declare interface Serializer {
   parse(s: string): SessionData | Promise<SessionData>;
   stringify(s: SessionData): string;
}

/**
 * A RedisStore save json as json object in redis rather than a string
 * Purpose: reducing the transmit bandwidth while processing a giant json string
 */
export class RedisJsonStore extends RedisStore {
   private _redisClient: RedisClientType<RedisModules>;

   constructor(options: RedisStoreOptions) {
      super(options);
      this._redisClient = options.client;
   }

   async get(sid: string, cb?: (_err?: unknown, _data?: any) => void): Promise<void> {
      try {
         const sessionData = await this._redisClient.json.get(`${this.prefix}${sid}`);
         cb && cb(null, sessionData);
      } catch (err) {
         cb && cb(err);
      }
   }

   async set(sid: string, sess: SessionData, cb?: (_err?: unknown, _data?: any) => void): Promise<void> {
      try {
         await this._redisClient.json.set(`${this.prefix}${sid}`, '$', sess as any);
         cb && cb(null);
      } catch (err) {
         cb && cb(err);
      }
   }

   async destroy(sid: string, cb?: (_err?: unknown, _data?: any) => void): Promise<void> {
      try {
         await this._redisClient.json.del(`${this.prefix}${sid}`);
         cb && cb(null);
      } catch (err) {
         cb && cb(err);
      }
   }
}