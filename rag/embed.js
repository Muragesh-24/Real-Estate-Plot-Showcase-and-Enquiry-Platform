import OpenAI from "openai";
import { CONFIG } from "./config.js";

const client = new OpenAI({
    apiKey: CONFIG.OPENAI_KEY
});

export async function getEmbedding(text) {

    const response = await client.embeddings.create({

        model: CONFIG.EMBEDDING_MODEL,

        input: text
    });

    return response.data[0].embedding;
}

export { client };