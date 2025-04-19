import { Validator } from 'fluentvalidation-ts';
import { AddFriendRouteParameter } from '@controllers/models/parameters/Friends/AddFriendRouteParameter.js';

export class AddFriendRouteParameterValidator extends Validator<AddFriendRouteParameter>{
    constructor(){
        super();
        this.ruleFor('Id')
            .notEmpty().withMessage('Must provide correct FriendId')
            .notNull().withMessage('Must specify FriendId')
            .length(5, 5).withMessage('Id length must be 5');
    }
}