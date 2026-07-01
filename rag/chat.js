import { client, getEmbedding } from "./embed.js";
import { qdrant } from "./qdrant.js";
import { CONFIG } from "./config.js";
import { buildPrompt } from "./prompt.js";

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

async function retrieve(question) {
  const embedding = await getEmbedding(question);

  const search = await qdrant.search(
    CONFIG.COLLECTION,
    {
      vector: embedding,
      limit: 3,
      with_payload: true
    }
  );

  return search;
}

async function askLLM(question, docs) {

  const context = docs
    .map(doc => doc.payload.text)
    .join("\n\n----------------\n\n");

  const prompt = buildPrompt(context, question);

  const completion =
    await client.chat.completions.create({

      model: CONFIG.CHAT_MODEL,

      messages: [
        {
          role: "system",
          content:
            "You answer questions about the property."
        },
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.2
    });

  return completion.choices[0].message.content;
}

export const handler = async (event) => {

  try {

    if (
      event.requestContext?.http?.method ===
      "OPTIONS"
    ) {
      return response(200, { ok: true });
    }

    if (
      event.requestContext?.http?.method !==
      "POST"
    ) {
      return response(405, {
        message: "Method not allowed."
      });
    }

    const body =
      JSON.parse(event.body || "{}");

    if (
      !body.question ||
      body.question.trim().length < 2
    ) {
      return response(400, {
        message: "Question is required."
      });
    }

    const docs =
      await retrieve(body.question);

    if (!docs.length) {

      return response(200, {
        answer:
          "I couldn't find any relevant information."
      });

    }

    const answer =
      await askLLM(
        body.question,
        docs
      );

    return response(200, {

      answer,

      sources: docs.map(doc => ({
        file: doc.payload.file,
        score: doc.score
      }))
    });

  } catch (err) {

    console.error(err);

    return response(500, {
      message: "Internal Server Error"
    });

  }

};