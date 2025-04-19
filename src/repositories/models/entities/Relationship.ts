import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@repositories/models/entities/BaseEntity.js';
import { Account } from '@repositories/models/entities/Account.js';

@Entity({ tableName: 'relationship' })
export class Relationship extends BaseEntity {
  /**
   * The id of object
   */
  @Property({ type: 'varchar', length: 50 })
  object_id!: string;

  /**
   * The id of subject
   */
  @Property({ type: 'varchar', length: 50 })
  subject_id!: string;

  /**
   * The type of relationship
   */
  @Property({ type: 'varchar', length: 50, nullable: true })
  rtype?: string;

  /**
   * The type of group
   */
  @Property({ type: 'varchar', length: 50, nullable: true })
  gtype?: string;

  //The reference for the entity referencing to Account entity
  @ManyToOne(() => Account, { fieldName: 'object_id', referenceColumnName: 'id', persist: false })
  object?: Account;

  //The reference for the entity referencing to Account entity
  @ManyToOne(() => Account, { fieldName: 'subject_id', referenceColumnName: 'id', persist: false })
  subject?: Account;
}