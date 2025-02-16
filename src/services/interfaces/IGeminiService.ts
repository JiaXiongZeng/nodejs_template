export enum GEMINI_MODELS {
    Gemini_1_5_flash = "gemini-1.5-flash",
    Gemini_1_5_flash_8b = "gemini-1.5-flash-8b",
    Gemini_1_5_pro = "gemini-1.5-pro",
    Gemini_1_0_pro = "gemini-1.0-pro",
    Text_embedding_004 = "text-embedding-004",
    aqa = "aqa"
}

export interface IGeminiService {
    /**
     * Choose the Gemini AI model
     * @param models GEMINI_MODELS
     */
    ChooseModel(models: GEMINI_MODELS): void;
    /**
     * Input the question to AI model
     * @param message string
     */
    Prompt(message: string): Promise<string>;
}