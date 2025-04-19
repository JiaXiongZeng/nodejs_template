import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetFriendsViewModel:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The friend’s ID
 *         Name:
 *           type: string
 *           description: The friend’s name
 */
export class GetFriendsViewModel {
    /**
     * The id of friend
     */
    @AutoMap()
    Id: string;

    /**
     * The name of friend
     */
    @AutoMap()
    Name: string;
}