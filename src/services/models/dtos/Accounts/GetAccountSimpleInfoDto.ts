import { AutoMap } from '@automapper/classes';

export class GetAccountSimpleInfoDto {
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
     * The avatar of user
     */
    @AutoMap()
    Avatar?: string;
}