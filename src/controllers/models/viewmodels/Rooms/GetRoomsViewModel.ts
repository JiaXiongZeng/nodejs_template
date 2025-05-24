import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetRoomViewModel:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The id of the room
 *         Name:
 *           type: string
 *           description: The name of the room
 *         OwnerId:
 *           type: string
 *           description: The owner id of the room
 *         OwnerName:
 *           type: string
 *           description: The owner name of the room
 *         IsLocked:
 *           type: boolean
 *           description: The flag for judging if the room is locked
 *         LastActionDatetime:
 *           type: string
 *           format: date-time
 *           description: The last action datetime of the room
 */
export class GetRoomViewModel {
    /**
     * The id of the room
     */
    @AutoMap()
    Id: string;

    /**
     * The name of the room
     */
    @AutoMap()
    Name: string;

    /**
     * The owner id of the room
     */
    @AutoMap()
    OwnerId: string;

    /**
     * The owner name of the room
     */
    @AutoMap()
    OwnerName: string;

    /**
     * The flag for judging if the room is locked
     */
    @AutoMap()
    IsLocked: boolean;

    /**
     * The last action datetime of the room
     */
    @AutoMap()
    LastActionDatetime?: Date;
}