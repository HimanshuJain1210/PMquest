"use client";
import { Icon } from "./Icon";
import { CURRICULUM } from "@/data/questions";
import { getSupabase } from "@/lib/supabaseClient";
import { resetAnalytics } from "@/lib/analytics";
import Insights from "./Insights";

export default function Profile({ state, user, onSignIn }) {
  const completed = state.completed || {};
  const totalLessons = CURRICULUM.reduce((a, u) => a + u.lessons.length, 0);
  const doneLessons = Object.keys(completed).length;
  const totalMs = Object.values(completed).reduce((a, c) => a + (c.durationMs || 0), 0);
  const mins = Math.round(totalMs / 60000);
  const avgAcc = doneLessons
    ? Math.round(Object.values(completed).reduce((a, c) => a + (c.bestAccuracy || 0), 0) / doneLessons)
    : 0;

  async function signOut() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    resetAnalytics();
    window.location.reload();
  }

  return (
    <div className="wrap">
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center" }}>
          <Icon name="user" style={{ width: 26, height: 26 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user ? (user.email || "Signed in") : "Guest learner"}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>{user ? "Synced across devices" : "Progress saved on this device"}</div>
        </div>
        {user ? (
          <button className="btn ghost sm" onClick={signOut}>Sign out</button>
        ) : (
          <button className="btn sm" onClick={onSignIn}>Sign in</button>
        )}
      </div>

      <div className="result grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, margin: "0 0 16px" }}>
        <Stat icon="bolt" color="var(--gold)" n={state.xp || 0} l="Total XP" />
        <Stat icon="flame" color="var(--coral)" n={state.streak || 0} l="Day streak" />
        <Stat icon="clock" color="var(--teal-dk)" n={`${mins}m`} l="Time spent" />
      </div>
      <div className="result grid3" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, margin: "0 0 22px" }}>
        <Stat icon="check" color="var(--violet)" n={`${doneLessons}/${totalLessons}`} l="Lessons done" />
        <Stat icon="target" color="var(--ink)" n={`${avgAcc}%`} l="Avg accuracy" />
      </div>

      <Insights state={state} />

      <h3 style={{ fontFamily: "var(--font-display)", margin: "0 0 12px" }}>Chapter progress</h3>
      {CURRICULUM.map((u) => {
        const dn = u.lessons.filter((l) => completed[`${u.id}:${l.id}`]).length;
        const pct = Math.round((dn / u.lessons.length) * 100);
        return (
          <div key={u.id} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 5 }}>
              <span>{u.title}</span><span style={{ color: "var(--muted)" }}>{dn}/{u.lessons.length}</span>
            </div>
            <div className="xbar"><i style={{ width: `${pct}%`, background: u.color }} /></div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({ icon, color, n, l }) {
  return (
    <div className="tile" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 14, padding: 14, boxShadow: "var(--shadow)" }}>
      <Icon name={icon} style={{ width: 20, height: 20, color, margin: "0 auto 4px", display: "block" }} />
      <div className="n" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color }}>{n}</div>
      <div className="l" style={{ fontSize: 11, fontWeight: 800, color: "var(--muted-2)", textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</div>
    </div>
  );
}
