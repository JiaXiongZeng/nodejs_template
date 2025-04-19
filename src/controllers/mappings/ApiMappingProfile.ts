import { 
    createMap, MappingProfile,
    forMember, mapFrom
} from '@automapper/core';
import { GetFriendsParameter } from '@controllers/models/parameters/Friends/GetFriendsParameter.js';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { GetFriendsDto } from '@services/models/dtos/Friends/GetFriendsDto.js';
import { GetFriendsViewModel } from '@controllers/models/viewmodels/Friends/GetFriendsViewModel.js';
import { AddFriendParameter } from '@controllers/models/parameters/Friends/AddFriendParameter.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { RelationshipTypeEnum } from '@common/enums/RelationshipTypeEnum.js';
import { RelationshipGroupTypeEnum } from '@common/enums/RelationshipGroupTypeEnum.js';
import { DelFriendParameter } from '@controllers/models/parameters/Friends/DelFriendParameter.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';
import { GetAccountSimpleInfoViewModel } from '@controllers/models/viewmodels/Accounts/GetAccountSimpleInfoViewModel.js';

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

    createMap(mapper, GetFriendsDto, GetFriendsViewModel,
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
}