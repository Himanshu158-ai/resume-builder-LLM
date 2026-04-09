import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {ChatCohere} from "@langchain/cohere";

import { config } from "../config/config";

const googleChat = new ChatGoogleGenerativeAI({
    model:"gemini-flash-latest",
    apiKey:config.geminiApiKey
})

const mistralChat = new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:config.mistralApiKey
})

const cohereChat = new ChatCohere({
    model:"command-a-03-2025",
    apiKey:config.cohereApiKey
})

export {googleChat,mistralChat,cohereChat}