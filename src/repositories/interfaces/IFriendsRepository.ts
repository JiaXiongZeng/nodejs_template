import { AddFriendsCondition } from '@repositories/models/conditions/Friends/AddFriendsCondition.js';
import { GetFriendsCondition } from '@repositories/models/conditions/Friends/GetFriendsCondition.js';
import { GetFriendsDataModel } from "@repositories/models/dataModels/Friends/GetFriendsDataModel.js";
import { DelFriendCondtion } from '@repositories/models/conditions/Friends/DelFriendCondition.js';

export interface IFriendsRepository
{
    /**
     * Get a list of friends
     * @param cond The condition model for retrieving friends
     * @returns A list of friends
     */
    GetFriends(cond: GetFriendsCondition): Promise<GetFriendsDataModel[]>;

    /**
     * Add a friend
     * @param cond The condition model for adding a friend
     */
    AddFriend(cond: AddFriendsCondition): Promise<number>;
    
    /**
     * Remove a friend
     * @param cond The condition model for removing a friend
     */
    DeleteFriend(cond: DelFriendCondtion): Promise<number>;
}