import { type Request, type Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { BaseHttpController, controller, 
         request, response, queryParam, requestBody, requestParam, 
         httpGet, httpPost, httpDelete
} from 'inversify-express-utils';
import { type Mapper } from '@automapper/core';
import { ParameterValidate, ParameterSource } from '@middlewares/ValidDecorator.js';
import { ApiController } from '@controllers/ApiController.js';
import { type IAccountService } from '@services/interfaces/IAccountService.js';
import { GetAccountSimpleInfoParameter } from '@controllers/models/parameters/Accounts/GetAccountSimpleInfoParameter.js';
import { GetAccountSimpleInfoViewModel } from '@controllers/models/viewmodels/Accounts/GetAccountSimpleInfoViewModel.js';
import { GetAccountSimpleInfoInfoModel } from '@services/models/infoModels/Accounts/GetAccountSimpleInfoInfoModel.js';
import { GetAccountSimpleInfoDto } from '@services/models/dtos/Accounts/GetAccountSimpleInfoDto.js';
import { GetAccountSimpleInfoParameterValidator } from '@controllers/validators/GetAccountSimpleInfoParameterValidator.js';

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Accounts management
 */
@controller('/accounts', TYPES.ScopedDBContextMiddleware)
export class AccountController extends ApiController {
    private _mapper: Mapper;
    private _acctService: IAccountService;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IAccountService) acctService: IAccountService
    ){
        super();
        this._mapper = mapper;
        this._acctService = acctService;
    }

    /**
     * @swagger
     * /accounts/simpleSearch:
     *   get:
     *     summary: Get account simple info
     *     tags: [Accounts]
     *     parameters:
     *       - in: query
     *         name: SearchInput
     *         schema:
     *           type: string
     *         required: true
     *         description: The search input (phone, email, or id)
     *     responses:
     *       200:
     *         description: The account simple info
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/GetAccountSimpleInfoViewModel'
     */
    @httpGet("/simpleSearch")
    @ParameterValidate(GetAccountSimpleInfoParameterValidator, ParameterSource.FromQuery)
    public async GetAccountSimpleInfo(
        @queryParam() parameter: GetAccountSimpleInfoParameter,
        @request() req: Request,
        @response() res: Response
    ){
        const phonePattern = /^(\+)*(886)*(0)*9\d{8}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const infoModel: GetAccountSimpleInfoInfoModel = {};
        const searchInput = parameter.SearchInput.trim();
        if (phonePattern.test(searchInput)) {
            infoModel.Phone = searchInput;
        } else if (emailPattern.test(searchInput)) {
            infoModel.Email = searchInput;
        } else {
            infoModel.Id = searchInput;
        }

        const dto = await this._acctService.GetAccountSimpleInfo(infoModel);
        const viewModel = this._mapper.map(dto, GetAccountSimpleInfoDto, GetAccountSimpleInfoViewModel);
        return this.ApiOk(viewModel);
    }
}