import { Validator } from 'fluentvalidation-ts';
import { GetAccountValidationParameter } from '@controllers/models/parameters/Accounts/GetAccountValidationParameter.js';

export class GetAccountValidationParameterValidator extends Validator<GetAccountValidationParameter> {
    constructor() {
        super();
        this.ruleFor('Id')
            .notEmpty().withMessage('Account or password is invalid')
            .notNull().withMessage('Account or password is invalid');
        this.ruleFor('Password')
            .notEmpty().withMessage('Account or password is invalid')
            .notNull().withMessage('Account or password is invalid');
    }
}