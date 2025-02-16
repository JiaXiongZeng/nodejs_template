import { Session, SessionData } from 'express-session';
import { injectable } from 'inversify';
import { IAuthService } from '@services/interfaces/IAuthService';
import { LoginUser } from '@models/LoginUser';

@injectable()
export class AuthService implements IAuthService {
    private _session: Session & Partial<SessionData>;

    constructor(
        session: Session & Partial<SessionData>
    ) {
        this._session = session;
    }
    
    public async GetLoginUser(): Promise<Nullable<LoginUser>> {
        if(this._session && this._session.LoginUser){
            return this._session.LoginUser;
        }
        return null;
    }
}