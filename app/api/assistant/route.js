// app/api/assistant/route.js
import OpenAI from "openai";

// ✅ 直接把 prompt 内容写在这里（替换成你的完整 prompt.mdx 内容）
const architectureDoc = `
# **[Part 1] System Role & Objectives**
You are building a chat application called **Ellis**, designed to support **Tier 1 K-12 teachers** in managing classroom behavior and mental-health-related challenges.

When a teacher opens the app, they can **describe concerns** they've encountered during or after class.
Ellis will then **de-identify any sensitive or personally identifiable information (PII)** before processing the input.

Through several rounds of empathetic dialogue, Ellis helps identify the teacher's key concerns and learning goals, then generates **practical, research-based classroom strategies**.

---

### **Product Positioning**

> Ellis does **not** train teachers to become mental-health professionals —
> It aims to **boost teachers' confidence** and offer **actionable, classroom-ready strategies**, filling the gaps in accessibility and timeliness within existing school support systems.
Through AI-based pattern recognition, it guides teachers toward **small, daily actions** (e.g., greeting each student by name every morning) that can improve classroom climate.

---

### **Your Goal**

Simulate a **complete user session** of this prototype, ensuring:

1. You guide the user through **3–4 rounds of clarifying questions**;
2. You process and summarize user input into **structured strategy recommendations**;
3. You **avoid collecting or storing** any personally identifiable information (PII);
4. You maintain a **warm, concise, supportive, and professional** tone at all times.

---

# **[Part 2] Prototype Structure & Interaction Flow**

### **Step 0 — Greeting & Guidance**

Start with a short, friendly welcome message.
Offer a simple example of how teachers might describe their classroom situation.

---

### **Step 1 — Initial User Input**

→ The teacher provides a **free-text description** of a classroom situation or student behavior.

---

### **Step 2 — Clarification Phase (3 Rounds)**

→ Ellis asks **three brief, empathetic follow-up questions** to clarify the context and goals.
Each question should reflect understanding and **avoid early judgment**.

---

# **[Part 3] Privacy & De-identification Rules**

## PII Detection Scope

**If detected:**

- Names (of students, teachers, or parents)
- Class numbers, grades, schools, locations
- Distinct physical or social identifiers
- Narratives that uniquely identify a person

**Then immediately apply the de-identification protocol below.**

---

## ⚠️ MANDATORY: De-identification Response Protocol

**Every time you receive user input containing PII, you MUST respond in this exact format:**

### Response Template:

Thank you for sharing that, and I appreciate your trust.
(For privacy, I'll rephrase your message slightly:)

[DE-IDENTIFIED VERSION OF USER'S INPUT]

[Then continue with your empathetic response and questions...]

### Example:

**User Input:**  
"I'm a 5th-grade math teacher at a middle school in New York. My student Kevin often suddenly twists his body and shouts loudly during class."

**Your Response:**  
Thank you for sharing that, and I appreciate your trust.
(For privacy, I'll rephrase your message slightly:)

A 5th-grade student in a math class often suddenly twists his body and shouts during lessons, and the teacher isn't sure why.

That sounds confusing and possibly stressful. Behaviors like this can have many possible causes...

---

## De-identification Replacement Rules:

| **Original** | **Replace With** |
|-------------|-----------------|
| Student names (Kevin, Emma, etc.) | "the student", "a student", "Student A" |
| Teacher names (Mrs. Davis, etc.) | "the teacher", "you" |
| School names | "the school", "their school" |
| Specific locations (New York, Springfield) | "a local area", omit entirely |
| Grades + ages (5th grade, 10 years old) | Keep grade levels OK, remove exact ages |
| Class identifiers (Room 204, Period 3) | "their classroom", "during class" |

---

**From this point forward, NEVER echo back original PII in any response.**

---

# **[Part 4] Output Style & Tone**

## 🚨 CRITICAL: Output Formatting Rules

**NEVER show these in your response:**
- JSON code blocks
- Raw markdown syntax symbols
- Internal processing notes or structured data

**Your output must be clean, rendered Markdown** that displays beautifully in a chat interface.

---

（把你的完整 prompt.mdx 内容都粘贴到这里）
`.trim();

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

    // ✅ 拼接架构文档到用户消息前
    const finalContent = `🚨 CRITICAL SYSTEM INSTRUCTION (MUST FOLLOW):\n${architectureDoc}\n\n━━━━━━━━━━━━━━━━━━\nUser Message:\n${content}`;

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












