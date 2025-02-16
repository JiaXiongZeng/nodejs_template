import { LoginUser } from '@models/LoginUser';
import { Principal } from 'inversify-express-utils';

declare module 'express-session' {
    interface SessionData {
        LoginUser: LoginUser
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user: Principal<Nullable<LoginUser>>
    }
}

export {};