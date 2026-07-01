import fs from "fs/promises";
import path from "path";

const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 100;

export async function loadDocuments(folder) {
    const files = await fs.readdir(folder);

    const docs = [];

    for (const file of files) {

        if (!file.endsWith(".md"))
            continue;

        const content = await fs.readFile(
            path.join(folder, file),
            "utf8"
        );

        docs.push({
            file,
            content
        });
    }

    return docs;
}

export function splitIntoChunks(text) {

    const chunks = [];

    let start = 0;

    while (start < text.length) {

        const end = Math.min(
            start + CHUNK_SIZE,
            text.length
        );

        chunks.push(
            text.slice(start, end)
        );

        start += CHUNK_SIZE - CHUNK_OVERLAP;
    }

    return chunks;
}