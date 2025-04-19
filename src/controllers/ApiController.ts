import { BaseHttpController } from 'inversify-express-utils';
import { OkNegotiatedContentResult, JsonResult } from 'inversify-express-utils/lib/results';
import { ApiResponse } from '@common/models/ApiResponse';

export class ApiController extends BaseHttpController {
    constructor() {
        super();
    }

    protected ApiOk<T>(content: T): OkNegotiatedContentResult<T> {
        const responseJSON: ApiResponse<T> = {
            success: true,
            data: content
        };
        return super.ok(responseJSON);
    }

    protected ApiJson(content: any, statusCode?: number): JsonResult<any> {
        const responseJSON: ApiResponse<any> = {
            success: true,
            data: content
        };
        return super.json(responseJSON as any, statusCode);
    }
}