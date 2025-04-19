import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@common/models/ApiResponse';

/**
 * Make all errors can be output to a consistent json format
 * @param err the error thrown
 * @param req the request
 * @param res the response
 * @param next nexe pipeline
 */
export const ErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const responseJSON: ApiResponse<null> = {
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message: err.message || 'An unexpected error occurred.'
        }
    };

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json(responseJSON);
}