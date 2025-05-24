import { Validator } from 'fluentvalidation-ts';
import { AddRoomParameter } from '@controllers/models/parameters/Rooms/AddRoomParameter.js';

export class AddRoomParameterValidator extends Validator<AddRoomParameter> {
    constructor() {
        super();
        this.ruleFor("Name")
            .notEmpty().withMessage('Must provide correct RoomName')
            .notNull().withMessage('Must specify RoomName')
            .length(5, 20).withMessage('RoomName length must be between 5 and 20');
    }
}