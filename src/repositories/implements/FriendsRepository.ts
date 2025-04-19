import { injectable, inject } from "inversify";
import { TYPES } from '@infrastructures/di/types.js';
import * as _ from 'lodash-es';
import { Relationship } from 'repositories/models/entities/Relationship.js';
import { type IDBContext } from '@infrastructures/interfaces/IDBContext.js';
import { IFriendsRepository } from '@repositories/interfaces/IFriendsRepository.js';
import { GetFriendsCondition } from '@repositories/models/conditions/Friends/GetFriendsCondition.js';
import { GetFriendsDataModel } from '@repositories/models/dataModels/Friends/GetFriendsDataModel.js';
import { AddFriendsCondition } from '@repositories/models/conditions/Friends/AddFriendsCondition.js';
import { DelFriendCondtion } from '@repositories/models/conditions/Friends/DelFriendCondition.js';

@injectable()
export class FriendsRepository implements IFriendsRepository{
    private _dbContext: IDBContext;

    constructor(
        @inject(TYPES.ScopedDBContext) dbContext: IDBContext
    ){
        this._dbContext = dbContext;
    }

    public async GetFriends(cond: GetFriendsCondition): Promise<GetFriendsDataModel[]> {
        const em = await this._dbContext.GetEntityManager();        

        let whereCondition = "r.object_id = ?";
        const queryParam = [
            cond.UserId
        ];

        if(cond.GroupType){
            whereCondition = `${whereCondition} and gtype = ?`;
            queryParam.push(cond.GroupType);
        }

        const query = em.createQueryBuilder(Relationship, "r")
                          .select([
                            "r.uid",
                            "r.object_id", 
                            "r.subject_id",
                          ])
                          .leftJoinAndSelect("object", "acct_o", undefined, [ "id", "name" ])
                          .leftJoinAndSelect("subject", "acct_s", undefined, [ "id", "name" ])
                          .where(whereCondition, queryParam)
                          .andWhere("r.rtype = ? ", ['F']);        

        //const sql = query.getQuery();
        const relationships = await query.getResultList();

        const result: GetFriendsDataModel[] = [];
        let friends = relationships.map(f => f.subject);
        friends = _.uniq(friends);
        for(const f of friends){
            if(f?.id){
                result.push({
                    Id: f.id,
                    Name: f.name
                });
            }
        }
        return result;
    }

    public async AddFriend(cond: AddFriendsCondition): Promise<number> {
        const em = await this._dbContext.GetEntityManager();
        const rel = new Relationship();
        rel.object_id = cond.ObjectId;
        rel.subject_id = cond.SubjectId;
        rel.rtype = cond.RType;
        rel.gtype = cond.GType;

        const query = await em.createQueryBuilder(Relationship)
                              .insert(rel);
        return query.affectedRows;
    }

    public async DeleteFriend(cond: DelFriendCondtion) {
        const em = await this._dbContext.GetEntityManager();

        const otherConditions = [];

        if(cond.RType){
            otherConditions.push({
                rtype: { $eq: cond.RType }
            });
        }

        if(cond.GType){
            otherConditions.push({
                gtype: { $eq: cond.GType }
            });
        }

        const query = await em.createQueryBuilder(Relationship)
                              .delete({ 
                                $and: [
                                    { object_id: { $eq: cond.ObjectId } },
                                    { subject_id: { $eq: cond.SubjectId } },
                                    ...otherConditions
                                ]
                              });
        return query.affectedRows;
    }  
}