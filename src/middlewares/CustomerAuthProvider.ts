import { injectable } from 'inversify';
import { Principal, AuthProvider } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { AuthPrincipal } from '@infrastructures/implements/AuthPrincipal.js';
import { AuthService } from '@services/implementations/AuthService.js';

@injectable()
export class CustomAuthProvider implements AuthProvider {
    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Principal> {
        const session = req.session;
        const authService = new AuthService(session);
        const user = await authService.GetLoginUser();
        const principal = new AuthPrincipal(user);
        //Append the principal object to req.user for further usage
        req.user = principal;
        return principal;
    }
}