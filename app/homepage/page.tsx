// app/homepage/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ChatInterface from "../../components/chat-interface";

function Sidebar({ username }: { username?: string }) {
  const router = useRouter();
  const sp = useSearchParams()!; // 👈 非空断言，修复 TS “可能为 null”

  const currentTab = (sp.get("tab") || "chat") as
    | "chat"
    | "profile"
    | "reflection"
    | "learning";

  function go(tab: "chat" | "profile" | "reflection" | "learning") {
    const q = new URLSearchParams(sp.toString());
    q.set("tab", tab);
    if (username) q.set("username", username);
    router.push(`/homepage?${q.toString()}`);
  }

  const LinkBtn = ({
    tab,
    icon,
    text,
  }: {
    tab: "chat" | "profile" | "reflection" | "learning";
    icon: string;
    text: string;
  }) => (
    <button
      onClick={() => go(tab)}
      className={`flex w-full items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-left ${
        currentTab === tab ? "bg-gray-100" : ""
      }`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );

  return (
    <aside className="w-60 shrink-0 h-full bg-white border-r">
      <div className="px-4 py-5 border-b">
        <div className="text-2xl font-black tracking-wide">Ellis</div>
        {username ? <div className="text-xs text-gray-500 mt-1">Hi, {username}</div> : null}
      </div>

      <nav className="p-3 space-y-1">
        <div className="text-xs uppercase text-gray-400 px-2 mb-1">Menu</div>
        <LinkBtn tab="chat" icon="💬" text="Chat" />
        <LinkBtn tab="profile" icon="👤" text="Profile" />
        <LinkBtn tab="reflection" icon="✨" text="Reflection" />
        <LinkBtn tab="learning" icon="🔍" text="Learning" />
      </nav>
    </aside>
  );
}

function ProfilePanel() {
  return (
    <div className="p-6">
      <div className="text-lg font-semibold mb-2">Profile</div>
      <p className="text-sm text-gray-600">这里放用户信息、学校/班级设置等（演示面板）。</p>
    </div>
  );
}

function ReflectionPanel() {
  return (
    <div className="p-6">
      <div className="text-lg font-semibold mb-2">Reflection</div>
      <p className="text-sm text-gray-600">这里展示「反思记录列表」或「导出按钮」（演示面板）。</p>
    </div>
  );
}

function LearningPanel() {
  return (
    <div className="p-6">
      <div className="text-lg font-semibold mb-2">Learning</div>
      <p className="text-sm text-gray-600">这里放学习资源/链接（演示面板）。</p>
    </div>
  );
}

export default function Homepage() {
  const sp = useSearchParams()!; // 👈 非空断言，修复 TS 报错
  const username = sp.get("username") || undefined;
  const tab = (sp.get("tab") || "chat") as
    | "chat"
    | "profile"
    | "reflection"
    | "learning";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl h-screen flex">
        <Sidebar username={username} />
        <section className="flex-1 h-full p-6">
          <div className="h-full bg-white border rounded-2xl shadow-sm">
            {tab === "chat" && <ChatInterface />}
            {tab === "profile" && <ProfilePanel />}
            {tab === "reflection" && <ReflectionPanel />}
            {tab === "learning" && <LearningPanel />}
          </div>
        </section>
      </div>
    </main>
  );
}






