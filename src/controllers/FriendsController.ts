import { type Request, type Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { BaseHttpController, controller, 
         request, response, queryParam, requestBody, requestParam, 
         httpGet, httpPost, httpDelete
} from 'inversify-express-utils';
import { type Mapper } from '@automapper/core';
import { type IFriendsService } from '@services/interfaces/IFriendsService.js';
import { ParameterValidate, ParameterSource } from '@middlewares/ValidDecorator.js';
import { GetFriendsParameter } from '@controllers/models/parameters/Friends/GetFriendsParameter.js';
import { GetFriendsInfoModel } from '@services/models/infoModels/Friends/GetFriendsInfoModel.js';
import { GetFriendDto } from '@services/models/dtos/Friends/GetFriendDto.js';
import { GetFriendsViewModel } from '@controllers/models/viewmodels/Friends/GetFriendsViewModel.js';
import { AddFriendParameter } from '@controllers/models/parameters/Friends/AddFriendParameter.js';
import { AddFriendRouteParameter } from '@controllers/models/parameters/Friends/AddFriendRouteParameter.js';
import { AddFriendInfoModel } from '@services/models/infoModels/Friends/AddFriendsInfoModel.js';
import { DelFriendParameter } from '@controllers/models/parameters/Friends/DelFriendParameter.js';
import { DelFriendInfoModel } from '@services/models/infoModels/Friends/DelFriendInfoModel.js';
import { AddFriendParameterValidator } from '@controllers/validators/AddFriendParameterValidator.js';
import { AddFriendRouteParameterValidator } from '@controllers/validators/AddFriendRouteParameterValidator.js';
import { ApiController } from '@controllers/ApiController.js';

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Friends management
 */
@controller('/friends', TYPES.ScopedDBContextMiddleware)
export class FriendsController extends ApiController {
    private _mapper: Mapper;
    private _srvFriend: IFriendsService;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IFriendsService) srvFriend: IFriendsService
    ){
        super();
        this._mapper = mapper;
        this._srvFriend = srvFriend;
    }

    /**
     * @swagger
     * /friends:
     *   get:
     *     summary: Get friends
     *     tags: [Friends]
     *     parameters:
     *       - in: query
     *         name: UserId
     *         schema:
     *           type: string
     *         required: true
     *         description: The user id
     *       - in: query
     *         name: GroupType
     *         schema:
     *           type: string
     *         required: false
     *         description: The group type filter
     *     responses:
     *       200:
     *         description: The list of friends
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/GetFriendsViewModel'
     */
    @httpGet("/")
    private async GetFriends(
        @queryParam() parameter: GetFriendsParameter,
        @request() req: Request,
        @response() res: Response
    ) {
        const infoModel = this._mapper.map(parameter, GetFriendsParameter, GetFriendsInfoModel);
        const dto = await this._srvFriend.GetFriends(infoModel);
        const viewModel = this._mapper.mapArray(dto, GetFriendDto, GetFriendsViewModel);
        return this.ApiOk(viewModel);
    }

    /**
     * @swagger
     * /friends/{Id}:
     *   post:
     *     summary: Add a friend
     *     tags: [Friends]
     *     parameters:
     *       - in: path
     *         name: Id
     *         schema:
     *           type: string
     *         required: true
     *         description: The id of the route parameter
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AddFriendParameter'
     *     responses:
     *       200:
     *         description: The number of affected rows
     *         content:
     *           application/json:
     *             schema:
     *               type: integer
     */
    @httpPost("/:Id")
    @ParameterValidate(AddFriendParameterValidator, ParameterSource.FromBody)
    @ParameterValidate(AddFriendRouteParameterValidator, ParameterSource.FromRoute)    
    private async AddFriend(
        @request() req: Request,
        @requestParam() routeParam: AddFriendRouteParameter,
        @requestBody() bodyParam: AddFriendParameter,
        @response() res: Response
    ){
        if(routeParam.Id == bodyParam.FriendId){
            throw new Error("Can't make friends with yourself!");
        }

        const infoModel = this._mapper.map(bodyParam, AddFriendParameter, AddFriendInfoModel);
        infoModel.ObjectId = routeParam.Id;
        const affectedRows = await this._srvFriend.AddFriend(infoModel);
        return this.ApiOk(affectedRows);
    }

    /**
     * @swagger
     * /friends:
     *   delete:
     *     summary: Delete a friend
     *     tags: [Friends]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/DelFriendParameter'
     *     responses:
     *       200:
     *         description: The number of affected rows
     *         content:
     *           application/json:
     *             schema:
     *               type: integer
     */
    @httpDelete("/")
    private async DelFriend(
        @request() req: Request,
        @requestBody() parameter: DelFriendParameter,
        @response() res: Response
    ){
        const infoModel = this._mapper.map(parameter, DelFriendParameter, DelFriendInfoModel);
        const affectedRows = await this._srvFriend.DeleteFriend(infoModel);
        return this.ApiOk(affectedRows);
    }
}