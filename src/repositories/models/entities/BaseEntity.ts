import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ abstract: true })
export abstract class BaseEntity{
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    uid!: string;

    @Property({ type: 'varchar', length: 50, nullable: true })
    create_id?: string;

    @Property({ type: 'varchar', length: 50, nullable: true })
    create_name?: string;

    @Property({ type: 'timestamptz', defaultRaw: 'now()' })
    create_datetime!: Date;

    @Property({ type: 'varchar', length: 50, nullable: true })
    modify_id?: string;

    @Property({ type: 'varchar', length: 50, nullable: true })
    modify_name?: string;

    @Property({ type: 'timestamptz', nullable: true })
    modify_datetime?: Date;

    @Property({ type: 'varchar', length: 50, nullable: true })
    delete_id?: string;

    @Property({ type: 'varchar', length: 50, nullable: true })
    delete_name?: string;

    @Property({ type: 'timestamptz', nullable: true })
    delete_datetime?: Date;
}