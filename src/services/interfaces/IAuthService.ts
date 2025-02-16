import { LoginUser } from '@models/LoginUser';

export interface IAuthService {
    GetLoginUser(): Promise<Nullable<LoginUser>>
}