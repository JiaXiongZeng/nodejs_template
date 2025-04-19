import { LoginUser } from '@services/models/dtos/LoginUser.js';

export interface IAuthService {
    /**
     * Get the login user
     * @returns The login user
     */
    GetLoginUser(): Promise<Nullable<LoginUser>>;
}