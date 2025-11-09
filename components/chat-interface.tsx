"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null); // ✅ 保存 threadId

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: text,
          threadId // ✅ 发送现有的 threadId
        }),
      });

      const raw = await res.text();
      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(`Invalid JSON: ${raw.slice(0, 200)}`);
      }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      // ✅ 保存返回的 threadId
      if (data?.threadId) {
        setThreadId(data.threadId);
      }

      setMessages((m) => [...m, { role: "assistant", content: data.text || "" }]);
    } catch (e: any) {
      const msg = e?.message || String(e);
      setError(msg);
      setMessages((m) => [...m, { role: "assistant", content: `出错了：${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[72%] rounded-2xl px-3 py-2 text-sm leading-6
                ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-muted-foreground text-sm">Ellis 正在思考…</div>}
          {error && <div className="text-destructive text-sm">错误：{error}</div>}
          {messages.length === 0 && !loading && (
            <div className="text-muted-foreground text-sm">
              试试输入：<code>一个学生上课总是摇头晃脑，我提醒也不改，怎么办？</code>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-3 flex items-center gap-2">
        <Input
          placeholder="输入你的课堂情境或问题…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <Button onClick={send} disabled={loading}>
          发送
        </Button>
      </div>
    </Card>
  );
}



