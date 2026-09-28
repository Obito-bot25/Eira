import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb } from "@/lib/db";

const EIRA_SYSTEM_INSTRUCTION = `You are EIRA, a supportive mental-wellness assistant inside the EIRA student wellness application.

Your role is to:
- listen empathetically
- help users reflect on emotions and everyday difficulties
- provide practical, low-risk wellness suggestions
- encourage healthy coping strategies
- help users discover relevant EIRA features when appropriate

You must NOT:
- diagnose mental health conditions
- claim to be a doctor or therapist
- prescribe medication
- make definitive medical conclusions
- claim that EIRA can replace professional care
- invent medical facts

If a user appears to be in immediate danger or expresses intent to seriously harm themselves or someone else, encourage them to contact local emergency services or a trusted person/professional immediately.

Keep responses natural, concise, supportive, and appropriate for a student wellness application.

Respond in the language requested by the user when possible.`;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const message = String(body.message || "").trim();
    const language = String(body.language || "English").trim();
    const rawHistory = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json(
        { error: "Message is required and cannot be empty." },
        { status: 400 }
      );
    }

    // 1. Verify Gemini API key is configured on the server
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your server environment.",
          provider: "gemini",
        },
        { status: 500 }
      );
    }

    // 2. Select Gemini Model (default: fast, lightweight gemini-flash-latest)
    const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

    // 3. Check optional authenticated session for user name personalization
    let userName = "";
    try {
      const token = (await cookies()).get("eira_session")?.value;
      if (token) {
        const db = await readDb();
        const user = db.users?.find((u) => u.token === token);
        if (user?.name) {
          userName = user.name;
        }
      }
    } catch {
      // Non-blocking; proceed unauthenticated if session check fails
    }

    // Build system instruction
    const personalizedSystemInstruction = userName
      ? `${EIRA_SYSTEM_INSTRUCTION}\n\nThe user's name is ${userName}. Always respond in ${language}.`
      : `${EIRA_SYSTEM_INSTRUCTION}\n\nAlways respond in ${language}.`;

    // 4. Sanitize and convert history to Gemini format (role: "user" | "model")
    // Limit to latest 10 messages
    const validHistoryItems = rawHistory
      .filter(
        (item) =>
          item &&
          typeof item === "object" &&
          (item.role === "user" || item.role === "assistant") &&
          (typeof item.text === "string" || typeof item.content === "string")
      )
      .slice(-10);

    // If the trailing item in history already matches the current message, drop it to prevent duplication
    const trailingItem = validHistoryItems[validHistoryItems.length - 1];
    if (
      trailingItem &&
      trailingItem.role === "user" &&
      String(trailingItem.text || trailingItem.content || "").trim() === message
    ) {
      validHistoryItems.pop();
    }

    // Build strictly alternating Gemini contents: [user, model, user, model, ...]
    const geminiContents = [];
    for (const item of validHistoryItems) {
      const role = item.role === "assistant" ? "model" : "user";
      const text = String(item.text || item.content || "").trim().slice(0, 4000);
      if (!text) continue;

      if (geminiContents.length === 0) {
        // Gemini contents must begin with a user turn
        if (role === "user") {
          geminiContents.push({ role: "user", parts: [{ text }] });
        }
      } else {
        const lastEntry = geminiContents[geminiContents.length - 1];
        if (lastEntry.role === role) {
          // Merge consecutive same-role turns to preserve strict alternation
          lastEntry.parts[0].text += `\n${text}`;
        } else {
          geminiContents.push({ role, parts: [{ text }] });
        }
      }
    }

    // Append the latest user message
    if (geminiContents.length > 0 && geminiContents[geminiContents.length - 1].role === "user") {
      // If previous turn was user, append current text
      geminiContents[geminiContents.length - 1].parts[0].text += `\n${message.slice(0, 4000)}`;
    } else {
      geminiContents.push({
        role: "user",
        parts: [{ text: message.slice(0, 4000) }],
      });
    }

    // 5. Call official Google Gemini API endpoint with graceful model fallback
    const geminiBaseUrl = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
    const candidateModels = [
      process.env.GEMINI_MODEL,
      "gemini-flash-lite-latest",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
    ].filter(Boolean);
    const modelsToTry = [...new Set(candidateModels)];

    const payload = {
      systemInstruction: {
        parts: [{ text: personalizedSystemInstruction }],
      },
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    };

    let upstream = null;
    let successfulModel = modelsToTry[0];
    let lastErrorDetails = "";

    for (const currentModel of modelsToTry) {
      try {
        const geminiEndpoint = `${geminiBaseUrl}/v1beta/models/${encodeURIComponent(
          currentModel
        )}:generateContent?key=${encodeURIComponent(apiKey)}`;

        upstream = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(30000), // 30-second timeout
        });

        if (upstream.ok) {
          successfulModel = currentModel;
          break;
        }

        const errData = await upstream.json().catch(() => null);
        const rawMsg = errData?.error?.message || `Status ${upstream.status}`;
        lastErrorDetails = rawMsg;
        console.warn(`Gemini (${currentModel}) returned ${upstream.status}: ${rawMsg.slice(0, 120)}`);

        // If high demand spike (503) or not found (404), fall back to next model
        if (upstream.status === 503 || upstream.status === 404 || upstream.status === 429) {
          continue;
        } else {
          // Client or auth error, don't retry
          break;
        }
      } catch (networkErr) {
        if (networkErr?.name === "TimeoutError") {
          return NextResponse.json(
            {
              error: "EIRA request timed out. Please try again.",
              provider: "gemini",
              model: currentModel,
            },
            { status: 504 }
          );
        }
        console.error("Gemini network error:", networkErr?.message || networkErr);
      }
    }

    if (!upstream || !upstream.ok) {
      return NextResponse.json(
        {
          error: "EIRA AI service is temporarily experiencing high traffic. Please try again in a few seconds.",
          provider: "gemini",
          model: successfulModel,
        },
        { status: 503 }
      );
    }

    const data = await upstream.json();
    const candidate = data?.candidates?.[0];
    const replyText =
      candidate?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join("\n") ||
      "I am here to support you. Let's take a deep breath together. Could you tell me a little more about what's going on?";

    return NextResponse.json({
      reply: replyText,
      provider: "gemini",
      model: successfulModel,
    });
  } catch (err) {
    console.error("Unhandled Chat API route error:", err);
    return NextResponse.json(
      { error: "Chat service encountered an unexpected error." },
      { status: 500 }
    );
  }
}
