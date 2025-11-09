"use client";

import { useState } from "react";

type Post = {
  user: string;
  when: string;
  tag: string;
  title: string;
  preview: string;
  replies: number;
  likes: number;
};

const POSTS: Post[] = [
  { user: "Sarah Mitchell", when: "2 hours ago", tag: "Classroom Management", title: "Effective strategies for managing classroom disruptions", preview: "I’ve been trying different approaches during lessons. What techniques have worked best for you?", replies: 24, likes: 45 },
  { user: "James Peterson", when: "5 hours ago", tag: "Parent Communication", title: "Parent communication tips for difficult conversations", preview: "How do you approach parent meetings when discussing challenging topics about student performance?", replies: 18, likes: 32 },
  { user: "Maria Rodriguez", when: "1 day ago", tag: "Student Wellbeing", title: "Supporting students with anxiety in the classroom", preview: "I’ve noticed increasing anxiety levels. Any practical interventions that helped you?", replies: 31, likes: 67 },
  { user: "David Chen", when: "2 days ago", tag: "Lesson Planning", title: "Differentiated instruction ideas for mixed-ability classes", preview: "Looking for concrete examples for a unit on persuasive writing.", replies: 12, likes: 21 },
];

const TAGS = ["All Discussions","Classroom Management","Parent Communication","Student Wellbeing","Lesson Planning","Student Engagement"];

export default function Page() {
  const [active, setActive] = useState("All Discussions");

  const filtered = active === "All Discussions" ? POSTS : POSTS.filter(p => p.tag === active);

  return (
    <main className="mx-auto max-w-6xl w-full p-4">
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Community</h1>
      <p style={{ color: "#667085", marginTop: 6 }}>Connect with fellow educators, share experiences, and learn from each other</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
        {[
          { label: "Active Members", value: "1,247" },
          { label: "Discussions", value: "3,456" },
          { label: "This Week", value: "892" },
        ].map((s) => (
          <div key={s.label} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
            <div style={{ color: "#667085", fontSize: 13 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 2 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        {TAGS.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              background: active === t ? "#0f172a" : "#fff",
              color: active === t ? "#fff" : "#0f172a",
              fontSize: 13
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {filtered.map((p, i) => (
          <article key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#475467", fontSize: 13 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e7eb", display: "grid", placeItems: "center", fontWeight: 700 }}>{p.user.split(" ")[0][0]}</div>
              <div style={{ fontWeight: 600 }}>{p.user}</div>
              <div>•</div>
              <div>{p.when}</div>
              <div style={{ marginLeft: "auto", fontSize: 12, background: "#eef2ff", color: "#4338ca", padding: "4px 8px", borderRadius: 999 }}>{p.tag}</div>
            </div>
            <h3 style={{ margin: "10px 0 6px", fontSize: 18, fontWeight: 700 }}>{p.title}</h3>
            <p style={{ color: "#667085", margin: 0 }}>{p.preview}</p>
            <div style={{ color: "#475467", fontSize: 13, marginTop: 10, display: "flex", gap: 16 }}>
              <span>{p.replies} replies</span>
              <span>{p.likes} likes</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
