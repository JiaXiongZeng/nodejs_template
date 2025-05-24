import { Container } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { addProfile, createMapper, type Mapper } from '@automapper/core';
import { mikro } from '@automapper/mikro';
import { ApiMappingProfile } from '@controllers/mappings/ApiMappingProfile.js';
import { ServiceMappingProfile } from '@services/mappings/ServiceMappingProfile.js';

Container.prototype.addAutoMapper = function () {
    const container = this as Container;

    container.bind<Mapper>(TYPES.Mapper)
        .toDynamicValue(() => {
            const mapper = createMapper({
                        strategyInitializer: mikro()
                    });
            registerProfiles(mapper);
            return mapper;
        }).inSingletonScope();
}

/**
 * Add mapping profile here
 */
const registerProfiles = (mapper: Mapper): void => {
    addProfile(mapper, ApiMappingProfile);
    addProfile(mapper, ServiceMappingProfile);
}