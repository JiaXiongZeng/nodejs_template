import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';

export interface IAccountService {
    /**
     * Get a simplified account info
     * @param info The infomodel
     */
    GetAccountSimpleInfo(info: GetAccountSimpleInfoInfoModel): Promise<GetAccountSimpleInfoDto>;
}