import { AutoMap } from '@automapper/classes';

export class GetAccountValidationDataModel {
    /**
     * The id of user
     */
    @AutoMap()
    Id: string;

    /**
     * The name of user
     */
    @AutoMap()
    Name?: string;

    /**
     * The nick name of user
     */
    @AutoMap()
    NickName?: string;

    /**
     * The email of user
     */
    @AutoMap()
    Email?: string;

    /**
     * The phone of user
     */
    @AutoMap()
    Phone?: string;
}