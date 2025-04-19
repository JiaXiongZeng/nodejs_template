import { AutoMap } from "@automapper/classes";

/**
 * @swagger
 * components:
 *   schemas:
 *     AddFriendRouteParameter:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *           description: The id of the route parameter
 */
export class AddFriendRouteParameter {
    @AutoMap()
    Id: string;
}