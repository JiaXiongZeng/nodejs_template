import { Entity, Property, Unique, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from '@repositories/models/entities/BaseEntity.js';
import { Relationship } from '@repositories/models/entities/Relationship.js';

@Entity({ tableName: 'account' })
export class Account extends BaseEntity {
  @Property({ type: 'varchar', length: 50 })
  @Unique()
  id!: string;

  @Property({ type: 'varchar', length: 50 })
  name!: string;

  @Property({ type: 'varchar', length: 100, nullable: true })
  password?: string;

  @Property({ type: 'varchar', length: 50, nullable: true })
  nickName?: string;

  @Property({ type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Property({ type: 'char', length: 20, nullable: true })
  phone?: string;

  @Property({ type: 'timestamptz', nullable: true })
  beginDatetime?: Date;

  @Property({ type: 'timestamptz', nullable: true })
  endDatetime?: Date;

  @Property({ type: 'varchar', length: 100, nullable: true })
  avatar: string;

  @Property({ type: 'boolean', default: true })
  isEnable: boolean = true;

  /**
   * The relationship for the entity referencing to Relationship entity
   */
  @OneToMany(() => Relationship, rel => rel.object)
  relationshipAsObject: Relationship[];

  /**
   * The relationship for the entity referencing to Relationship entity
   */
  @OneToMany(() => Relationship, rel => rel.subject)
  relationshipAsSubject: Relationship[];
}