// components/ChatBox.tsx
"use client";
import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null); // ✅ 保存 threadId

  async function send() {
    const content = input.trim();
    if (!content) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: content }]);
    setLoading(true);
    try {
      const r = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content,
          threadId // ✅ 发送现有的 threadId
        }),
      });
      const data = await r.json();
      
      // ✅ 保存返回的 threadId（第一次会收到新的）
      if (data?.threadId) {
        setThreadId(data.threadId);
      }
      
      if (data?.text) {
        setMsgs((m) => [...m, { role: "assistant", text: data.text }]);
      } else {
        setMsgs((m) => [...m, { role: "assistant", text: `出错了：${data?.error || r.status}` }]);
      }
    } catch (e: any) {
      setMsgs((m) => [...m, { role: "assistant", text: `网络错误：${e?.message || e}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100%", display: "grid", gridTemplateRows: "1fr auto" }}>
      <div style={{ padding: 16, overflow: "auto", display: "grid", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <div style={{ fontWeight: 700 }}>{m.role === "user" ? "你" : "Ellis"}</div>
            <div>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ color: "#888" }}>Ellis 正在思考…</div>}
      </div>
      <div style={{ padding: 12, borderTop: "1px solid #eee", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="输入你的课堂情境或问题…"
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
        <button onClick={send} disabled={loading} style={{ padding: "10px 16px", borderRadius: 10 }}>
          发送
        </button>
      </div>
    </div>
  );
}
