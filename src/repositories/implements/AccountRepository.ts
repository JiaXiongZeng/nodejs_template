import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { type IDBContext } from '@infrastructures/interfaces/IDBContext.js';
import { IAccountRepository } from '@repositories/interfaces/IAccountRepository.js';
import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';
import { Account } from '@repositories/models/entities/Account.js';

@injectable()
export class AccountRepository implements IAccountRepository{
    private _dbContext: IDBContext;

    constructor(
        @inject(TYPES.ScopedDBContext) dbContext: IDBContext
    ){
        this._dbContext = dbContext;
    }
    
    public async GetAccountSimpleInfo(cond: GetAccountSimpleInfoCondition): Promise<GetAccountSimpleInfoDataModel> {
        const em = await this._dbContext.GetEntityManager();

        let whereCondition = [];
        let queryParam = [];

        if(cond.Phone){
            whereCondition.push("phone = ?");
            queryParam.push(cond.Phone);
        }

        if(cond.Id){
            whereCondition.push("id = ?");
            queryParam.push(cond.Id);
        }

        if(cond.Email){
            whereCondition.push("email = ?");
            queryParam.push(cond.Email);
        }

        const query = em.createQueryBuilder(Account)
                        .select([
                            "uid",
                            "id",
                            "name",
                            "nickName",
                            "avatar"
                        ])
                        .where(whereCondition.join(" or "), queryParam);
        const data = await query.getSingleResult();
        if(data){
            return {
                Id: data.id,
                Name: data.name,
                NickName: data.nickName,
                Avatar: data.avatar
            };
        }
        return null;        
    }   
}