import { AutoMap } from '@automapper/classes';

export class GetAccountSimpleInfoCondition {
    /**
     * The Id filter
     */
    @AutoMap()
    Id?: string;

    /**
     * The Email filter
     */
    @AutoMap()
    Email?: string;

    /**
     * The Phone filter
     */
    @AutoMap()
    Phone?: string;
}