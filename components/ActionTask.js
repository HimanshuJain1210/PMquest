"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import Mascot from "./Mascot";

export default function ActionTask({ unit, action, onExit, onComplete }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function submit() {
    if (text.trim().length < 10) return;
    setErr(null); setLoading(true);
    try {
      const r = await fetch("/api/critique", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: action.task, principle: action.principle, submission: text }),
      });
      const j = await r.json();
      if (j.unavailable) setErr(j.reason);
      else if (j.error) setErr(j.error);
      else setResult(j);
    } catch { setErr("Couldn't reach the reviewer."); }
    setLoading(false);
  }

  const vColor = result?.verdict === "ship" ? "var(--teal-dk)" : result?.verdict === "rethink" ? "var(--rose)" : "var(--gold)";

  return (
    <div className="lesson">
      <div className="progress-top">
        <button className="close-x" onClick={onExit} aria-label="Exit task">×</button>
        <div style={{ flex: 1, fontWeight: 800, fontFamily: "var(--font-display)" }}>Action task</div>
        <span className="pill">Apply it</span>
      </div>

      <div className="card" style={{ marginBottom: 16, background: "#fff6e8", borderColor: "#ffe2b8" }}>
        <div className="q-type-tag" style={{ color: "#9a6a00" }}>{action.title}</div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>{action.task}</div>
      </div>

      {!result ? (
        <>
          <textarea className="recall" style={{ minHeight: 150 }} placeholder={action.placeholder || "Your work here…"} value={text} onChange={(e) => setText(e.target.value)} autoFocus />
          <button className="btn ink" style={{ width: "100%", marginTop: 14 }} disabled={loading || text.trim().length < 10} onClick={submit}>
            {loading ? "Reviewer is reading…" : "Get AI critique"}
          </button>
          {err && <p style={{ color: "var(--rose)", fontSize: 13, marginTop: 10 }}>{err}</p>}
        </>
      ) : (
        <>
          <div className="card" style={{ borderColor: vColor }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Mascot mood={result.verdict === "ship" ? "celebrate" : "think"} size={52} />
              <div>
                <div style={{ fontWeight: 800, color: vColor, textTransform: "capitalize" }}>
                  {result.verdict || "Reviewed"}{typeof result.score === "number" && ` · ${result.score}/100`}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Mentor review</div>
              </div>
            </div>
            {result.strengths?.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "var(--teal-dk)", textTransform: "uppercase" }}>Strengths</div>
                <ul style={{ margin: "4px 0 0", paddingLeft: 18, fontSize: 14 }}>
                  {result.strengths.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}
                </ul>
              </div>
            )}
            {result.improvements?.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 900, color: "#9a6a00", textTransform: "uppercase" }}>Sharpen</div>
                <ul style={{ margin: "4px 0 0", paddingLeft: 18, fontSize: 14 }}>
                  {result.improvements.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}
                </ul>
              </div>
            )}
            {result.upgraded_example && (
              <div style={{ background: "#e9faf6", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 900, color: "var(--teal-dk)", textTransform: "uppercase" }}>Upgraded example</div>
                <div style={{ fontSize: 13.5, marginTop: 3, fontStyle: "italic" }}>{result.upgraded_example}</div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn ghost" style={{ flex: 1 }} onClick={() => { setResult(null); }}>Revise</button>
            <button className="btn teal" style={{ flex: 1 }} onClick={() => onComplete?.({ unit: unit.id, score: result.score || 70 })}>Done</button>
          </div>
        </>
      )}
    </div>
  );
}
