"use client";
import posthog from "posthog-js";

let started = false;

export function initAnalytics() {
  if (typeof window === "undefined" || started) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    // Demo mode: analytics disabled, app still fully works.
    started = true;
    return;
  }
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: true,
    autocapture: true,
    persistence: "localStorage+cookie",
  });
  started = true;
}

export function track(event, props = {}) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return; // no-op in demo mode
  try {
    posthog.capture(event, props);
  } catch {}
}

export function identify(userId, props = {}) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.identify(userId, props);
  } catch {}
}

export function resetAnalytics() {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.reset();
  } catch {}
}
