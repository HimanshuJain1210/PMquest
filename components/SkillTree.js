"use client";
import { Icon } from "./Icon";
import Mascot from "./Mascot";
import { CURRICULUM } from "@/data/questions";

const OFFSETS = ["", "cr", "r", "cr", "", "cl", "l", "cl"];
export const FREE_UNITS = 3; // first 3 chapters free

export default function SkillTree({ state, user, onStart, onLockedUnit }) {
  const completed = state.completed || {};

  function unitDoneCount(u) {
    return u.lessons.filter((l) => completed[`${u.id}:${l.id}`]).length;
  }

  return (
    <div className="wrap">
      <Hero state={state} />
      {CURRICULUM.map((u, ui) => {
        const locked = ui >= FREE_UNITS && !user;
        const dn = unitDoneCount(u);
        // find first incomplete lesson index (the "current" node)
        let currentIdx = u.lessons.findIndex((l) => !completed[`${u.id}:${l.id}`]);
        if (currentIdx === -1) currentIdx = u.lessons.length; // all done
        return (
          <div key={u.id}>
            <div className="unit-head" style={{ background: u.color }}>
              <span className="uidx">{String(ui + 1).padStart(2, "0")}</span>
              <h2>{u.title}</h2>
              <p>{u.blurb}</p>
              {locked ? (
                <span className="lock-note"><Icon name="lock" style={{ width: 13, height: 13 }} /> Sign in to unlock</span>
              ) : (
                <span className="lock-note"><Icon name="check" style={{ width: 13, height: 13 }} /> {dn}/{u.lessons.length} lessons</span>
              )}
            </div>

            <div className="path">
              {u.lessons.map((l, li) => {
                const isDone = !!completed[`${u.id}:${l.id}`];
                const isCurrent = !locked && li === currentIdx;
                const isLocked = locked || (!isDone && !isCurrent && li > currentIdx);
                const off = OFFSETS[li % OFFSETS.length];
                const cls = `node ${isDone ? "done" : ""} ${isCurrent ? "current" : ""} ${isLocked ? "locked" : ""}`;
                return (
                  <div className="node-row" data-off={off || undefined} key={l.id}>
                    {isCurrent && <span className="start-flag">START</span>}
                    <button
                      className={cls}
                      style={isDone ? { background: u.color, borderColor: u.color, boxShadow: `0 6px 0 ${shade(u.color)}` } : isCurrent ? { borderColor: u.color, boxShadow: `0 6px 0 ${shade(u.color)}` } : {}}
                      onClick={() => {
                        if (locked) { onLockedUnit(u); return; }
                        if (isLocked) return;
                        onStart(u, l);
                      }}
                      aria-label={l.title}
                    >
                      {isCurrent && <span className="ring" style={{ borderColor: u.color }} />}
                      {isDone ? <span className="check">✓</span> : <Icon name={u.icon} style={{ width: 30, height: 30, color: isCurrent ? u.color : "var(--muted-2)" }} />}
                      <span className="node-label">{l.title}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center", color: "var(--muted-2)", fontSize: 13, marginTop: 30, fontWeight: 700 }}>
        More chapters coming — analytics, GTM, growth. 🚀
      </div>
    </div>
  );
}

function Hero({ state }) {
  const goal = state.dailyGoalXP || 30;
  const pct = Math.min(100, Math.round(((state.todayXP || 0) / goal) * 100));
  return (
    <div className="card" style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 14 }}>
      <Mascot mood="idle" size={64} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Daily goal</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>{state.todayXP || 0} / {goal} XP today</div>
        <div className="xbar"><i style={{ width: `${pct}%`, background: "linear-gradient(90deg,var(--gold),#ffd166)" }} /></div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, color: "var(--coral)" }}>{state.streak || 0}</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: ".05em" }}>day streak</div>
      </div>
    </div>
  );
}

function shade(hex) {
  // darken a hex by ~18% for the 3D shadow
  const c = hex.replace("#", "");
  const r = Math.max(0, parseInt(c.slice(0, 2), 16) - 40);
  const g = Math.max(0, parseInt(c.slice(2, 4), 16) - 40);
  const b = Math.max(0, parseInt(c.slice(4, 6), 16) - 40);
  return `rgb(${r},${g},${b})`;
}
