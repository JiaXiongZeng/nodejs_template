import { GetRoomsCondition } from '@repositories/models/conditions/Rooms/GetRoomsCondition.js';
import { GetRoomDataModel } from '@repositories/models/dataModels/Rooms/GetRoomDataModel.js';
import { AddRoomCondition } from '@repositories/models/conditions/Rooms/AddRoomCondition.js';
import { DelRoomCondition } from '@repositories/models/conditions/Rooms/DelRoomCondition.js';

export interface IRoomRepository {
    /**
     * Get a list of rooms
     * @param condition The condition model for retrieving rooms
     * @returns A list of rooms
     */
    GetRooms(condition: GetRoomsCondition): Promise<GetRoomDataModel[]>;

    /**
     * Add a room
     * @param condition The condition model for adding a room
     */
    AddRoom(condition: AddRoomCondition): Promise<number>;

    /**
     * Remove a room
     * @param condition The condition model for removing a room
     */
    DelRoom(condition: DelRoomCondition): Promise<number>;
}