import { AutoMap } from '@automapper/classes';

/**
 * @swagger
 * components:
 *   schemas:
 *     GetAccountSimpleInfoViewModel:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The id of the user
 *         Name:
 *           type: string
 *           description: The name of the user
 *         NickName:
 *           type: string
 *           description: The nick name of the user
 *         Avatar:
 *           type: string
 *           description: The avatar of the user
 */
export class GetAccountSimpleInfoViewModel {
    /**
     * The id of user
     */
    @AutoMap()
    Id: string;

    /**
     * The name of user
     */
    @AutoMap()
    Name?: string;

    /**
     * The nick name of user
     */
    @AutoMap()
    NickName?: string;

    /**
     * The avatar of user
     */
    @AutoMap()
    Avatar?: string;
}