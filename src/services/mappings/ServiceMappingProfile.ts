import { 
    createMap, MappingProfile,
    forMember, mapFrom
} from '@automapper/core';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { GetFriendsCondition } from '@repositories/models/conditions/Friends/GetFriendsCondition.js';
import { GetFriendsDataModel } from '@repositories/models/dataModels/Friends/GetFriendsDataModel.js';
import { GetFriendDto } from '@services/models/dtos/Friends/GetFriendDto.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { AddFriendsCondition } from '@repositories/models/conditions/Friends/AddFriendsCondition.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { DelFriendCondtion } from '@repositories/models/conditions/Friends/DelFriendCondition.js';
import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';

import { AddRoomInfoModel } from '@services/models/infoModels/Rooms/AddRoomInfoModel.js';
import { AddRoomCondition } from '@repositories/models/conditions/Rooms/AddRoomCondition.js';
import { DelRoomInfoModel } from '@services/models/infoModels/Rooms/DelRoomInfoModel.js';
import { DelRoomCondition } from '@repositories/models/conditions/Rooms/DelRoomCondition.js';
import { GetRoomsCondition } from '@repositories/models/conditions/Rooms/GetRoomsCondition.js';
import { GetRoomsInfoModel } from '@services/models/infoModels/Rooms/GetRoomsInfoModel.js';
import { GetRoomDataModel } from '@repositories/models/dataModels/Rooms/GetRoomDataModel.js';
import { GetRoomDto } from '@services/models/dtos/Rooms/GetRoomDto.js';

import { GetAccountValidationInfoModel } from '@services/models/infoModels/Accounts/GetAccountValidationInfoModel.js';
import { GetAccountValidationCondition } from '@repositories/models/conditions/Accounts/GetAccountValidationCondition.js';
import { GetAccountValidationDataModel } from '@repositories/models/dataModels/Accounts/GetAccountValidationDataModel.js';
import { GetAccountValidationDto } from '@services/models/dtos/Accounts/GetAccountValidationDto.js';

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
    
    createMap(mapper, GetFriendsDataModel, GetFriendDto,
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

    createMap(mapper, AddRoomInfoModel, AddRoomCondition);
    createMap(mapper, DelRoomInfoModel, DelRoomCondition);

    createMap(mapper, GetRoomsInfoModel, GetRoomsCondition);
    createMap(mapper, GetRoomDataModel, GetRoomDto);

    createMap(mapper, GetAccountValidationInfoModel, GetAccountValidationCondition);
    createMap(mapper, GetAccountValidationDataModel, GetAccountValidationDto);
}