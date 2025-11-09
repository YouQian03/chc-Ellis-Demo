// app/api/assistant/route.js
import OpenAI from "openai";

// 仅用于手动在浏览器访问时的健康检查
export async function GET() {
  return new Response(JSON.stringify({ ok: true, endpoint: "/api/assistant", method: "GET" }), {
    headers: { "Content-Type": "application/json" },
  });
}

// 下面是原来的 POST（保持不变）
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
  try {
    const body = await req.json();
    content = (body?.content || "").trim();
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
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(thread.id, { role: "user", content });

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

    return new Response(JSON.stringify({ ok: true, text }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Assistant API failed" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}












