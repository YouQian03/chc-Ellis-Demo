"use client";

import ChatInterface from "@/components/chat-interface";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl w-full h-[calc(100vh-80px)] p-4">
      <h2 className="text-xl font-semibold mb-4">Ellis Demo (GPT + File Search)</h2>
      {/* 不使用 overflow-hidden，确保子组件能填满并显示输入框 */}
      <div className="h-full min-h-[560px]">
        <ChatInterface />
      </div>
    </main>
  );
}








