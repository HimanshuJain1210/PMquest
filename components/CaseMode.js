"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import Mascot from "./Mascot";

export default function CaseMode({ unit, caseData, onExit, onComplete }) {
  const [step, setStep] = useState(0);
  const [decision, setDecision] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [startedAt] = useState(Date.now());

  const steps = caseData.steps;
  const s = steps[step];
  const isLast = step === steps.length - 1;

  async function submit() {
    if (decision.trim().length < 8) return;
    setLoading(true);
    try {
      const r = await fetch("/api/case", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ premise: caseData.premise, situation: s.situation, teaches: s.teaches, decision }),
      });
      const j = await r.json();
      setFeedback(j);
      if (typeof j.score === "number") setScores((arr) => [...arr, j.score]);
      else setScores((arr) => [...arr, 70]); // ungraded → neutral credit
    } catch {
      setFeedback({ verdict: "error", feedback: "Couldn't reach the mentor. Compare your decision to the ideal move.", ideal: s.teaches });
      setScores((arr) => [...arr, 70]);
    }
    setLoading(false);
  }

  function next() {
    if (isLast) {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      onComplete?.({ unit: unit.id, avg, totalMs: Date.now() - startedAt, steps: steps.length });
    } else {
      setStep((i) => i + 1);
      setDecision("");
      setFeedback(null);
    }
  }

  const verdictColor = feedback?.verdict === "strong" ? "var(--teal-dk)" : feedback?.verdict === "weak" ? "var(--rose)" : "var(--gold)";

  return (
    <div className="lesson">
      <div className="progress-top">
        <button className="close-x" onClick={onExit} aria-label="Exit case">×</button>
        <div className="xbar"><i style={{ width: `${((step + (feedback ? 1 : 0)) / steps.length) * 100}%`, background: "linear-gradient(90deg,var(--violet),#8b7cf0)" }} /></div>
        <span className="pill" style={{ background: "#efe9ff", color: "var(--violet)" }}>Case {step + 1}/{steps.length}</span>
      </div>

      {step === 0 && !feedback && (
        <div className="card" style={{ marginBottom: 16, background: "#efe9ff", borderColor: "#d9d0ff" }}>
          <div className="q-type-tag" style={{ color: "var(--violet)" }}>The brief</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{caseData.premise}</div>
        </div>
      )}

      <div className="q-type-tag">Decision point</div>
      <h2 className="q-stem" style={{ fontSize: 20 }}>{s.situation}</h2>

      {!feedback ? (
        <>
          <textarea className="recall" placeholder="What do you do, and why? Think like a PM…" value={decision} onChange={(e) => setDecision(e.target.value)} autoFocus />
          {s.hint && <p className="kbd-hint">💡 Hint: {s.hint}</p>}
          <button className="btn ink" style={{ width: "100%", marginTop: 14 }} disabled={loading || decision.trim().length < 8} onClick={submit}>
            {loading ? "Mentor is reading…" : "Submit decision"}
          </button>
        </>
      ) : (
        <>
          <div className="card" style={{ borderColor: verdictColor }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Mascot mood={feedback.verdict === "strong" ? "happy" : feedback.verdict === "weak" ? "sad" : "think"} size={48} />
              <div>
                <div style={{ fontWeight: 800, color: verdictColor, textTransform: "capitalize" }}>
                  {feedback.verdict === "error" || feedback.verdict === "ungraded" ? "Compare & learn" : feedback.verdict}
                  {typeof feedback.score === "number" && ` · ${feedback.score}/100`}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Your decision</div>
              </div>
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{feedback.feedback}</div>
            {feedback.ideal && (
              <div style={{ marginTop: 12, background: "#e9faf6", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 11.5, fontWeight: 900, color: "var(--teal-dk)", textTransform: "uppercase", letterSpacing: ".05em" }}>What a strong PM does</div>
                <div style={{ fontSize: 13.5, marginTop: 3 }}>{feedback.ideal}</div>
              </div>
            )}
          </div>
          <button className="btn teal" style={{ width: "100%", marginTop: 14 }} onClick={next}>
            {isLast ? "Finish case" : "Next decision"}
          </button>
        </>
      )}
    </div>
  );
}
