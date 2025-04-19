import { AutoMap } from '@automapper/classes';

/**
 * The data model for getting friends
 */
export class GetFriendsDataModel {
    /**
     * The id of friend
     */
    @AutoMap()
    Id: string;

    /**
     * The name of friend
     */
    @AutoMap()
    Name: string;
}