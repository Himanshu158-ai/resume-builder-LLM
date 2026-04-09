import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    geminiApiKey: process.env.GEMINI_API_KEY,
    mistralApiKey: process.env.MISTRAL_API_KEY,
    cohereApiKey: process.env.COHERE_API_KEY,
};