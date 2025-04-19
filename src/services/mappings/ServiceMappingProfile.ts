import { 
    createMap, MappingProfile,
    forMember, mapFrom
} from '@automapper/core';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { GetFriendsCondition } from '@repositories/models/conditions/Friends/GetFriendsCondition.js';
import { GetFriendsDataModel } from '@repositories/models/dataModels/Friends/GetFriendsDataModel.js';
import { GetFriendsDto } from '@services/models/dtos/Friends/GetFriendsDto.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { AddFriendsCondition } from '@repositories/models/conditions/Friends/AddFriendsCondition.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { DelFriendCondtion } from '@repositories/models/conditions/Friends/DelFriendCondition.js';
import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';

export const ServiceMappingProfile: MappingProfile = (mapper) => {
    createMap(mapper, GetFriendsInfoModel, GetFriendsCondition,
        forMember(
            cond => cond.UserId,
            mapFrom(info => info.UserId)
        ),
        forMember(
            cond => cond.GroupType,
            mapFrom(info => info.GroupType)
        )
    );
    
    createMap(mapper, GetFriendsDataModel, GetFriendsDto,
        forMember(
            dto => dto.Id,
            mapFrom(dataModel => dataModel.Id)
        ),
        forMember(
            dto => dto.Name,
            mapFrom(dataModel => dataModel.Name)
        )
    );

    createMap(mapper, AddFriendInfoModel, AddFriendsCondition);
    createMap(mapper, DelFriendInfoModel, DelFriendCondtion);

    createMap(mapper, GetAccountSimpleInfoInfoModel, GetAccountSimpleInfoCondition);
    createMap(mapper, GetAccountSimpleInfoDataModel, GetAccountSimpleInfoDto);
}