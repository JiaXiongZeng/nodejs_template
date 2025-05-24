import { GetRoomsInfoModel } from '@services/models/infoModels/Rooms/GetRoomsInfoModel.js';
import { GetRoomDto } from '@services/models/dtos/Rooms/GetRoomDto.js';
import { AddRoomInfoModel } from '@services/models/infoModels/Rooms/AddRoomInfoModel.js';
import { DelRoomInfoModel } from '@services/models/infoModels/Rooms/DelRoomInfoModel.js';

export interface IRoomService {
    /**
     * Get a list of rooms
     * @param info The infomodel for getting room list
     * @returns A list of rooms
     */
    GetRooms(info: GetRoomsInfoModel): Promise<GetRoomDto[]>;

    /**
     * Add a room
     * @param info The infomodel for adding a room
     */
    AddRoom(info: AddRoomInfoModel): Promise<number>;

    /**
     * Remove a room
     * @param info The infomodel for deleting a room
     */
    DelRoom(info: DelRoomInfoModel): Promise<number>;
}