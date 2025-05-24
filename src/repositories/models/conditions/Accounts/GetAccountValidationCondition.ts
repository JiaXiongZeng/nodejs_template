import { AutoMap } from '@automapper/classes';

export class GetAccountValidationCondition {
    /**
     * The id of the account
     */
    @AutoMap()
    Id: string;

    /**
     * The password of the account
     */
    @AutoMap()
    Password: string;
}