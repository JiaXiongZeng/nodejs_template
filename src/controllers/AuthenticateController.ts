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
import { GetAccountValidationParameter } from '@controllers/models/parameters/Accounts/GetAccountValidationParameter.js';
import { GetAccountValidationInfoModel } from '@services/models/infoModels/Accounts/GetAccountValidationInfoModel.js';
import { GetAccountValidationDto } from '@services/models/dtos/Accounts/GetAccountValidationDto.js';
import { GetAccountValidationViewModel } from '@controllers/models/viewmodels/Accounts/GetAccountValidationViewModel.js';
import { GetAccountValidationParameterValidator } from '@controllers/validators/GetAccountValidationParameterValidator.js';

@controller('/authenticate', TYPES.ScopedDBContextMiddleware)
export class AuthenticateController extends ApiController {
    private _mapper: Mapper;
    private _acctService: IAccountService;

    constructor(
        @inject(TYPES.Mapper) mapper: Mapper,
        @inject(TYPES.IAccountService) acctService: IAccountService
    ) {
        super();
        this._mapper = mapper;
        this._acctService = acctService;
    }

    @httpPost("/check")
    @ParameterValidate(GetAccountValidationParameterValidator, ParameterSource.FromBody)
    public async GetAccountValidation(
        @requestBody() parameter: GetAccountValidationParameter,
        @request() req: Request,
        @response() res: Response
    ) {
        const infoModel = this._mapper.map(parameter, GetAccountValidationParameter, GetAccountValidationInfoModel);
        const dto = await this._acctService.GetAccountValidation(infoModel);
        const viewModel = this._mapper.map(dto, GetAccountValidationDto, GetAccountValidationViewModel);
        if(viewModel){
            req.session.LoginUser = {
                Id: viewModel.Id,
                Name: viewModel.Name,
                Email: viewModel.Email,
                NickName: viewModel.NickName,
                Phone: viewModel.Phone,
                Roles: [],
                Resources: []
            };

            return this.ApiOk(viewModel);
        }        
        return this.ApiError("Account or password is invalid");
    }

    @httpGet("/getUserInfo")
    public async GetLoginUser(
        @request() req: Request
    ) {
        if(await req.user?.isAuthenticated()){
            const user = req.user.details;
            return this.ApiOk({
                Id: user.Id,
                Name: user.Name,
                Email: user.Email,
                NickName: user.NickName,
                Phone: user.Phone
            });
        }
        return this.ApiError("Must login first!");
    }

    @httpPost("/logout")
    public async Logout(
        @request() req: Request
    ) {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    return this.ApiError("Logout failed.");
                }
            });
        }
        return this.ApiOk("Logout succesfully.");
    }
}