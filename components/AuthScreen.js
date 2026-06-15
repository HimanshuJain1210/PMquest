"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import { getSupabase, supabaseConfigured } from "@/lib/supabaseClient";

export default function AuthScreen({ reason, onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const configured = supabaseConfigured();

  async function magicLink() {
    setErr(null); setBusy(true);
    const sb = getSupabase();
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/learn` },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  async function google() {
    setErr(null);
    const sb = getSupabase();
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/learn` },
    });
    if (error) setErr(error.message);
  }

  return (
    <div className="center-screen">
      <div className="card auth-card">
        <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", margin: "0 auto 14px", transform: "rotate(-6deg)" }}>
          <Icon name="lock" style={{ width: 26, height: 26 }} />
        </div>
        <h2>{reason || "Sign in to keep going"}</h2>
        <p>The first three chapters are free. Sign in to unlock the rest, save your progress, notes, and streak across devices.</p>

        {!configured ? (
          <div style={{ background: "#fff1ec", border: "1px solid var(--line)", borderRadius: 12, padding: 14, fontSize: 13.5, color: "var(--ink)", textAlign: "left" }}>
            <b>Demo mode.</b> Auth isn't configured on this deployment yet. Add your Supabase keys in Vercel to enable sign-in. For now, your progress saves locally on this device.
            <button className="btn ghost sm" style={{ marginTop: 12, width: "100%" }} onClick={onClose}>Continue in demo mode</button>
          </div>
        ) : sent ? (
          <div style={{ background: "#e9faf6", border: "1px solid var(--teal)", borderRadius: 12, padding: 16, fontSize: 14 }}>
            ✅ Magic link sent to <b>{email}</b>. Check your inbox and tap the link to sign in.
          </div>
        ) : (
          <>
            <button className="btn ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }} onClick={google}>
              <Icon name="google" style={{ width: 18, height: 18 }} /> Continue with Google
            </button>
            <div className="divider">or</div>
            <input className="input" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn" style={{ width: "100%" }} disabled={busy || !email.includes("@")} onClick={magicLink}>
              {busy ? "Sending…" : "Email me a magic link"}
            </button>
            {onClose && <button className="btn ghost sm" style={{ marginTop: 12, width: "100%" }} onClick={onClose}>Back</button>}
          </>
        )}
        {err && <p style={{ color: "var(--rose)", fontSize: 13, marginTop: 12 }}>{err}</p>}
      </div>
    </div>
  );
}
