"use client";

import ChatInterface from "@/components/chat-interface";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl w-full h-[calc(100vh-80px)] p-4">
      {/* ✅ 修改了这里 */}
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Ellis</h1>

      {/* 不使用 overflow-hidden，确保子组件能填满并显示输入框 */}
      <div className="h-full min-h-[560px]">
        <ChatInterface />
      </div>
    </main>
  );
}









