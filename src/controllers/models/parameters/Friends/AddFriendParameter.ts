import { AutoMap } from '@automapper/classes';
import { RelationshipTypeEnum } from '@common/enums/RelationshipTypeEnum.js';
import { RelationshipGroupTypeEnum } from '@common/enums/RelationshipGroupTypeEnum.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     AddFriendParameter:
 *       type: object
 *       properties:
 *         FriendId:
 *           type: string
 *           description: The id of the friend
 *         RelType:
 *           type: string
 *           $ref: '#/components/schemas/RelationshipTypeEnum'
 *           description: The type of relationship
 *         RelGroup:
 *           type: string
 *           $ref: '#/components/schemas/RelationshipGroupTypeEnum'
 *           description: The type of group
 */
export class AddFriendParameter {
    /**
     * The id of the friend
     */
    @AutoMap()
    FriendId: string;

    /**
     * The type of relationship
     */
    @AutoMap(() => String)
    RelType: RelationshipTypeEnum;

    /**
     * The type of group
     */
    @AutoMap(() => String)
    RelGroup: RelationshipGroupTypeEnum;
}