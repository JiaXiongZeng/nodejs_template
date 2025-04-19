import { AutoMap } from '@automapper/classes';

/**
 * The dto model for getting friends
 */
export class GetFriendsDto {
    @AutoMap()
    Id: string;

    @AutoMap()
    Name: string;
}