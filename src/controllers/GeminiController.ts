// Controller with dependency injection structure
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types';
import { BaseHttpController, controller, httpGet, request, response, queryParam } from 'inversify-express-utils';
import { IGeminiService, GEMINI_MODELS } from '@services/interfaces/IGeminiService';
import { authenticate, authorizeRoles, authorizeOwners } from '@middlewares/AuthDecorator';

interface MessageResponse {
    request: string,
    response?: string
}

@controller('/gemini')
export class GeminiController extends BaseHttpController {
    private _geminiService: IGeminiService;

    constructor(
        @inject(TYPES.IGeminiService) geminiService: IGeminiService
    ){
        super();
        this._geminiService = geminiService;
    }

    @httpGet("/")
    private async getAPIKey(
        @request() req: Request, 
        @response() res:Response) {
        res.json(req.config.GeminiAPIKey);
    }

    @httpGet("/ask")
    private async askQuestion (
        @queryParam("question") question: string,
        @response() res:Response) {
        let result: Nullable<MessageResponse> = null;

        if (question) {
            this._geminiService.ChooseModel(GEMINI_MODELS.Gemini_1_5_pro);
            const answer = await this._geminiService.Prompt(question as string);
            result = {
                response: answer,
                request: question
            };
        }
        res.json(result);
    }

    @httpGet("/login")
    private async login(
        @queryParam("userid") userId: string, 
        @queryParam("password") password: string, 
        @request() req: Request) {
            req.session.LoginUser = {
                Id: userId,
                Name: "Unknown",
                Password: password,
                Email: "Unknown",
                Roles: [],
                Resources: []
            };

            return this.json({...req.session.LoginUser});
    }

    @httpGet("/test")
    @authenticate()
    private async test() {
        return this.ok("Hello");
    }

    @httpGet("/test2")
    @authorizeRoles("admin,staff")
    private async test2() {
        return this.ok("Hi");
    }

    @httpGet("/test3")
    @authorizeOwners("id4")
    private async test3() {
        return this.ok("Good!");
    }
}