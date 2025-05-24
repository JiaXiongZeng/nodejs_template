import { AutoMap } from '@automapper/classes';

export class GetRoomsCondition {
    /**
     * The room id
     */
    @AutoMap()
    Id?: string;

    /**
     * The room name
     */
    @AutoMap()
    Name?: string;

    /**
     * The room owner id
     */
    @AutoMap()
    OwnerId?: string;

    /**
     * The last action start datetime of the room
     */
    @AutoMap()
    LastActSDatetime?: Date;

    /**
     * The last action end datetime of the room
     */
    @AutoMap()
    LastActEDatetime?: Date;
}