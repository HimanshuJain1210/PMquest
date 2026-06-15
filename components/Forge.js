"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import { CURRICULUM } from "@/data/questions";

export default function Forge({ state, onPlay }) {
  const [mode, setMode] = useState("generate"); // generate | review
  const [source, setSource] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [reviewPlan, setReviewPlan] = useState(null);

  async function generate() {
    setErr(null); setLoading(true);
    try {
      const r = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, count }),
      });
      const j = await r.json();
      if (j.error) setErr(j.error);
      else if (j.questions?.length) {
        onPlay(
          { id: "forge", title: "AI Quiz", color: "var(--violet)", icon: "spark" },
          { id: `gen_${Date.now()}`, title: "Generated quiz", q: j.questions },
          { ephemeral: true }
        );
      }
    } catch { setErr("Couldn't reach the generator."); }
    setLoading(false);
  }

  async function planReview() {
    setErr(null); setLoading(true); setReviewPlan(null);
    const tally = state.missTally || {};
    const missData = Object.entries(tally).map(([k, v]) => {
      const [unit, lesson] = k.split(":");
      return { unit, lesson, misses: v.misses, attempts: v.attempts, lastSeen: v.lastSeen };
    });
    const catalog = [];
    CURRICULUM.forEach((u) => u.lessons.forEach((l) => catalog.push({ unit: u.id, lesson: l.id, title: `${u.title} — ${l.title}` })));
    try {
      const r = await fetch("/api/review", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missData, catalog }),
      });
      const j = await r.json();
      if (j.unavailable) setErr(j.reason);
      else setReviewPlan(j);
    } catch { setErr("Couldn't reach the review planner."); }
    setLoading(false);
  }

  function playReviewLesson(unitId, lessonId) {
    const u = CURRICULUM.find((x) => x.id === unitId);
    const l = u?.lessons.find((x) => x.id === lessonId);
    if (u && l) onPlay(u, l, { review: true });
  }

  const hasMiss = Object.keys(state.missTally || {}).length > 0;

  return (
    <div className="wrap">
      <h2 style={{ fontFamily: "var(--font-display)", margin: "0 0 4px", fontSize: 24 }}>Forge</h2>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 16px" }}>Turn your own notes into a quiz, or let AI plan your review.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={`btn sm ${mode === "generate" ? "" : "ghost"}`} onClick={() => setMode("generate")}>From notes</button>
        <button className={`btn sm ${mode === "review" ? "" : "ghost"}`} onClick={() => setMode("review")}>Adaptive review</button>
      </div>

      {mode === "generate" ? (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Icon name="spark" style={{ width: 18, height: 18, color: "var(--violet)" }} />
            <h3 style={{ margin: 0 }}>Generate from your notes</h3>
            <span className="pill" style={{ marginLeft: "auto", background: "#efe9ff", color: "var(--violet)" }}>AI</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 0 }}>Paste a paragraph or two. The AI writes grounded questions in the app's style — including trap questions.</p>
          <textarea className="recall" placeholder="Paste lecture notes, an article, or your own summary…" value={source} onChange={(e) => setSource(e.target.value)} style={{ minHeight: 160 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>Questions:</span>
            {[3, 5, 8].map((n) => (
              <button key={n} className={`btn sm ${count === n ? "" : "ghost"}`} onClick={() => setCount(n)}>{n}</button>
            ))}
          </div>
          <button className="btn ink" style={{ width: "100%" }} disabled={loading || source.trim().length < 40} onClick={generate}>
            {loading ? "Forging your quiz…" : "Generate & play"}
          </button>
          {err && <p style={{ color: "var(--rose)", fontSize: 13, marginTop: 10 }}>{err}</p>}
        </div>
      ) : (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Icon name="target" style={{ width: 18, height: 18, color: "var(--coral)" }} />
            <h3 style={{ margin: 0 }}>Adaptive review</h3>
            <span className="pill" style={{ marginLeft: "auto" }}>AI</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 0 }}>The AI looks at what you've missed and least-recently seen, then orders your review.</p>
          <button className="btn" style={{ width: "100%" }} disabled={loading || !hasMiss} onClick={planReview}>
            {loading ? "Planning…" : hasMiss ? "Plan my review" : "Answer some questions first"}
          </button>
          {err && <p style={{ color: "var(--rose)", fontSize: 13, marginTop: 10 }}>{err}</p>}
          {reviewPlan && (
            <div style={{ marginTop: 14 }}>
              {reviewPlan.note && <p style={{ fontSize: 13, color: "var(--muted)" }}>{reviewPlan.note}</p>}
              {(reviewPlan.plan || []).map((p, i) => {
                const u = CURRICULUM.find((x) => x.id === p.unit);
                const l = u?.lessons.find((x) => x.id === p.lesson);
                if (!u || !l) return null;
                return (
                  <button key={i} className="opt" style={{ marginBottom: 9 }} onClick={() => playReviewLesson(p.unit, p.lesson)}>
                    <span className="key" style={{ background: u.color, color: "#fff", border: "none" }}>{i + 1}</span>
                    <span style={{ flex: 1 }}>
                      <b>{u.title} — {l.title}</b>
                      <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600 }}>{p.reason}</div>
                    </span>
                    <Icon name="bolt" style={{ width: 16, height: 16, color: "var(--gold)" }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
