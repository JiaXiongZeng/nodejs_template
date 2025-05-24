import { AutoMap } from '@automapper/classes';

export class GetRoomDto {
    /**
     * The id of room
     */
    @AutoMap()
    Id: string;

    /**
     * The name of room
     */
    @AutoMap()
    Name: string;

    /**
     * The owner id of room
     */
    @AutoMap()
    OwnerId: string;

    /**
     * The owner name of room
     */
    @AutoMap()
    OwnerName: string;

    /**
     * The flag for judging room locked or not
     */
    @AutoMap()
    IsLocked: boolean;

    /**
     * The last action datetime of room
     */
    @AutoMap()
    LastActionDatetime?: Date;
}