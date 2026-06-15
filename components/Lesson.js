"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Icon } from "./Icon";

const KEYS = ["A", "B", "C", "D", "E"];

// shuffle helper (stable per question instance)
function shuffled(arr) {
  const a = arr.map((v, i) => [v, i]);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function HeartRow({ n }) {
  return (
    <div className="heart-mini" aria-label={`${n} hearts left`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="heart" style={{ color: i < n ? "var(--rose)" : "#e7ddca" }} />
      ))}
    </div>
  );
}

export default function Lesson({ unit, lesson, startHearts, onExit, onComplete, onAnswer }) {
  const questions = lesson.q;
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(startHearts);
  const [phase, setPhase] = useState("answer"); // answer | feedback
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt] = useState(Date.now());
  const qStartRef = useRef(Date.now());
  const [lastCorrect, setLastCorrect] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  // per-type local answer state
  const [sel, setSel] = useState(null); // mcq/trap index
  const [text, setText] = useState(""); // fill/recall
  const [order, setOrder] = useState([]); // order working list
  const [matchSel, setMatchSel] = useState(null); // {side:'L'|'R', i}
  const [matches, setMatches] = useState({}); // Li -> Ri
  const [matchBad, setMatchBad] = useState(null);
  const [graderMsg, setGraderMsg] = useState(null);
  const [grading, setGrading] = useState(false);

  // shuffled option orders, recomputed per question
  const optOrder = useMemo(() => (q.options ? shuffled(q.options) : []), [idx]);
  const rightItems = useMemo(
    () => (q.pairs ? shuffled(q.pairs.map((p) => p[1])) : []),
    [idx]
  );

  useEffect(() => {
    // reset per-question
    setSel(null); setText(""); setMatchSel(null); setMatches({}); setMatchBad(null);
    setGraderMsg(null); setGrading(false);
    if (q.type === "order") {
      let shuf = shuffled(q.seq).map((s) => s[0]);
      // avoid starting already-correct (only matters for short lists)
      if (q.seq.length > 1 && shuf.every((v, i) => v === q.seq[i])) {
        shuf = [...shuf.slice(1), shuf[0]];
      }
      setOrder(shuf);
    }
    qStartRef.current = Date.now();
  }, [idx]); // eslint-disable-line

  function recordAndAdvance(wasCorrect) {
    const dur = Date.now() - qStartRef.current;
    onAnswer?.({ unit: unit.id, lesson: lesson.id, type: q.type, correct: wasCorrect, durationMs: dur });
    setLastCorrect(wasCorrect);
    if (wasCorrect) setCorrectCount((c) => c + 1);
    let h = hearts;
    if (!wasCorrect) { h = Math.max(0, hearts - 1); setHearts(h); }
    setPhase("feedback");
    if (h === 0) {
      // will show fail screen on continue
    }
  }

  // ── grading per type ──────────────────────────────────────
  function gradeMCQ() {
    const chosen = optOrder[sel]; // [value, origIndex]
    recordAndAdvance(chosen[1] === q.answer);
  }
  function gradeFill() {
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const accepts = (q.accept || [q.answer]).map(norm);
    recordAndAdvance(accepts.includes(norm(text)));
  }
  function gradeOrder() {
    const ok = order.every((v, i) => v === q.seq[i]);
    recordAndAdvance(ok);
  }
  function gradeMatch() {
    // all left matched & correct
    const ok = q.pairs.every((p, li) => matches[li] === p[1]);
    recordAndAdvance(ok);
  }
  async function gradeRecall() {
    if (!text.trim()) return;
    setGrading(true);
    try {
      const r = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.q, modelAnswer: q.answer, userAnswer: text }),
      });
      const data = await r.json();
      setGraderMsg(data);
      const ok = data.verdict === "pass" || (typeof data.score === "number" && data.score >= 70);
      // ungraded -> treat as correct (self-rate), don't deduct a heart
      const treatCorrect = data.verdict === "ungraded" || data.verdict === "error" ? true : ok;
      recordAndAdvance(treatCorrect);
    } catch {
      setGraderMsg({ verdict: "ungraded", feedback: "Couldn't reach the grader — compare to the model answer." });
      recordAndAdvance(true);
    } finally {
      setGrading(false);
    }
  }

  function check() {
    if (q.type === "mcq" || q.type === "trap") gradeMCQ();
    else if (q.type === "fill") gradeFill();
    else if (q.type === "order") gradeOrder();
    else if (q.type === "match") gradeMatch();
    else if (q.type === "recall") gradeRecall();
  }

  function continueNext() {
    if (hearts === 0 && !lastCorrect) {
      finish(false);
      return;
    }
    if (idx + 1 >= questions.length) {
      finish(true);
    } else {
      setIdx((i) => i + 1);
      setPhase("answer");
    }
  }

  function finish(passed) {
    const totalMs = Date.now() - startedAt;
    const accuracy = Math.round((correctCount / questions.length) * 100);
    setDone({ passed, accuracy, totalMs, correct: correctCount, total: questions.length });
    onComplete?.({
      unit: unit.id, lesson: lesson.id, passed, accuracy,
      totalMs, correct: correctCount, total: questions.length, heartsLeft: hearts,
    });
  }

  // ── can submit? ───────────────────────────────────────────
  const canCheck =
    (q.type === "mcq" || q.type === "trap") ? sel !== null :
    q.type === "fill" ? text.trim().length > 0 :
    q.type === "recall" ? text.trim().length > 0 && !grading :
    q.type === "order" ? true :
    q.type === "match" ? Object.keys(matches).length === q.pairs.length :
    false;

  // ── match interactions ────────────────────────────────────
  function tapLeft(li) {
    if (phase !== "answer") return;
    if (Object.prototype.hasOwnProperty.call(matches, li)) {
      const m = { ...matches }; delete m[li]; setMatches(m); return;
    }
    setMatchSel({ side: "L", i: li });
  }
  function tapRight(val) {
    if (phase !== "answer") return;
    if (Object.values(matches).includes(val)) return; // already used
    if (matchSel?.side === "L") {
      setMatches((m) => ({ ...m, [matchSel.i]: val }));
      setMatchSel(null);
    } else {
      setMatchSel({ side: "R", val });
    }
  }

  // ── order interactions ────────────────────────────────────
  function move(i, dir) {
    if (phase !== "answer") return;
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const a = [...order];
    [a[i], a[j]] = [a[j], a[i]];
    setOrder(a);
  }

  if (done) {
    return <Result done={done} onExit={onExit} />;
  }

  const progress = ((idx + (phase === "feedback" ? 1 : 0)) / questions.length) * 100;

  return (
    <div>
      <div className="lesson">
        <div className="progress-top">
          <button className="close-x" onClick={onExit} aria-label="Exit lesson">×</button>
          <div className="xbar"><i style={{ width: `${progress}%` }} /></div>
          <HeartRow n={hearts} />
        </div>

        <div className="q-type-tag">
          {({mcq:"Choose one",trap:"Spot the misconception",fill:"Fill the blank",match:"Match the pairs",order:"Put in order",recall:"Active recall"})[q.type]}
        </div>
        <h2 className="q-stem">{q.q}</h2>

        {/* MCQ / TRAP */}
        {(q.type === "mcq" || q.type === "trap") && (
          <div>
            {optOrder.map(([val, orig], i) => {
              let cls = "opt";
              if (phase === "answer" && sel === i) cls += " sel";
              if (phase === "feedback") {
                if (orig === q.answer) cls += " correct";
                else if (sel === i) cls += " wrong";
                cls += " disabled";
              }
              return (
                <button key={i} className={cls} onClick={() => phase === "answer" && setSel(i)}>
                  <span className="key">{KEYS[i]}</span>
                  <span>{val}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* FILL */}
        {q.type === "fill" && (
          <div>
            <input
              className="fill-in" placeholder="Type your answer…" value={text}
              disabled={phase === "feedback"}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canCheck && phase === "answer" && check()}
              autoFocus
            />
            {phase === "feedback" && (
              <p className="kbd-hint">Answer: <b>{q.answer}</b></p>
            )}
          </div>
        )}

        {/* RECALL */}
        {q.type === "recall" && (
          <div>
            <textarea
              className="recall" placeholder="Write your answer in your own words…"
              value={text} disabled={phase === "feedback"}
              onChange={(e) => setText(e.target.value)} autoFocus
            />
            {phase === "feedback" && (
              <div className="card" style={{ marginTop: 12 }}>
                <div className="q-type-tag">Model answer</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{q.answer}</div>
                {graderMsg?.feedback && (
                  <div style={{ marginTop: 10, fontSize: 14, color: "var(--ink)" }}>
                    <b>{graderMsg.score != null ? `Grader: ${graderMsg.score}/100 — ` : ""}</b>
                    {graderMsg.feedback}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* MATCH */}
        {q.type === "match" && (
          <div className="match-grid">
            <div className="match-col">
              {q.pairs.map((p, li) => {
                let cls = "chip";
                const isMatched = Object.prototype.hasOwnProperty.call(matches, li);
                if (matchSel?.side === "L" && matchSel.i === li) cls += " sel";
                if (phase === "feedback") {
                  cls += matches[li] === p[1] ? " matched" : " badmatch";
                } else if (isMatched) cls += " matched";
                return (
                  <button key={li} className={cls} onClick={() => tapLeft(li)}>
                    {p[0]}
                    {isMatched && <div style={{ fontSize: 12, color: "var(--teal-dk)", marginTop: 4 }}>↔ {matches[li]}</div>}
                  </button>
                );
              })}
            </div>
            <div className="match-col">
              {rightItems.map(([val], ri) => {
                const used = Object.values(matches).includes(val);
                let cls = "chip";
                if (matchSel?.side === "R" && matchSel.val === val) cls += " sel";
                if (used) cls += " matched";
                return (
                  <button key={ri} className={cls} disabled={used && phase === "answer"} onClick={() => tapRight(val)}>
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ORDER */}
        {q.type === "order" && (
          <div className="order-list">
            {order.map((v, i) => {
              let cls = "order-item";
              if (phase === "feedback") cls += v === q.seq[i] ? " correct" : " wrong";
              return (
                <div key={v} className={cls}>
                  <span className="num">{i + 1}</span>
                  <span>{v}</span>
                  {phase === "answer" && (
                    <span className="arrows">
                      <button onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                      <button onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* check button (when answering) */}
        {phase === "answer" && (
          <div style={{ marginTop: 22 }}>
            <button className="btn" style={{ width: "100%", padding: 15 }} disabled={!canCheck} onClick={check}>
              {grading ? "Grading…" : "Check"}
            </button>
          </div>
        )}
      </div>

      {/* feedback footer */}
      {phase === "feedback" && (
        <div className={`feedback ${lastCorrect ? "good" : "bad"}`}>
          <div className="ftitle">
            <Icon name={lastCorrect ? "check" : "bolt"} style={{ width: 22, height: 22 }} />
            {lastCorrect ? "Nice — that's right" : (hearts === 0 ? "Out of hearts" : "Not quite")}
          </div>
          <div className="why">{q.why}</div>
          <div className="row">
            <button className={`btn ${lastCorrect ? "teal" : ""}`} style={{ flex: 1, padding: 14 }} onClick={continueNext}>
              {hearts === 0 && !lastCorrect ? "See results" : (idx + 1 >= questions.length ? "Finish" : "Continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Result({ done, onExit }) {
  const { passed, accuracy, totalMs, correct, total } = done;
  const secs = Math.round(totalMs / 1000);
  const mm = Math.floor(secs / 60), ss = secs % 60;
  const xp = passed ? 10 + correct * 4 : correct * 2;
  return (
    <div className="result">
      <div style={{ fontSize: 54 }}>{passed ? "🏆" : "💪"}</div>
      <div className="big">{passed ? "Lesson complete!" : "Good effort — try again"}</div>
      <div className="grid3">
        <div className="tile"><div className="n" style={{ color: "var(--gold)" }}>+{xp}</div><div className="l">XP</div></div>
        <div className="tile"><div className="n" style={{ color: "var(--teal-dk)" }}>{accuracy}%</div><div className="l">Accuracy</div></div>
        <div className="tile"><div className="n">{mm}:{String(ss).padStart(2, "0")}</div><div className="l">Time</div></div>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 14 }}>{correct} of {total} correct</p>
      <button className="btn" style={{ width: "100%", padding: 14, marginTop: 10 }} onClick={onExit}>
        {passed ? "Back to path" : "Back to path"}
      </button>
    </div>
  );
}
