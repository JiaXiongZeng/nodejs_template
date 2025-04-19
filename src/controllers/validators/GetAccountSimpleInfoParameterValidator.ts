import { Validator } from 'fluentvalidation-ts';
import { GetAccountSimpleInfoParameter } from '@controllers/models/parameters/Accounts/GetAccountSimpleInfoParameter.js';

export class GetAccountSimpleInfoParameterValidator extends Validator<GetAccountSimpleInfoParameter>{
    constructor(){
        super();
        this.ruleFor('SearchInput')
            .notEmpty().withMessage('Must provide search input context')
            .notNull().withMessage('Must provide search input context');
    }
}