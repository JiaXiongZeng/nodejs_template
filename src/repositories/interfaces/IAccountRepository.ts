import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';

export interface IAccountRepository {
    /**
     * Get the simple infomation of account
     * @param cond 
     */
    GetAccountSimpleInfo(cond: GetAccountSimpleInfoCondition): Promise<GetAccountSimpleInfoDataModel>;
}