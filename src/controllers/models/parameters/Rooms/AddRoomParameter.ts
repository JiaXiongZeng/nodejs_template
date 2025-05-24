import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     AddRoomParameter:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the room
 *         PassPhrase:
 *           type: string
 *           description: The pass phrase of the room
 */
export class AddRoomParameter {
    /**
     * The name of the room
     */
    @AutoMap()
    Name: string;

    /**
     * The pass phrase of the room
     */
    @AutoMap()
    PassPhrase: string;
}