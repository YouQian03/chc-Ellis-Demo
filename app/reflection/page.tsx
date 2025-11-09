// app/reflection/page.tsx
import { MessageSquare } from "lucide-react";

export default function ReflectionPage() {
  const items = [
    { title: "Chat 1", date: "2025-01-08", preview: "Discussion about classroom management strategies...", count: 12 },
    { title: "Chat 2", date: "2025-01-07", preview: "Exploring student engagement techniques...", count: 8 },
    { title: "Chat 3", date: "2025-01-06", preview: "Planning for differentiated instruction...", count: 10 },
    { title: "Chat 4", date: "2025-01-05", preview: "Parent communication follow-up summary...", count: 10 },
  ];

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Reflection</h1>
      <p style={{ color: "#666", marginTop: 6 }}>
        Review your conversation history and track your professional development
      </p>

      {/* 顶部 tabs */}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #eee", background: "#111", color: "#fff" }}>
          Chat History
        </button>
        <button style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #eee", background: "#fff" }}>
          Analytics
        </button>
      </div>

      <h2 style={{ fontSize: 18, marginTop: 24 }}>Your Conversations</h2>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 16,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#f5f5f5",
                  display: "grid",
                  placeItems: "center",
                  color: "#111",
                }}
              >
                <MessageSquare size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{it.title}</div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>🕒 {it.date}</div>
                <div style={{ color: "#555", marginTop: 8 }}>{it.preview}</div>
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#555",
                border: "1px solid #eee",
                padding: "4px 8px",
                borderRadius: 999,
                background: "#fafafa",
              }}
            >
              {it.count} messages
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
