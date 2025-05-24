import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     DelRoomParameter:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The room id
 */
export class DelRoomParameter {
    /**
     * The room id
     */
    @AutoMap()
    Id?: string;
}