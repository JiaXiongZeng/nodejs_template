import { Entity, Property, Unique, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@repositories/models/entities/BaseEntity.js';
import { Account } from '@repositories/models/entities/Account.js';

@Entity({ tableName: 'room' })
export class Room extends BaseEntity { 
    @Property({ type: 'string', length: 50 })
    @Unique()
    id!: string;
  
    @Property({ type: 'string', length: 50 })
    name!: string;
  
    @Property({ type: 'string', fieldName: 'pass_phrase', length: 100, nullable: true })
    passPhrase?: string;
  
    @Property({ type: 'string', fieldName: 'owner_id', length: 50, nullable: true })
    ownerId?: string;
  
    @Property({ type: 'boolean', fieldName: 'is_locked' })
    isLocked: boolean = false;
  
    @Property({ type: 'date', fieldName: 'last_act_datetime', nullable: true })
    lastActDatetime?: Date;

    //The reference for the entity referencing to Account entity
    @ManyToOne(() => Account, { fieldName: 'owner_id', referenceColumnName: 'id', persist: false })
    owner?: Account;
}