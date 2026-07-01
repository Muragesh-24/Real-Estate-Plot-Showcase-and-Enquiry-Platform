import { QdrantClient } from "@qdrant/js-client-rest";
import { CONFIG } from "./config.js";

export const qdrant = new QdrantClient({

    url: CONFIG.QDRANT_URL,

    apiKey: CONFIG.QDRANT_API_KEY
});