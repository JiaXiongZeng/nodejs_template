import { AutoMap } from '@automapper/classes';

/**
 * The dto model for getting friends
 */
export class GetFriendDto {
    @AutoMap()
    Id: string;

    @AutoMap()
    Name: string;
}