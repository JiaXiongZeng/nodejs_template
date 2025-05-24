import { type Request, type Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { BaseHttpController, controller, 
         request, response, queryParam, requestBody, requestParam, 
         httpGet, httpPost, httpDelete
} from 'inversify-express-utils';
import { type Mapper } from '@automapper/core';
import { type IRoomService } from '@services/interfaces/IRoomService.js';
import { ParameterValidate, ParameterSource } from '@middlewares/ValidDecorator.js';
import { GetRoomsParameter } from '@controllers/models/parameters/Rooms/GetRoomsParameter.js';
import { GetRoomsInfoModel } from '@services/models/infoModels/Rooms/GetRoomsInfoModel.js';
import { GetRoomDto } from '@services/models/dtos/Rooms/GetRoomDto.js';
import { GetRoomViewModel } from '@controllers/models/viewmodels/Rooms/GetRoomsViewModel.js';
import { ApiController } from '@controllers/ApiController.js';
import { AddRoomParameter } from '@controllers/models/parameters/Rooms/AddRoomParameter.js';
import { AddRoomInfoModel } from '@services/models/infoModels/Rooms/AddRoomInfoModel.js';
import { DelRoomParameter } from '@controllers/models/parameters/Rooms/DelRoomParameter.js';
import { DelRoomInfoModel } from '@services/models/infoModels/Rooms/DelRoomInfoModel.js';
import { AddRoomParameterValidator } from '@controllers/validators/AddRoomParameterValidator.js';
import { authenticate, authorizeRoles, authorizeOwners } from '@middlewares/AuthDecorator.js';

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Rooms management
 */
@controller('/rooms', TYPES.ScopedDBContextMiddleware)
export class RoomController extends ApiController {
    private _mapper: Mapper;
    private _srvRoom: IRoomService;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IRoomService) srvRoom: IRoomService
    ) {
        super();
        this._mapper = mapper;
        this._srvRoom = srvRoom;
    }

    /**
     * @swagger
     * /rooms:
     *   get:
     *     summary: Get rooms
     *     tags: [Rooms]
     *     parameters:
     *       - in: query
     *         name: Id
     *         schema:
     *           type: string
     *         required: false
     *         description: The room id
     *       - in: query
     *         name: Name
     *         schema:
     *           type: string
     *         required: false
     *         description: The room name
     *       - in: query
     *         name: OwnerId
     *         schema:
     *           type: string
     *         required: false
     *         description: The room owner id
     *       - in: query
     *         name: LastActSDatetime
     *         schema:
     *           type: string
     *           format: date-time
     *         required: false
     *         description: The last action start datetime of the room
     *       - in: query
     *         name: LastActEDatetime
     *         schema:
     *           type: string
     *           format: date-time
     *         required: false
     *         description: The last action end datetime of the room
     *     responses:
     *       200:
     *         description: The list of rooms
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/GetRoomViewModel'
     */
    @httpGet("/")
    private async GetRooms(
        @queryParam() parameter: GetRoomsParameter,
        @request() req: Request,
        @response() res: Response
    ) {
        const infoModel = this._mapper.map(parameter, GetRoomsParameter, GetRoomsInfoModel);
        const dto = await this._srvRoom.GetRooms(infoModel);
        const viewModel = this._mapper.mapArray(dto, GetRoomDto, GetRoomViewModel);
        return this.ApiOk(viewModel);
    }

    /**
     * @swagger
     * /rooms:
     *   post:
     *     summary: Add a room
     *     tags: [Rooms]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AddRoomParameter'
     *     responses:
     *       200:
     *         description: The number of affected rows
     *         content:
     *           application/json:
     *             schema:
     *               type: integer
     */
    @httpPost("/")
    @ParameterValidate(AddRoomParameterValidator, ParameterSource.FromBody)
    @authenticate()
    private async AddRoom(
        @request() req: Request,
        @requestBody() bodyParam: AddRoomParameter,
        @response() res: Response
    ) {
        const infoModel = this._mapper.map(bodyParam, AddRoomParameter, AddRoomInfoModel);
        infoModel.OwnerId = req.user?.details.Id;
        const affectedRows = await this._srvRoom.AddRoom(infoModel);
        return this.ApiOk(affectedRows);
    }

    /**
     * @swagger
     * /rooms/{Id}:
     *   delete:
     *     summary: Delete a room
     *     tags: [Rooms]
     *     parameters:
     *       - in: path
     *         name: Id
     *         schema:
     *           type: string
     *         required: true
     *         description: The id of the room to delete
     *     responses:
     *       200:
     *         description: The number of affected rows
     *         content:
     *           application/json:
     *             schema:
     *               type: integer
     */
    @httpDelete("/:Id")
    private async DelRoom(
        @request() req: Request,
        @requestParam() parameter: DelRoomParameter,
        @response() res: Response
    ) {
        const infoModel = this._mapper.map(parameter, DelRoomParameter, DelRoomInfoModel);
        const affectedRows = await this._srvRoom.DelRoom(infoModel);
        return this.ApiOk(affectedRows);
    }
}