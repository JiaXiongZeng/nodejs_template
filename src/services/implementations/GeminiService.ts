import { injectable, inject } from 'inversify';
import { TYPES } from '@infrastructures/di/types.js';
import { type IConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { GEMINI_MODELS, IGeminiService } from '@services/interfaces/IGeminiService.js';

@injectable()
export class GeminiService implements IGeminiService {
    private _config: IConfigSettings;
    private _geminiConfig: GoogleGenerativeAI;
    private _geminiModel!: GenerativeModel;

    constructor(
        @inject(TYPES.IConfigSettings) config: IConfigSettings  
     ) {
        this._config = config;
        this._geminiConfig = new GoogleGenerativeAI(this._config.GeminiAPIKey);
    }

    public ChooseModel(models: GEMINI_MODELS): void {
        this._geminiModel = this._geminiConfig.getGenerativeModel({ model: models });
    }

    public async Prompt(message: string): Promise<string> {
        if (!this._geminiModel) {
            throw new Error("AI Model did't be chosen yet.");
        }

        const result = await this._geminiModel.generateContent(message);
        return result.response.text();
    }
}