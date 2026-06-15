"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import { CURRICULUM } from "@/data/questions";

const SEV = { good: "var(--teal-dk)", watch: "var(--gold)", act: "var(--rose)" };

export default function Insights({ state }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  function buildSummary() {
    const completed = state.completed || {};
    const tally = state.missTally || {};
    const lessons = [];
    CURRICULUM.forEach((u) => {
      u.lessons.forEach((l) => {
      const key = `${u.id}:${l.id}`;
      const c = completed[key];
      const t = tally[key];
      if (c || t) {
        lessons.push({
          unit: u.title, lesson: l.title,
          completed: !!c,
          bestAccuracy: c?.bestAccuracy ?? null,
          avgTimeSec: c ? Math.round((c.durationMs || 0) / 1000) : null,
          attempts: t?.attempts ?? 0,
          misses: t?.misses ?? 0,
          lastSeen: t?.lastSeen ?? c?.lastDoneAt ?? null,
        });
      }
      });
    });
    return {
      xp: state.xp || 0, streak: state.streak || 0,
      lessonsDone: Object.keys(completed).length,
      lessons,
    };
  }

  async function run() {
    setLoading(true); setMsg(null); setData(null);
    try {
      const r = await fetch("/api/insights", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: buildSummary() }),
      });
      const j = await r.json();
      if (j.unavailable) setMsg(j.reason);
      else setData(j);
    } catch { setMsg("Couldn't reach the insights service."); }
    setLoading(false);
  }

  const hasData = Object.keys(state.completed || {}).length > 0 || Object.keys(state.missTally || {}).length > 0;

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <Icon name="chart" style={{ width: 20, height: 20, color: "var(--violet)" }} />
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)" }}>AI study coach</h3>
        <span className="pill" style={{ marginLeft: "auto", background: "#efe9ff", color: "var(--violet)" }}>AI</span>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "0 0 12px" }}>
        An AI analyst reads your accuracy, time, and miss-patterns and tells you what to focus on next.
      </p>

      {!data && (
        <button className="btn ink sm" disabled={loading || !hasData} onClick={run} style={{ width: "100%" }}>
          {loading ? "Analysing your data…" : hasData ? "Analyse my progress" : "Complete a lesson first"}
        </button>
      )}
      {msg && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>{msg}</p>}

      {data && (
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, margin: "4px 0 12px" }}>{data.headline}</div>
          {(data.insights || []).map((ins, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, marginTop: 6, flex: "none", background: SEV[ins.severity] || "var(--muted)" }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{ins.label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{ins.detail}</div>
              </div>
            </div>
          ))}
          {data.focus && (
            <div style={{ marginTop: 12, background: "#efe9ff", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11.5, fontWeight: 900, color: "var(--violet)", textTransform: "uppercase", letterSpacing: ".05em" }}>Focus next</div>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>{data.focus.unit}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{data.focus.why}</div>
            </div>
          )}
          {data.encouragement && <p style={{ fontSize: 13.5, marginTop: 12, color: "var(--ink)" }}>💪 {data.encouragement}</p>}
          <button className="btn ghost sm" style={{ width: "100%", marginTop: 12 }} onClick={run}>Re-analyse</button>
        </div>
      )}
    </div>
  );
}
