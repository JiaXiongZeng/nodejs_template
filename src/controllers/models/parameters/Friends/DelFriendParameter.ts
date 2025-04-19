import { AutoMap } from '@automapper/classes';
import { RelationshipTypeEnum } from '@common/enums/RelationshipTypeEnum.js';
import { RelationshipGroupTypeEnum } from '@common/enums/RelationshipGroupTypeEnum.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     DelFriendParameter:
 *       type: object
 *       properties:
 *         ObjectId:
 *           type: string
 *           description: The object id
 *         SubjectId:
 *           type: string
 *           description: The subject id
 *         RelType:
 *           type: string
 *           $ref: '#/components/schemas/RelationshipTypeEnum'
 *           description: The type of relationship
 *         RelGroup:
 *           type: string
 *           $ref: '#/components/schemas/RelationshipGroupTypeEnum'
 *           description: The type of group
 */
export class DelFriendParameter {
    /**
     * The object id
     */
    @AutoMap()
    ObjectId!: string;

    /**
     * The subject id
     */
    @AutoMap()
    SubjectId!: string;

    /**
     * The type of relationship
     */
    @AutoMap(() => String)
    RelType?: RelationshipTypeEnum;

    /**
     * The type of group
     */
    @AutoMap(() => String)
    RelGroup?: RelationshipGroupTypeEnum;
}