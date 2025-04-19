import { injectable, inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { type IConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { type IRedisJsonClient } from '@infrastructures/interfaces/IRedisJsonClient.js';
import { createClient, RedisClientType } from 'redis';

@injectable()
export class RedisJsonClient implements IRedisJsonClient {
  protected _client: RedisClientType;
  private _configs: IConfigSettings;

  constructor(
    @inject(TYPES.IConfigSettings) config: IConfigSettings
  ) {
    // Inject configuration
    this._configs = config;

    // Creating a new Redis client for each request
    const redisRUL = `redis://${this._configs.Redis.Host}:${this._configs.Redis.Port}/1`;

    this._client = createClient({
      url: redisRUL
    });

    this._client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  public GetClient(): RedisClientType {
    return this._client;
  }

  public async Connect(): Promise<void> {
    await this._client.connect();
  }

  public async Close(): Promise<void> {
    await this._client.quit();
  }
}