import dotenv from "dotenv";
dotenv.config();

export const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    mistralApiKey: process.env.MISTRAL_API_KEY,
    cohereApiKey: process.env.COHERE_API_KEY,
    clientUrl: process.env.CLIENT_URL,
    langsmithTracing: process.env.LANGSMITH_TRACING,
    langsmithEndpoint: process.env.LANGSMITH_ENDPOINT,
    langsmithApiKey: process.env.LANGSMITH_API_KEY,
    langsmithProject: process.env.LANGSMITH_PROJECT,
};