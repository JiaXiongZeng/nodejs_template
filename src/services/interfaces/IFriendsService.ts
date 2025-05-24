import { GetFriendDto } from '@services/models/dtos/Friends/GetFriendDto.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';

export interface IFriendsService {
    /**
     * Get a list of friends
     * @param info The info model for getting friends
     * @returns A list of friends
     */
    GetFriends(info: GetFriendsInfoModel): Promise<GetFriendDto[]>;
    /**
     * Add a friend
     * @param info The info model for adding a friend
     */
    AddFriend(info: AddFriendInfoModel): Promise<number>;
    /**
     * Remove a friend
     * @param info The info model for removing a friend
     */
    DeleteFriend(info: DelFriendInfoModel): Promise<number>;
}