import { type Mapper } from '@automapper/core';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { IAccountService } from '@services/interfaces/IAccountService.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';
import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { type IAccountRepository } from '@repositories/interfaces/IAccountRepository.js';
import { GetAccountSimpleInfoCondition } from '@repositories/models/conditions/Accounts/GetAccountSimpleInfoCondition.js';
import { GetAccountSimpleInfoDataModel } from '@repositories/models/dataModels/Accounts/GetAccountSimpleInfoDataModel.js';

@injectable()
export class AccountService implements IAccountService {
    private _mapper: Mapper;
    private _acctRep: IAccountRepository;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IAccountRepository) acctRep: IAccountRepository
    ){
        this._mapper = mapper;
        this._acctRep = acctRep;
    }

    public async GetAccountSimpleInfo(info: GetAccountSimpleInfoInfoModel): Promise<GetAccountSimpleInfoDto> {
        const cond = this._mapper.map(info, GetAccountSimpleInfoInfoModel, GetAccountSimpleInfoCondition);
        const dataModel = await this._acctRep.GetAccountSimpleInfo(cond);
        const dto = this._mapper.map(dataModel, GetAccountSimpleInfoDataModel, GetAccountSimpleInfoDto);
        return dto;
    }
}