"use client";
import { getSupabase } from "./supabaseClient";

// ── Local (demo / pre-login) store ────────────────────────────
const LS_KEY = "pmquest_state_v1";

const DEFAULT_STATE = {
  xp: 0,
  streak: 0,
  lastActive: null, // YYYY-MM-DD
  hearts: 5,
  heartsUpdatedAt: Date.now(),
  completed: {}, // { "unit:lesson": {bestAccuracy, lastDoneAt, durationMs} }
  missed: {}, // SRS queue: { qKey: dueAt }
  missTally: {}, // { "unit:lesson": {misses, attempts, lastSeen} } for adaptive review
  dailyGoalXP: 30,
  todayXP: 0,
  todayDate: null,
};

const HEART_REGEN_MS = 1000 * 60 * 20; // 1 heart per 20 min
const MAX_HEARTS = 5;

export function loadLocal() {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveLocal(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {}
}

// ── Heart regeneration ────────────────────────────────────────
export function regenHearts(state) {
  const now = Date.now();
  if (state.hearts >= MAX_HEARTS) {
    return { ...state, heartsUpdatedAt: now };
  }
  const elapsed = now - (state.heartsUpdatedAt || now);
  const gained = Math.floor(elapsed / HEART_REGEN_MS);
  if (gained <= 0) return state;
  const hearts = Math.min(MAX_HEARTS, state.hearts + gained);
  const leftover = elapsed - gained * HEART_REGEN_MS;
  return { ...state, hearts, heartsUpdatedAt: now - leftover };
}

export function msUntilNextHeart(state) {
  if (state.hearts >= MAX_HEARTS) return 0;
  const elapsed = Date.now() - (state.heartsUpdatedAt || Date.now());
  return Math.max(0, HEART_REGEN_MS - (elapsed % HEART_REGEN_MS));
}

// ── Daily / streak bookkeeping ────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function rolloverDaily(state) {
  const today = todayStr();
  let s = { ...state };
  if (s.todayDate !== today) {
    s.todayDate = today;
    s.todayXP = 0;
  }
  return s;
}

export function applyStreak(state) {
  const today = todayStr();
  const s = { ...state };
  if (s.lastActive === today) return s; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (s.lastActive === yesterday) s.streak = (s.streak || 0) + 1;
  else s.streak = 1;
  s.lastActive = today;
  return s;
}

// ── Supabase sync ─────────────────────────────────────────────
// Tables (see supabase_schema.sql): profiles, progress, notes, attempts
export async function fetchRemoteState(userId) {
  const sb = getSupabase();
  if (!sb || !userId) return null;
  const { data: prof } = await sb.from("profiles").select("*").eq("id", userId).single();
  const { data: prog } = await sb.from("progress").select("*").eq("user_id", userId);
  const completed = {};
  (prog || []).forEach((r) => {
    completed[`${r.unit}:${r.lesson}`] = {
      bestAccuracy: r.best_accuracy,
      lastDoneAt: r.updated_at,
      durationMs: r.duration_ms,
    };
  });
  return {
    xp: prof?.xp ?? 0,
    streak: prof?.streak ?? 0,
    lastActive: prof?.last_active ?? null,
    hearts: prof?.hearts ?? 5,
    heartsUpdatedAt: prof?.hearts_updated_at ? new Date(prof.hearts_updated_at).getTime() : Date.now(),
    dailyGoalXP: prof?.daily_goal_xp ?? 30,
    completed,
    missed: prof?.missed ?? {},
    todayXP: 0,
    todayDate: todayStr(),
  };
}

export async function pushProfile(userId, state) {
  const sb = getSupabase();
  if (!sb || !userId) return;
  await sb.from("profiles").upsert({
    id: userId,
    xp: state.xp,
    streak: state.streak,
    last_active: state.lastActive,
    hearts: state.hearts,
    hearts_updated_at: new Date(state.heartsUpdatedAt || Date.now()).toISOString(),
    daily_goal_xp: state.dailyGoalXP,
    missed: state.missed || {},
    updated_at: new Date().toISOString(),
  });
}

export async function pushProgress(userId, unit, lesson, accuracy, durationMs) {
  const sb = getSupabase();
  if (!sb || !userId) return;
  await sb.from("progress").upsert(
    {
      user_id: userId,
      unit,
      lesson,
      best_accuracy: accuracy,
      duration_ms: durationMs,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,unit,lesson" }
  );
}

export async function logAttempt(userId, payload) {
  const sb = getSupabase();
  if (!sb || !userId) return;
  await sb.from("attempts").insert({
    user_id: userId,
    unit: payload.unit,
    lesson: payload.lesson,
    q_type: payload.type,
    correct: payload.correct,
    duration_ms: payload.durationMs,
    created_at: new Date().toISOString(),
  });
}

// ── Notes ─────────────────────────────────────────────────────
const NOTES_LS = "pmquest_notes_v1";

export function loadLocalNotes() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(NOTES_LS) || "{}");
  } catch {
    return {};
  }
}
export function saveLocalNotes(notes) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NOTES_LS, JSON.stringify(notes));
  } catch {}
}

export async function fetchRemoteNotes(userId) {
  const sb = getSupabase();
  if (!sb || !userId) return null;
  const { data } = await sb.from("notes").select("*").eq("user_id", userId).order("updated_at", { ascending: false });
  return data || [];
}

export async function upsertRemoteNote(userId, note) {
  const sb = getSupabase();
  if (!sb || !userId) return null;
  const row = {
    user_id: userId,
    unit: note.unit || null,
    lesson: note.lesson || null,
    title: note.title || "Untitled note",
    body: note.body || "",
    updated_at: new Date().toISOString(),
  };
  if (note.id) row.id = note.id;
  const { data } = await sb.from("notes").upsert(row).select().single();
  return data;
}

export async function deleteRemoteNote(userId, id) {
  const sb = getSupabase();
  if (!sb || !userId) return;
  await sb.from("notes").delete().eq("user_id", userId).eq("id", id);
}

// ── Generated-question cache (smart questions per unit) ───────
const GENQ_LS = "pmquest_genq_v1";

export function loadGenCache() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(GENQ_LS) || "{}"); } catch { return {}; }
}
export function saveGenCache(obj) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(GENQ_LS, JSON.stringify(obj)); } catch {}
}
// append a fresh batch for a unit, keep last ~40 per unit
export function appendGenQuestions(unitId, questions) {
  const cache = loadGenCache();
  const prev = cache[unitId] || [];
  const merged = [...questions, ...prev].slice(0, 40);
  cache[unitId] = merged;
  saveGenCache(cache);
  return merged;
}
export function getGenQuestions(unitId) {
  return loadGenCache()[unitId] || [];
}
