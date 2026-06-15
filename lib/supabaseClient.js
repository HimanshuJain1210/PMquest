"use client";
import { createBrowserClient } from "@supabase/ssr";

let client = null;

export function getSupabase() {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null; // demo mode — no auth/persistence backend
  if (!client) client = createBrowserClient(url, anon);
  return client;
}

export function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
