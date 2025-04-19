import { type Mapper } from '@automapper/core';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { IFriendsService } from '@services/interfaces/IFriendsService.js';
import { GetFriendsDto } from '@services/models/dtos/Friends/GetFriendsDto.js';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { type IFriendsRepository } from '@repositories/interfaces/IFriendsRepository.js';
import { GetFriendsDataModel } from '@repositories/models/dataModels/Friends/GetFriendsDataModel.js';
import { GetFriendsCondition } from '@repositories/models/conditions/Friends/GetFriendsCondition.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { AddFriendsCondition } from '@repositories/models/conditions/Friends/AddFriendsCondition.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { DelFriendCondtion } from '@repositories/models/conditions/Friends/DelFriendCondition.js';

@injectable()
export class FriendsService implements IFriendsService{
    private _mapper: Mapper;
    private _repository: IFriendsRepository;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IFriendsRepository) repository: IFriendsRepository
    ){
        this._mapper = mapper;
        this._repository = repository;
    }

    public async GetFriends(info: GetFriendsInfoModel): Promise<GetFriendsDto[]> {
        const cond = this._mapper.map(info, GetFriendsInfoModel, GetFriendsCondition);
        const dataModels = await this._repository.GetFriends(cond);
        const dto = await this._mapper.mapArray(dataModels, GetFriendsDataModel, GetFriendsDto);
        return dto;
    }
    public async AddFriend(info: AddFriendInfoModel) {
        const cond = this._mapper.map(info, AddFriendInfoModel, AddFriendsCondition);
        const affectedRows = await this._repository.AddFriend(cond);
        return affectedRows;
    }
    public async DeleteFriend(info: DelFriendInfoModel) {
        const cond = this._mapper.map(info, DelFriendInfoModel, DelFriendCondtion);
        const affectedRows = await this._repository.DeleteFriend(cond);
        return affectedRows;
    }   
}