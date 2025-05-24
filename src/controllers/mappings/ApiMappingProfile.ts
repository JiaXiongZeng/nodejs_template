import { 
    createMap, MappingProfile,
    forMember, mapFrom
} from '@automapper/core';
import dayjs from 'dayjs';
import { GetFriendsParameter } from '@controllers/models/parameters/Friends/GetFriendsParameter.js';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { GetFriendDto } from '@services/models/dtos/Friends/GetFriendDto.js';
import { GetFriendsViewModel } from '@controllers/models/viewmodels/Friends/GetFriendsViewModel.js';
import { AddFriendParameter } from '@controllers/models/parameters/Friends/AddFriendParameter.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { RelationshipTypeEnum } from '@common/enums/RelationshipTypeEnum.js';
import { RelationshipGroupTypeEnum } from '@common/enums/RelationshipGroupTypeEnum.js';
import { DelFriendParameter } from '@controllers/models/parameters/Friends/DelFriendParameter.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';
import { GetAccountSimpleInfoViewModel } from '@controllers/models/viewmodels/Accounts/GetAccountSimpleInfoViewModel.js';
import { GetRoomsParameter } from '@controllers/models/parameters/Rooms/GetRoomsParameter.js';
import { GetRoomsInfoModel } from '@services/models/infoModels/Rooms/GetRoomsInfoModel.js';
import { GetRoomDto } from '@services/models/dtos/Rooms/GetRoomDto.js';
import { GetRoomViewModel } from '@controllers/models/viewmodels/Rooms/GetRoomsViewModel.js';
import { AddRoomParameter } from '@controllers/models/parameters/Rooms/AddRoomParameter.js';
import { AddRoomInfoModel } from '@services/models/infoModels/Rooms/AddRoomInfoModel.js';
import { DelRoomParameter } from '@controllers/models/parameters/Rooms/DelRoomParameter.js';
import { DelRoomInfoModel } from '@services/models/infoModels/Rooms/DelRoomInfoModel.js';
import { GetAccountValidationParameter } from '@controllers/models/parameters/Accounts/GetAccountValidationParameter.js';
import { GetAccountValidationInfoModel } from '@services/models/infoModels/Accounts/GetAccountValidationInfoModel.js';
import { GetAccountValidationDto } from '@services/models/dtos/Accounts/GetAccountValidationDto.js';
import { GetAccountValidationViewModel } from '@controllers/models/viewmodels/Accounts/GetAccountValidationViewModel.js';


export const ApiMappingProfile: MappingProfile = (mapper) => {
    createMap(mapper, GetFriendsParameter, GetFriendsInfoModel,
        forMember(
            info => info.UserId,
            mapFrom(param => param.UserId)
        ),
        forMember(
            info => info.GroupType,
            mapFrom(param => param.GroupType)
        )
    );

    createMap(mapper, GetFriendDto, GetFriendsViewModel,
        forMember(
            view => view.Id,
            mapFrom(dto => dto.Id)
        ),
        forMember(
            view => view.Name,
            mapFrom(dto => dto.Name)
        )
    );

    createMap(mapper, AddFriendParameter, AddFriendInfoModel,
        forMember(
            info => info.SubjectId,
            mapFrom(param => param.FriendId)
        ),
        forMember(
            info => info.RType,
            mapFrom(param => param.RelType ?? RelationshipTypeEnum.Friends)
        ),
        forMember(
            info => info.GType,
            mapFrom(param => param.RelGroup ?? RelationshipGroupTypeEnum.Virtuality)
        )
    );

    createMap(mapper, DelFriendParameter, DelFriendInfoModel,
        forMember(
            info => info.ObjectId,
            mapFrom(param => param.ObjectId)
        ),
        forMember(
            info => info.SubjectId,
            mapFrom(param => param.SubjectId)
        ),
        forMember(
            info => info.RType,
            mapFrom(param => param.RelType)
        ),
        forMember(
            info => info.GType,
            mapFrom(param => param.RelGroup)
        )
    );

    createMap(mapper, GetAccountSimpleInfoDto, GetAccountSimpleInfoViewModel);

    createMap(mapper, GetRoomsParameter, GetRoomsInfoModel,
        forMember(
            info => info.LastActSDatetime,
            mapFrom(param => param.LastActSDatetime? dayjs(param.LastActSDatetime).toDate(): null)
        ),
        forMember(
            info => info.LastActEDatetime,
            mapFrom(param => param.LastActEDatetime? dayjs(param.LastActEDatetime).toDate(): null)
        )
    );
    createMap(mapper, GetRoomDto, GetRoomViewModel);
    createMap(mapper, AddRoomParameter, AddRoomInfoModel);
    createMap(mapper, DelRoomParameter, DelRoomInfoModel);

    createMap(mapper, GetAccountValidationParameter, GetAccountValidationInfoModel);
    createMap(mapper, GetAccountValidationDto, GetAccountValidationViewModel);
}