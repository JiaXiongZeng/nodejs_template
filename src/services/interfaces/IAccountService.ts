import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';
import { GetAccountValidationInfoModel } from '@services/models/infoModels/Accounts/GetAccountValidationInfoModel.js';
import { GetAccountValidationDto } from '@services/models/dtos/Accounts/GetAccountValidationDto.js';

export interface IAccountService {
    /**
     * Get a simplified account info
     * @param info The infomodel
     */
    GetAccountSimpleInfo(info: GetAccountSimpleInfoInfoModel): Promise<GetAccountSimpleInfoDto>;

    /**
     * Get a validation infomation of account
     * @param info The infomodel
     */
    GetAccountValidation(info: GetAccountValidationInfoModel): Promise<GetAccountValidationDto>;
}