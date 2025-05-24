import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetRoomsParameter:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The room id
 *         Name:
 *           type: string
 *           description: The room name
 *         OwnerId:
 *           type: string
 *           description: The room owner id
 *         LastActSDatetime:
 *           type: string
 *           format: date-time
 *           description: The last action start datetime of the room
 *         LastActEDatetime:
 *           type: string
 *           format: date-time
 *           description: The last action end datetime of the room
 */
export class GetRoomsParameter {
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
    LastActSDatetime?: string;

    /**
     * The last action end datetime of the room
     */
    @AutoMap()
    LastActEDatetime?: string;
}