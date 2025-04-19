/**
 * @swagger
 * components:
 *   schemas:
 *     RelationshipTypeEnum:
 *       type: string
 *       enum:
 *         - B
 *         - F
 *         - M
 *         - R
 *       x-enum-descriptions:
 *         - Blocked
 *         - Friends
 *         - Marriage
 *         - Relatives
 *       description: Enum for relationship types
 */
export enum RelationshipTypeEnum {
    Blocked = 'B',
    Friends = 'F',
    Marriage = 'M',
    Relatives = 'R'
}