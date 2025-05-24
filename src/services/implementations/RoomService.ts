import { type Mapper } from '@automapper/core';
import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { IRoomService } from '@services/interfaces/IRoomService.js';
import { GetRoomDto } from '@services/models/dtos/Rooms/GetRoomDto.js';
import { GetRoomsInfoModel } from '@services/models/infoModels/Rooms/GetRoomsInfoModel.js';
import { type IRoomRepository } from '@repositories/interfaces/IRoomRepository.js';
import { GetRoomDataModel } from '@repositories/models/dataModels/Rooms/GetRoomDataModel.js';
import { GetRoomsCondition } from '@repositories/models/conditions/Rooms/GetRoomsCondition.js';
import { AddRoomInfoModel } from '@services/models/infoModels/Rooms/AddRoomInfoModel.js';
import { AddRoomCondition } from '@repositories/models/conditions/Rooms/AddRoomCondition.js';
import { DelRoomInfoModel } from '@services/models/infoModels/Rooms/DelRoomInfoModel.js';
import { DelRoomCondition } from '@repositories/models/conditions/Rooms/DelRoomCondition.js';

@injectable()
export class RoomService implements IRoomService {
    private _mapper: Mapper;
    private _repository: IRoomRepository;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IRoomRepository) repository: IRoomRepository
    ){
        this._mapper = mapper;
        this._repository = repository;
    }

    public async GetRooms(info: GetRoomsInfoModel): Promise<GetRoomDto[]> {
        const cond = this._mapper.map(info, GetRoomsInfoModel, GetRoomsCondition);
        const dataModels = await this._repository.GetRooms(cond);
        const dto = this._mapper.mapArray(dataModels, GetRoomDataModel, GetRoomDto);
        return dto;
    }

    public async AddRoom(info: AddRoomInfoModel): Promise<number> {
        const cond = this._mapper.map(info, AddRoomInfoModel, AddRoomCondition);
        const affectedRows = await this._repository.AddRoom(cond);
        return affectedRows;
    }

    public async DelRoom(info: DelRoomInfoModel): Promise<number> {
        const cond = this._mapper.map(info, DelRoomInfoModel, DelRoomCondition);
        const affectedRows = await this._repository.DelRoom(cond);
        return affectedRows;
    }
}