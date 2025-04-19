import { AutoMap } from '@automapper/classes';

export class GetFriendsInfoModel {
    @AutoMap()
    /**
     * The user id
     */
    UserId: string;

    @AutoMap()
    /**
     * The group type filter
     */
    GroupType?: string
}