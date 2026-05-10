import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "eu-north-1";

const ses = new SESClient({ region: REGION });

const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

const ALLOWED_ORIGIN =
  process.env.ALLOWED_ORIGIN || "https://cmnyamagoud.muragesh.tech";

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

function getIp(event) {
  return (
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers?.["X-Forwarded-For"]?.split(",")[0]?.trim() ||
    event.requestContext?.http?.sourceIp ||
    "unknown"
  );
}

function validatePayload(data) {
  if (!data.fullName || data.fullName.trim().length < 2) {
    return "Full name is required.";
  }

  if (!data.phoneNumber || data.phoneNumber.trim().length < 8) {
    return "Valid phone number is required.";
  }

  if (!data.purpose) {
    return "Purpose is required.";
  }

  if (!data.turnstileToken) {
    return "Human verification is required.";
  }

  if (data.message && data.message.length > 1000) {
    return "Message is too long.";
  }

  return null;
}

async function verifyTurnstile(token, ip) {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip
    })
  });

  const result = await res.json();
  console.log("Turnstile result:", result);

  return result.success === true;
}

async function checkRateLimit(key, limit, windowSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + windowSeconds;

  const existing = await dynamo.send(
    new GetCommand({
      TableName: process.env.RATE_LIMIT_TABLE,
      Key: { key }
    })
  );

  if (!existing.Item || existing.Item.expiresAt < now) {
    await dynamo.send(
      new PutCommand({
        TableName: process.env.RATE_LIMIT_TABLE,
        Item: {
          key,
          count: 1,
          expiresAt
        }
      })
    );

    return true;
  }

  if (existing.Item.count >= limit) {
    return false;
  }

  await dynamo.send(
    new PutCommand({
      TableName: process.env.RATE_LIMIT_TABLE,
      Item: {
        key,
        count: existing.Item.count + 1,
        expiresAt: existing.Item.expiresAt
      }
    })
  );

  return true;
}

async function saveEnquiry(data) {
  const enquiryId = crypto.randomUUID();

  await dynamo.send(
    new PutCommand({
      TableName: process.env.ENQUIRIES_TABLE,
      Item: {
        enquiryId,
        createdAt: new Date().toISOString(),

        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email || null,
        interestedIn: data.interestedIn || null,
        purpose: data.purpose,
        preferredDate: data.preferredDate || null,
        message: data.message || null,

        ip: data.ip,
        userAgent: data.userAgent
      }
    })
  );

  return enquiryId;
}

async function sendEnquiryEmail(data, enquiryId) {
  const emailText = `
New plot enquiry received.

Enquiry ID: ${enquiryId}

Name: ${data.fullName}
Phone: ${data.phoneNumber}
Email: ${data.email || "Not provided"}
Interested In: ${data.interestedIn || "Not selected"}
Purpose: ${data.purpose}
Preferred Date: ${data.preferredDate || "Not selected"}

Message:
${data.message || "No message"}

Technical Details:
IP: ${data.ip}
User Agent: ${data.userAgent}
`;

  await ses.send(
    new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.OWNER_EMAIL]
      },
      Message: {
        Subject: {
          Data: `New Plot Enquiry - ${data.purpose || "General Enquiry"}`
        },
        Body: {
          Text: {
            Data: emailText
          }
        }
      }
    })
  );
}

export const handler = async (event) => {
  try {
    if (event.requestContext?.http?.method === "OPTIONS") {
      return response(200, { ok: true });
    }

    if (event.requestContext?.http?.method !== "POST") {
      return response(405, { message: "Method not allowed." });
    }

    const ip = getIp(event);

    const userAgent =
      event.headers?.["user-agent"] ||
      event.headers?.["User-Agent"] ||
      "unknown";

    const data = JSON.parse(event.body || "{}");

    const validationError = validatePayload(data);
    if (validationError) {
      return response(400, { message: validationError });
    }

    const isHuman = await verifyTurnstile(data.turnstileToken, ip);

    if (!isHuman) {
      return response(403, {
        message: "Human verification failed."
      });
    }

    const cleanData = {
      fullName: data.fullName.trim(),
      phoneNumber: data.phoneNumber.trim(),
      email: data.email?.trim() || "",
      interestedIn: data.interestedIn || "",
      purpose: data.purpose || "General Enquiry",
      preferredDate: data.preferredDate || "",
      message: data.message || "",
      ip,
      userAgent
    };

    // Limit 1: same IP max 5 enquiries per 10 minutes
    const ipAllowed = await checkRateLimit(`ip#${ip}`, 5, 10 * 60);

    if (!ipAllowed) {
      return response(429, {
        message: "Too many enquiries. Please try again after 10 minutes."
      });
    }



    const globalAllowed = await checkRateLimit(
      "global#all",
      30,
      10 * 60
    );
    
    if (!globalAllowed) {
      return response(429, {
        message: "Too many enquiries right now. Please try again later."
      });
    }
    // Limit 2: same phone max 3 enquiries per day
    const phoneAllowed = await checkRateLimit(
      `phone#${cleanData.phoneNumber}`,
      3,
      24 * 60 * 60
    );

    if (!phoneAllowed) {
      return response(429, {
        message: "Too many enquiries from this phone number today."
      });
    }

    const enquiryId = await saveEnquiry(cleanData);

    await sendEnquiryEmail(cleanData, enquiryId);

    return response(200, {
      message: "Enquiry submitted successfully. Mail sent.",
      enquiryId
    });
  } catch (error) {
    console.error("Lambda error:", error);

    return response(500, {
      message: error.message
    });
  }
};