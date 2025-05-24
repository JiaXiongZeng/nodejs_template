import { Container } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { IRedisClient } from '@infrastructures/interfaces/IRedisClient.js';
import { IRedisJsonClient } from '@infrastructures/interfaces/IRedisJsonClient.js';
import { IRedisSessionStore } from '@infrastructures/interfaces/IRedisSessionStore.js';
import { RedisClient } from '@infrastructures/implements/RedisClient.js';
import { RedisJsonClient } from '@infrastructures/implements/RedisJsonClient.js';
import { RedisSessionStore } from '@infrastructures/implements/RedisSessionStore.js';

import { IConfigSettings, ConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { RedisSessionMiddleware } from '@middlewares/RedisSessionMiddleware.js';

import '@infrastructures/di/orm.config.js';
import '@infrastructures/di/automapper.config.js';

import { IGeminiService } from '@services/interfaces/IGeminiService.js';
import { GeminiService } from '@services/implementations/GeminiService.js';
import { IFriendsRepository } from '@repositories/interfaces/IFriendsRepository.js';
import { FriendsRepository } from '@repositories/implements/FriendsRepository.js';
import { IAccountRepository } from '@repositories/interfaces/IAccountRepository.js';
import { AccountRepository } from '@repositories/implements/AccountRepository.js';
import { IRoomRepository } from '@repositories/interfaces/IRoomRepository.js';
import { RoomRepository } from '@repositories/implements/RoomRepository.js';
import { IFriendsService } from '@services/interfaces/IFriendsService.js';
import { FriendsService } from '@services/implementations/FriendsService.js';
import { IAccountService } from '@services/interfaces/IAccountService.js';
import { AccountService } from '@services/implementations/AccountService.js';
import { IRoomService } from '@services/interfaces/IRoomService.js';
import { RoomService } from '@services/implementations/RoomService.js';

const container = new Container();
//Register App configurations
container.bind<IConfigSettings>(TYPES.IConfigSettings).to(ConfigSettings).inSingletonScope();
//Register Redis related infrastructures
container.bind<IRedisClient>(TYPES.IRedisClient).to(RedisClient).inRequestScope();
container.bind<IRedisJsonClient>(TYPES.IRdiesJsonClient).to(RedisJsonClient).inRequestScope();
container.bind<IRedisSessionStore>(TYPES.IRedisSessionStore).to(RedisSessionStore).inRequestScope();
container.bind<RedisSessionMiddleware>(TYPES.RedisSessionMiddleware).to(RedisSessionMiddleware);

//Register ORM service
container.addORM();

//Register AutoMapper service
container.addAutoMapper();

//Register Repositories
container.bind<IFriendsRepository>(TYPES.IFriendsRepository).to(FriendsRepository).inRequestScope();
container.bind<IAccountRepository>(TYPES.IAccountRepository).to(AccountRepository).inRequestScope();
container.bind<IRoomRepository>(TYPES.IRoomRepository).to(RoomRepository).inRequestScope();

//Register Services
container.bind<IGeminiService>(TYPES.IGeminiService).to(GeminiService).inRequestScope();
container.bind<IFriendsService>(TYPES.IFriendsService).to(FriendsService).inRequestScope();
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService).inRequestScope();
container.bind<IRoomService>(TYPES.IRoomService).to(RoomService).inRequestScope();


export { container };

// Declare metadata by @controller annotation
import '@controllers/GeminiController.js';
import '@controllers/FriendsController.js';
import '@controllers/AccountController.js';
import '@controllers/RoomController.js';
import '@controllers/AuthenticateController.js';