import { AutoMap } from '@automapper/classes';

export class GetFriendsCondition
{    
    /**
     * The user id
     */
    @AutoMap()
    UserId: string;

    /**
     * The group type filter
     */
    @AutoMap()
    GroupType?: string;
}