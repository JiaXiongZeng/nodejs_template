import { withMiddleware } from 'inversify-express-utils';

export const authenticate = () => {
    return withMiddleware(async (req, res, next) => {
        if(!await req.user.isAuthenticated()){
            res.status(401).json({
                errors: ['Please log in first!']
            });
            return;
        }
        next();
    });
}

export const authorizeRoles = (role: string) => {
    return withMiddleware(async (req, res, next) => {
        if(!await req.user.isInRole(role)){
            res.status(401).json({
                errors: ['You are not authorized to access the resource!']
            });
            return;
        }
        next();
    });
}

export const authorizeOwners = (resourceId: string) => {
    return withMiddleware(async (req, res, next) => {
        if(!await req.user.isResourceOwner(resourceId)){
            res.status(401).json({
                errors: ['You are not authorized to access the resource!']
            });
            return;
        }
        next();
    });
}