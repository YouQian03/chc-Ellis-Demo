// app/reflection/page.tsx
"use client";

import { useMemo, useState } from "react";

type Tab = "history" | "analytics";

export default function ReflectionPage() {
  const [tab, setTab] = useState<Tab>("history");
  const [range, setRange] = useState<"7" | "30" | "90">("7");
  const [scenario, setScenario] = useState<
    "Classroom Management" | "Parent Communication" | "Student Engagement" | "Lesson Planning"
  >("Classroom Management");

  // —— 假数据（根据时间范围简单变化一下，够“以假乱真”）
  const data = useMemo(() => {
    const base = {
      "Classroom Management": 15,
      "Parent Communication": 8,
      "Student Engagement": 12,
      "Lesson Planning": 6,
    };
    const factor = range === "7" ? 1 : range === "30" ? 2 : 3;
    return {
      bars: Object.entries(base).map(([k, v]) => [k, v * factor] as const),
      actions: {
        completed: 5 * (range === "7" ? 1 : range === "30" ? 2 : 3),
        pending: 2 * (range === "7" ? 1 : range === "30" ? 2 : 3),
        todo: 3 * (range === "7" ? 1 : range === "30" ? 2 : 3),
      },
      recommendations: [
        { type: "Podcast", title: "Effective Classroom Management Techniques", meta: "28 min" },
        { type: "Article", title: "Building a Positive Learning Environment", meta: "10 min read" },
        { type: "Video", title: "Behavior Management Strategies", meta: "18 min" },
      ],
      summary: [
        "Implement positive reinforcement system",
        "Create clear classroom rules",
        "Use non-verbal cues for behavior",
        "Establish consistent routines",
      ],
    };
  }, [range]);

  return (
    <main className="mx-auto max-w-5xl w-full p-6">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Reflection</h1>
      <p className="text-sm text-neutral-600 mb-4">
        Review your conversation history and track your professional development
      </p>

      {/* 顶部 Tab */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setTab("history")}
          className={`px-3 py-1.5 rounded-md border text-sm ${
            tab === "history"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
          }`}
        >
          Chat History
        </button>
        <button
          onClick={() => setTab("analytics")}
          className={`px-3 py-1.5 rounded-md border text-sm ${
            tab === "analytics"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
          }`}
        >
          Analytics
        </button>

        {/* 右侧时间范围，仅在 Analytics 下出现 */}
        {tab === "analytics" && (
          <div className="ml-auto flex gap-2">
            {(["7", "30", "90"] as const).map((r, i) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-md border text-sm ${
                  range === r
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {i === 0 ? "Last 7 Days" : i === 1 ? "Last 30 Days" : "Last 90 Days"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* —— Chat History 伪造列表 —— */}
      {tab === "history" && (
        <section className="grid gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <article
              key={idx}
              className="rounded-xl border border-neutral-200 bg-white p-4 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">Chat {idx + 1}</h3>
                <span className="text-xs text-neutral-500">{`2025-01-${String(8 - idx).padStart(2, "0")}`}</span>
              </div>
              <p className="text-sm text-neutral-600">
                {[
                  "Discussion about classroom management strategies…",
                  "Exploring student engagement techniques…",
                  "Planning for differentiated instruction…",
                  "Parent communication follow-up summary…",
                ][idx % 4]}
              </p>
            </article>
          ))}
        </section>
      )}

      {/* —— Analytics 伪造看板 —— */}
      {tab === "analytics" && (
        <section className="space-y-6">
          {/* 条形图区域 */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="font-semibold mb-3">Your Analytics</h2>

            <div className="mb-2 text-sm font-medium text-neutral-700 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-blue-600 text-white text-[10px]">
                ⓘ
              </span>
              Historical Scenarios
              <span className="ml-2 text-neutral-500 text-xs">
                Frequency of interactions by scenario type
              </span>
            </div>

            <div className="space-y-3">
             {data.bars.map(([name, value]) => {
  const max = Math.max(...data.bars.map(([, v]) => v));
  const width = `${Math.max(6, Math.round((value / max) * 100))}%`; // ✅ 放大占比一点
  return (
    <div key={name} className="w-full mb-4"> {/* ✅ 间距更大 */}
      <div className="flex items-center justify-between text-base mb-1 font-medium"> {/* ✅ 字号放大 */}
        <span className="text-neutral-800">{name}</span>
        <span className="text-neutral-500">{value} interactions</span>
      </div>
      <div className="h-5 w-full bg-neutral-100 rounded-full overflow-hidden shadow-inner"> {/* ✅ 高度从 h-3 -> h-5 */}
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width }}
        />
      </div>
    </div>
  );
})}

            </div>
          </div>

          {/* 详情 + 摘要 + 统计卡片 */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Scenario Details</h3>

            {/* 场景切换 pill */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(
                [
                  "Classroom Management",
                  "Parent Communication",
                  "Student Engagement",
                  "Lesson Planning",
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    scenario === s
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Action Summary */}
            <div className="border-l-2 border-blue-600 pl-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">💡</span>
                <h4 className="font-semibold">Action Summary</h4>
              </div>
              <ul className="list-disc ml-5 text-sm text-neutral-700 space-y-1">
                {data.summary.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* 三张统计卡 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <StatCard label="Completed" value={data.actions.completed} tone="green" />
              <StatCard label="Pending" value={data.actions.pending} tone="yellow" />
              <StatCard label="To Do" value={data.actions.todo} tone="blue" />
            </div>

            {/* 推荐资源列表 */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Recommended Resources</h4>
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden">
                {data.recommendations.map((r, i) => (
                  <div key={i} className="p-4 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-neutral-100">
                        {r.type === "Podcast" ? "🎙️" : r.type === "Article" ? "📄" : "🎬"}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{r.title}</div>
                        <div className="text-xs text-neutral-500">
                          {r.type} • {r.meta}
                        </div>
                      </div>
                    </div>
                    <button className="text-sm px-3 py-1.5 rounded-md border border-neutral-200 hover:bg-neutral-50">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "yellow" | "blue";
}) {
  const map = {
    green: { bg: "bg-green-50", text: "text-green-600", ring: "ring-green-100" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-700", ring: "ring-yellow-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-100" },
  }[tone];

  return (
    <div className={`rounded-xl border border-neutral-200 p-4 ${map.bg}`}>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className={`text-sm ${map.text}`}>{label}</div>
    </div>
  );
}

