"use client";
import { useState, useEffect, useCallback } from "react";
import { Icon } from "@/components/Icon";
import SkillTree, { FREE_UNITS } from "@/components/SkillTree";
import Lesson from "@/components/Lesson";
import Notes from "@/components/Notes";
import Profile from "@/components/Profile";
import Forge from "@/components/Forge";
import AuthScreen from "@/components/AuthScreen";
import { CURRICULUM } from "@/data/questions";
import { getSupabase, supabaseConfigured } from "@/lib/supabaseClient";
import { initAnalytics, track, identify } from "@/lib/analytics";
import {
  loadLocal, saveLocal, regenHearts, msUntilNextHeart,
  rolloverDaily, applyStreak,
  fetchRemoteState, pushProfile, pushProgress, logAttempt,
} from "@/lib/store";

export default function LearnPage() {
  const [tab, setTab] = useState("learn"); // learn | notes | me
  const [state, setState] = useState(() => loadLocal());
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(null); // {unit, lesson} when in a lesson
  const [auth, setAuth] = useState(null); // {reason} when showing auth
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);

  // ── init analytics + session ──────────────────────────────
  useEffect(() => {
    initAnalytics();
    let unsub;
    (async () => {
      const sb = getSupabase();
      if (sb) {
        const { data } = await sb.auth.getUser();
        if (data?.user) {
          setUser(data.user);
          identify(data.user.id, { email: data.user.email });
          const remote = await fetchRemoteState(data.user.id);
          if (remote) {
            const merged = rolloverDaily(regenHearts({ ...loadLocal(), ...remote }));
            setState(merged);
          }
        }
        const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
          setUser(session?.user || null);
          if (session?.user) identify(session.user.id, { email: session.user.email });
        });
        unsub = sub?.subscription;
      }
      // local rollover + heart regen regardless
      setState((s) => rolloverDaily(regenHearts(s)));
      setReady(true);
    })();
    return () => { try { unsub?.unsubscribe(); } catch {} };
  }, []);

  // ── persist on state change ───────────────────────────────
  useEffect(() => {
    if (!ready) return;
    saveLocal(state);
    if (user) pushProfile(user.id, state);
  }, [state, ready, user]);

  // ── heart regen ticker ────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setState((s) => regenHearts(s)), 30000);
    return () => clearInterval(t);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  // ── start a lesson ────────────────────────────────────────
  function startLesson(unit, lesson) {
    const s = regenHearts(state);
    if (s.hearts <= 0) {
      const ms = msUntilNextHeart(s);
      const min = Math.ceil(ms / 60000);
      showToast(`Out of hearts — next one in ~${min} min`);
      setState(s);
      return;
    }
    setState(s);
    track("lesson_started", { unit: unit.id, lesson: lesson.id });
    setActive({ unit, lesson, startHearts: s.hearts });
  }

  // ── play an ephemeral (AI-generated) quiz or review session ──
  function playForge(unit, lesson, opts = {}) {
    if (opts.ephemeral) {
      // generated quizzes: full hearts, no progress write, no paywall
      track("forge_quiz_started", { count: lesson.q.length });
      setActive({ unit, lesson, startHearts: 5, ephemeral: true });
      setTab("learn");
    } else {
      // adaptive review jumps into a real lesson
      track("review_started", { unit: unit.id, lesson: lesson.id });
      startLesson(unit, lesson);
      setTab("learn");
    }
  }

  function onLockedUnit(unit) {
    track("paywall_hit", { unit: unit.id });
    setAuth({ reason: "Unlock all chapters" });
  }

  // ── per-question answer (timing + analytics + miss tally) ──
  function onAnswer(payload) {
    track("question_answered", payload);
    if (user) logAttempt(user.id, payload);
    setState((s) => {
      const key = `${payload.unit}:${payload.lesson}`;
      const t = s.missTally?.[key] || { misses: 0, attempts: 0, lastSeen: null };
      return {
        ...s,
        missTally: {
          ...(s.missTally || {}),
          [key]: {
            misses: t.misses + (payload.correct ? 0 : 1),
            attempts: t.attempts + 1,
            lastSeen: new Date().toISOString(),
          },
        },
      };
    });
  }

  // ── lesson complete ───────────────────────────────────────
  function onComplete(res) {
    const { unit, lesson, passed, accuracy, totalMs, heartsLeft } = res;
    const isEphemeral = active?.ephemeral;
    setState((prev) => {
      let s = rolloverDaily(regenHearts(prev));
      s.hearts = heartsLeft;
      s.heartsUpdatedAt = Date.now();
      const xpGain = passed ? 10 + res.correct * 4 : res.correct * 2;
      s.xp = (s.xp || 0) + xpGain;
      s.todayXP = (s.todayXP || 0) + xpGain;
      if (isEphemeral) {
        // generated quiz: grant XP + streak but don't touch the skill tree
        if (passed) {
          const before = s.streak;
          s = applyStreak(s);
          if (s.streak !== before) track("streak_extended", { streak_days: s.streak });
        }
        track("forge_quiz_completed", { accuracy, xp: xpGain });
        return s;
      }
      if (passed) {
        const before = s.streak;
        s = applyStreak(s);
        if (s.streak !== before) track("streak_extended", { streak_days: s.streak });
        const key = `${unit.id}:${lesson.id}`;
        const prevBest = s.completed[key]?.bestAccuracy || 0;
        s.completed = {
          ...s.completed,
          [key]: {
            bestAccuracy: Math.max(prevBest, accuracy),
            lastDoneAt: new Date().toISOString(),
            durationMs: (s.completed[key]?.durationMs || 0) + totalMs,
          },
        };
        if (user) pushProgress(user.id, unit.id, lesson.id, Math.max(prevBest, accuracy), totalMs);
        // unlock check: if this finishes a free unit boundary and user not signed in
        const unitIdx = CURRICULUM.findIndex((u) => u.id === unit.id);
        track("lesson_completed", { unit: unit.id, lesson: lesson.id, xp: xpGain, accuracy, total_duration_ms: totalMs, hearts_left: heartsLeft });
        if (unitIdx === FREE_UNITS - 1 && !user) {
          const allFreeDone = CURRICULUM.slice(0, FREE_UNITS).every((u) =>
            u.lessons.every((l) => (l.id === lesson.id && u.id === unit.id) || s.completed[`${u.id}:${l.id}`])
          );
          if (allFreeDone) setTimeout(() => setAuth({ reason: "You finished the free chapters! 🎉" }), 400);
        }
      } else {
        track("lesson_failed", { unit: unit.id, lesson: lesson.id });
      }
      return s;
    });
  }

  // ── render ────────────────────────────────────────────────
  if (auth) {
    return <AuthScreen reason={auth.reason} onClose={supabaseConfigured() ? () => setAuth(null) : () => setAuth(null)} />;
  }

  if (active) {
    return (
      <Lesson
        unit={active.unit}
        lesson={active.lesson}
        startHearts={active.startHearts}
        onExit={() => setActive(null)}
        onAnswer={onAnswer}
        onComplete={onComplete}
      />
    );
  }

  return (
    <>
      <header className="hud">
        <div className="brand"><span className="logo">◆</span> PM Quest</div>
        <div className="stat streak"><Icon name="flame" /> {state.streak || 0}</div>
        <div className="stat xp"><Icon name="bolt" /> {state.xp || 0}</div>
        <div className="stat hearts"><Icon name="heart" /> {regenHearts(state).hearts}</div>
      </header>

      {tab === "learn" && (
        <SkillTree state={state} user={user} onStart={startLesson} onLockedUnit={onLockedUnit} />
      )}
      {tab === "notes" && <Notes user={user} onToast={showToast} />}
      {tab === "forge" && <Forge state={state} onPlay={playForge} />}
      {tab === "me" && <Profile state={state} user={user} onSignIn={() => setAuth({ reason: "Sign in" })} />}

      <nav className="tabbar">
        <button className={tab === "learn" ? "active" : ""} onClick={() => setTab("learn")}>
          <Icon name="map" /> Learn
        </button>
        <button className={tab === "notes" ? "active" : ""} onClick={() => setTab("notes")}>
          <Icon name="pencil" /> Notes
        </button>
        <button className={tab === "forge" ? "active" : ""} onClick={() => setTab("forge")}>
          <Icon name="spark" /> Forge
        </button>
        <button className={tab === "me" ? "active" : ""} onClick={() => setTab("me")}>
          <Icon name="user" /> Me
        </button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
