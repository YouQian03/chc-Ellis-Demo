// app/api/assistant/route.js
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// ✅ 新增：读取架构文档
const architecturePath = path.join(process.cwd(), "seed-files", "ellis-architecture.md");
const architectureDoc = fs.existsSync(architecturePath) ? fs.readFileSync(architecturePath, "utf-8") : "";

export async function GET() {
  return new Response(JSON.stringify({ ok: true, endpoint: "/api/assistant", method: "GET" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.ASSISTANT_ID;
  const vectorStoreId = process.env.VECTOR_STORE_ID || null;

  if (!apiKey || !assistantId) {
    return new Response(JSON.stringify({ ok: false, error: "Missing OPENAI_API_KEY or ASSISTANT_ID" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }

  let content = "";
  let threadId = null;
  try {
    const body = await req.json();
    content = (body?.content || "").trim();
    threadId = body?.threadId || null;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
      status: 400, headers: { "Content-Type": "application/json" },
    });
  }
  if (!content) {
    return new Response(JSON.stringify({ ok: false, error: "Empty content" }), {
      status: 400, headers: { "Content-Type": "application/json" },
    });
  }

  const client = new OpenAI({ apiKey });

  try {
    let thread;
    if (threadId) {
      thread = { id: threadId };
    } else {
      thread = await client.beta.threads.create();
    }

    // ✅ 新增：如果有架构文档，拼接到用户消息前
    const finalContent = architectureDoc ? `${architectureDoc}\n\n---\n\nUser: ${content}` : content;

    await client.beta.threads.messages.create(thread.id, { role: "user", content: finalContent });

    const run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
      ...(vectorStoreId ? { tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } } } : {}),
    });

    if (run.status !== "completed") {
      const reason = run?.last_error?.message || run?.last_error || run.status || "unknown";
      return new Response(JSON.stringify({ ok: false, error: String(reason), status: run.status }), {
        status: 500, headers: { "Content-Type": "application/json" },
      });
    }

    const msgs = await client.beta.threads.messages.list(thread.id, { order: "desc", limit: 1 });
    const latest = msgs.data[0];
    const text = latest?.content?.[0]?.type === "text" ? latest.content[0].text.value ?? "" : "";

    return new Response(JSON.stringify({ ok: true, text, threadId: thread.id }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Assistant API failed" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}












