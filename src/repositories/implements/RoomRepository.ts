import { inject, injectable } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { type IDBContext } from '@infrastructures/interfaces/IDBContext.js';
import { IRoomRepository } from '@repositories/interfaces/IRoomRepository.js';
import { Room } from '@repositories/models/entities/Room.js';
import { AddRoomCondition } from '@repositories/models/conditions/Rooms/AddRoomCondition.js';
import { DelRoomCondition } from '@repositories/models/conditions/Rooms/DelRoomCondition.js';
import { GetRoomsCondition } from '@repositories/models/conditions/Rooms/GetRoomsCondition.js';
import { GetRoomDataModel } from '@repositories/models/dataModels/Rooms/GetRoomDataModel.js';

@injectable()
export class RoomRepository implements IRoomRepository {
    private _dbContext: IDBContext;

    constructor(
        @inject(TYPES.ScopedDBContext) dbContext: IDBContext
    ){
        this._dbContext = dbContext;
    }

    public async GetRooms(condition: GetRoomsCondition): Promise<GetRoomDataModel[]> {
        const em = await this._dbContext.GetEntityManager();
        
        let whereCondition: string[] = [];
        let queryParams: any[] = [];

        if(condition.Id){
            whereCondition.push("r.id = ?");
            queryParams.push(condition.Id);
        }

        if(condition.OwnerId){
            whereCondition.push("r.owner_id = ?");
            queryParams.push(condition.OwnerId);
        }

        if(condition.Name){
            whereCondition.push("r.name ilike ?");
            queryParams.push(`%${condition.Name}%`);
        }

        if(condition.LastActSDatetime){
            whereCondition.push("r.last_act_datetime >= ?");
            queryParams.push(condition.LastActSDatetime);
        }

        if(condition.LastActEDatetime){
            whereCondition.push("r.last_act_datetime <= ?");
            queryParams.push(condition.LastActEDatetime);
        }

        let query = em.createQueryBuilder(Room, "r")
                        .select([
                            "r.uid",
                            "r.id",
                            "r.name",
                            "r.ownerId",
                            "r.is_locked",
                            "r.last_act_datetime"
                        ])
                        .leftJoinAndSelect("owner", "acct", undefined, [ "id", "name" ]);

        if(whereCondition.length > 0){
            const whereCondStr = whereCondition.join(" and ");
            query = query.where(whereCondStr, queryParams);
        }

        const rooms = await query.getResultList();

        const result: GetRoomDataModel[] = rooms.map(f => ({
            Id: f.id,
            Name: f.name,
            OwnerId: f.owner?.id,
            OwnerName: f.owner?.name,
            IsLocked: f.isLocked,
            LastActionDatetime: f?.lastActDatetime
        }));

        return result;
    }

    public async AddRoom(condition: AddRoomCondition): Promise<number> {
        const em = await this._dbContext.GetEntityManager();
        const room = new Room();
        room.name = condition.Name;
        room.passPhrase = condition.PassPhrase;
        room.ownerId = condition.OwnerId;
        
        //Get a unique key for chat room record
        const newId = (await em.execute("SELECT get_daily_id('CR') AS id"))[0]?.id;
        room.id = newId;

        const query = await em.createQueryBuilder(Room)
                              .insert(room);
        return query.affectedRows;
    }

    public async DelRoom(condition: DelRoomCondition): Promise<number> {
        const em = await this._dbContext.GetEntityManager();

        const query = await em.createQueryBuilder(Room)
                              .delete({
                                id: {
                                    $eq: condition.Id
                                }
                              });
        return query.affectedRows;
    }    
}