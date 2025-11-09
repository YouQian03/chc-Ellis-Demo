"use client";

import { useState } from "react";

const ITEMS = [
  { date: "Nov 1 · 10:30 AM", title: "Create interactive group activity", sub: "Design collaborative learning exercise for next week's lesson", scenario: "Student Engagement", status: "Not start yet" },
  { date: "Nov 1 · 1:00 PM", title: "Review anxiety support resources", sub: "Research and implement calming techniques for anxious students", scenario: "Student Wellbeing", status: "Done" },
  { date: "Nov 2 · 11:00 AM", title: "Update lesson plan with differentiation", sub: "Adapt curriculum for different learning levels", scenario: "Lesson Planning", status: "Pending" },
  { date: "Nov 2 · 3:30 PM", title: "Prepare assessment materials", sub: "Create rubrics and grading criteria for upcoming project", scenario: "Classroom Management", status: "Done" },
  { date: "Nov 3 · 4:00 PM", title: "Send weekly progress report to parents", sub: "Email updates on student achievements and areas for improvement", scenario: "Parent Communication", status: "Done" },
  { date: "Nov 3 · 9:30 AM", title: "Organize peer mentoring program", sub: "Match struggling students with high-performing peers for support", scenario: "Student Engagement", status: "Pending" },
  { date: "Nov 4 · 2:00 PM", title: "Conduct one-on-one check-ins", sub: "Have private conversations with students showing signs of stress", scenario: "Student Wellbeing", status: "Not start yet" },
  { date: "Nov 4 · 10:00 AM", title: "Develop visual learning aids", sub: "Create infographics and diagrams for complex topics", scenario: "Lesson Planning", status: "Pending" },
];

const chip = (text: string, tone: "green" | "yellow" | "gray") => {
  const color =
    tone === "green" ? "#e8f7ee" :
    tone === "yellow" ? "#fff7e6" : "#f0f2f5";
  const fg =
    tone === "green" ? "#0a7a43" :
    tone === "yellow" ? "#a86a00" : "#4d596a";
  return (
    <span style={{ background: color, color: fg, padding: "4px 8px", borderRadius: 999, fontSize: 12 }}>
      {text}
    </span>
  );
};

export default function Page() {
  const [view, setView] = useState<"Day" | "Week" | "Month">("Month");

  const summary = {
    done: ITEMS.filter(i => i.status === "Done").length,
    pending: ITEMS.filter(i => i.status === "Pending").length,
    notYet: ITEMS.filter(i => i.status === "Not start yet").length,
  };

  return (
    <main className="mx-auto max-w-6xl w-full p-4">
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Actions Timetable</h1>
      <p style={{ color: "#667085", marginTop: 6 }}>View your scheduled actions organized by time and status</p>

      {/* View switch */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        {(["Day","Week","Month"] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: view === v ? "#0f172a" : "#fff",
              color: view === v ? "#fff" : "#0f172a",
              fontSize: 13
            }}
          >{v}</button>
        ))}
      </div>

      {/* Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 14 }}>
        <div style={{ background: "#e8f7ee", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#0a7a43" }}>{summary.done}</div>
          <div style={{ color: "#0a7a43" }}>Done</div>
        </div>
        <div style={{ background: "#fff7e6", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#a86a00" }}>{summary.pending}</div>
          <div style={{ color: "#a86a00" }}>Pending</div>
        </div>
        <div style={{ background: "#f0f2f5", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#4d596a" }}>{summary.notYet}</div>
          <div style={{ color: "#4d596a" }}>Not Start Yet</div>
        </div>
      </div>

      {/* List */}
      <div style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 220px 140px", fontWeight: 600, fontSize: 13, color: "#475467", background: "#fafafa", padding: "10px 14px", borderBottom: "1px solid #eee" }}>
          <div>Date & Time</div><div>Action</div><div>Scenario</div><div>Status</div>
        </div>
        {ITEMS.map((it, idx) => (
          <div key={idx} style={{ display: "grid", gridTemplateColumns: "220px 1fr 220px 140px", padding: "12px 14px", borderBottom: "1px solid #f2f2f2" }}>
            <div>{it.date}</div>
            <div>
              <div style={{ fontWeight: 600 }}>{it.title}</div>
              <div style={{ fontSize: 13, color: "#667085" }}>{it.sub}</div>
            </div>
            <div>{it.scenario}</div>
            <div>
              {it.status === "Done" && chip("Done","green")}
              {it.status === "Pending" && chip("Pending","yellow")}
              {it.status === "Not start yet" && chip("Not start yet","gray")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
