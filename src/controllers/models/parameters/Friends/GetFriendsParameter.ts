import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetFriendsParameter:
 *       type: object
 *       properties:
 *         UserId:
 *           type: string
 *           description: The user id
 *         GroupType:
 *           type: string
 *           description: The group type filter
 */
export class GetFriendsParameter {    
    /**
     * The user id
     */
    @AutoMap()
    UserId: string;

    /**
     * The group type filter
     */
    @AutoMap()
    GroupType?: string;
}