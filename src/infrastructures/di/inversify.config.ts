import { Container } from 'inversify';
import { TYPES } from '@infrastructures/di/types';
import { IRedisClient } from '@infrastructures/interfaces/IRedisClient';
import { IRedisJsonClient } from '@infrastructures/interfaces/IRedisJsonClient';
import { IRedisSessionStore } from '@infrastructures/interfaces/IRedisSessionStore';
import { RedisClient } from '@infrastructures/implements/RedisClient';
import { RedisJsonClient } from '@infrastructures/implements/RedisJsonClient';
import { RedisSessionStore } from '@infrastructures/implements/RedisSessionStore';

import { IConfigSettings, ConfigSettings } from '@middlewares/ConfigMiddleware';
import { IGeminiService } from '@services/interfaces/IGeminiService';
import { GeminiService } from '@services/implementations/GeminiService';
import { RedisSessionMiddleware } from '@middlewares/RedisSessionMiddleware';

const container = new Container();
container.bind<IConfigSettings>(TYPES.IConfigSettings).to(ConfigSettings).inSingletonScope();
container.bind<IGeminiService>(TYPES.IGeminiService).to(GeminiService).inRequestScope();
container.bind<IRedisClient>(TYPES.IRedisClient).to(RedisClient).inRequestScope();
container.bind<IRedisJsonClient>(TYPES.IRdiesJsonClient).to(RedisJsonClient).inRequestScope();
container.bind<IRedisSessionStore>(TYPES.IRedisSessionStore).to(RedisSessionStore).inRequestScope();
container.bind<RedisSessionMiddleware>(TYPES.RedisSessionMiddleware).to(RedisSessionMiddleware);

export { container };

// Declare metadata by @controller annotation
import '@controllers/GeminiController';