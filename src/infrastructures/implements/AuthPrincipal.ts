import { Principal } from 'inversify-express-utils';
import { LoginUser } from '@services/models/dtos/LoginUser.js';

export class AuthPrincipal implements Principal<Nullable<LoginUser>> {
    public details: Nullable<LoginUser>;

    public constructor(details: Nullable<LoginUser>){
        this.details = details;
    }

    public async isAuthenticated(): Promise<boolean> {
        if(this.details){
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    public async isInRole(role: string): Promise<boolean> {
        if(role && this.details){
            const roles = role.split(',');
            for(const myRole of this.details.Roles){
                if(roles.includes(myRole)){
                    return Promise.resolve(true);
                }
            }
        }
        return Promise.resolve(false);
    }

    public async isResourceOwner(resourceId: unknown): Promise<boolean> {
        if(resourceId && this.details){
            if(typeof resourceId === 'string'){
                const result = this.details.Resources.includes(resourceId);
                return Promise.resolve(result);
            } else if(Array.isArray(resourceId)) {
                for(const myRsc of this.details.Resources){
                    if(resourceId.includes(myRsc)){
                        return Promise.resolve(true);
                    }
                }
            }
        }
        return Promise.resolve(false);
    }
}