import { AutoMap } from '@automapper/classes';
import { RelationshipTypeEnum } from '@common/enums/RelationshipTypeEnum.js';
import { RelationshipGroupTypeEnum } from '@common/enums/RelationshipGroupTypeEnum.js';

export class AddFriendInfoModel {
    /**
     * The object id
     */
    @AutoMap()
    ObjectId: string;

    /**
     * The subject id
     */
    @AutoMap()
    SubjectId: string;

    /**
     * The type of relationship
     */
    @AutoMap(() => String)
    RType: RelationshipTypeEnum;

    /**
     * The type of group
     */
    @AutoMap(() => String)
    GType: RelationshipGroupTypeEnum;
}