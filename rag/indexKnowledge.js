import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

import { loadDocuments, splitIntoChunks } from "./chunker.js";
import { getEmbedding } from "./embed.js";
import { qdrant } from "./qdrant.js";
import { CONFIG } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_PATH = path.join(
    __dirname,
    "../knowledge"
);

async function ensureCollection() {

    const collections =
        await qdrant.getCollections();

    const exists =
        collections.collections.some(
            c => c.name === CONFIG.COLLECTION
        );

    if (exists)
        return;

    await qdrant.createCollection(
        CONFIG.COLLECTION,
        {
            vectors: {
                size: 1536,
                distance: "Cosine"
            }
        }
    );

    console.log("Collection created.");
}

async function indexKnowledge() {

    await ensureCollection();

    const docs =
        await loadDocuments(KNOWLEDGE_PATH);

    let total = 0;

    for (const doc of docs) {

        console.log(
            "Reading",
            doc.file
        );

        const chunks =
            splitIntoChunks(doc.content);

        for (const chunk of chunks) {

            const embedding =
                await getEmbedding(chunk);

            await qdrant.upsert(
                CONFIG.COLLECTION,
                {
                    wait: true,
                    points: [
                        {
                            id: crypto.randomUUID(),

                            vector: embedding,

                            payload: {
                                text: chunk,
                                file: doc.file
                            }
                        }
                    ]
                }
            );

            total++;

            console.log(
                "Indexed",
                total
            );
        }
    }

    console.log(
        "Done!",
        total,
        "chunks indexed."
    );
}

indexKnowledge().catch(console.error);