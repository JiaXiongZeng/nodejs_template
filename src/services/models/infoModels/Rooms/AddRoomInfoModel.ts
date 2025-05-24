import { AutoMap } from "@automapper/classes";

export class AddRoomInfoModel {
    /**
     * The name of room
     */
    @AutoMap()
    Name: string;

    /**
     * The pass phrase of room
     */
    @AutoMap()
    PassPhrase: string;

    /**
     * The owner id of room
     */
    @AutoMap()
    OwnerId: string;
}