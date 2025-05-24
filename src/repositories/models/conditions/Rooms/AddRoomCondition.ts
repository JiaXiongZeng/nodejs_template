import { AutoMap } from '@automapper/classes';

export class AddRoomCondition {
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