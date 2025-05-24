import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';
import { GetAccountValidationCondition } from '@repositories/models/conditions/Accounts/GetAccountValidationCondition.js';
import { GetAccountValidationDataModel } from '@repositories/models/dataModels/Accounts/GetAccountValidationDataModel.js';

export interface IAccountRepository {
    /**
     * Get the simple infomation of account
     * @param cond The condition model
     */
    GetAccountSimpleInfo(cond: GetAccountSimpleInfoCondition): Promise<GetAccountSimpleInfoDataModel>;

    /**
     * Get the validation data of account
     * @param cond The condition model
     */
    GetAccountValidation(cond: GetAccountValidationCondition): Promise<GetAccountValidationDataModel>;
}