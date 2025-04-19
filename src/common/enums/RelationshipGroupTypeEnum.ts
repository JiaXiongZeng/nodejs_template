/**
 * @swagger
 * components:
 *   schemas:
 *     RelationshipGroupTypeEnum:
 *       type: string
 *       enum:
 *         - C
 *         - S
 *         - R
 *         - V
 *       x-enum-descriptions:
 *         - Company
 *         - School
 *         - Reality
 *         - Virtuality
 *       description: Enum for relationship group types
 */
export enum RelationshipGroupTypeEnum {
    Company = 'C',
    School = 'S',
    Reality = 'R',
    Virtuality = 'V'
}