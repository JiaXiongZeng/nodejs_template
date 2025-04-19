import { Validator } from 'fluentvalidation-ts';
import { AddFriendParameter } from '@controllers/models/parameters/Friends/AddFriendParameter.js';

export class AddFriendParameterValidator extends Validator<AddFriendParameter>{
    constructor(){
        super();
        this.ruleFor('FriendId')
            .notEmpty().withMessage('Must provide correct FriendId')
            .notNull().withMessage('Must specify FriendId')
            .length(5, 5).withMessage('FriendId length must be 5');
    }
}