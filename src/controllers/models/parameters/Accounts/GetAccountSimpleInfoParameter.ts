/**
 * @swagger
 * components:
 *   schemas:
 *     GetAccountSimpleInfoParameter:
 *       type: object
 *       properties:
 *         SearchInput:
 *           type: string
 *           description: The user input from search bar
 */
export class GetAccountSimpleInfoParameter {
    /**
     * The user input from search bar
     */
    SearchInput: string;
}