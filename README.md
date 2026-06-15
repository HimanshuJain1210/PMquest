# PM Quest 🎯

Learn product management the Duolingo way. A skill-tree of bite-sized lessons built from the HelloPM curriculum — streaks, XP, hearts, active recall, and AI-graded free-text answers. Analytics via PostHog. Auth + sync via Supabase. AI grading via Groq (key stays server-side).

---

## Runs in 3 modes

1. **Demo mode (zero config)** — clone, `npm i`, `npm run dev`. First 3 chapters playable, progress saved in the browser, AI grading falls back to self-rate. Nothing breaks if keys are missing.
2. **+ Supabase** — adds Google + magic-link login, gates chapters 4+, syncs progress/notes/streak across devices.
3. **+ Groq + PostHog** — adds AI grading of recall answers, and full product analytics.

---

## AI capabilities (all server-side, key never exposed)

PM Quest uses Groq across four routes, each with strong prompting (few-shot calibration, rubric/chain-of-thought, structured JSON, grounding guardrails). All degrade gracefully to demo mode if `GROQ_API_KEY` is absent.

| Route | What it does | Technique |
|---|---|---|
| `/api/grade` | Grades free-text recall answers | Rubric (coverage/accuracy/clarity) + few-shot + internal CoT + per-dimension JSON |
| `/api/generate` | **Smart Questions** — two-pass: generates deep, scenario-based questions from real PM/AI-PM knowledge (your notes are flavour, not a ceiling), then a **verifier pass rejects any question with a wrong answer key, weak distractors, or trivia**. Cached per unit for instant free replay. | Domain-brief seeding + generate→verify + structural sanitise |
| `/api/insights` | **AI study coach** (Me tab) — reads accuracy/time/miss-patterns, says what to fix | LLM-as-analyst over aggregated stats; structured insights |
| `/api/review` | **Adaptive review** (Forge tab) — orders revision by miss-count + recency | Spaced-repetition planner |
| `/api/case` | **Case Mode** — a multi-step scenario per unit; AI mentor reacts to each decision you make | Per-step reasoning eval, tied to PM principles |
| `/api/critique` | **Action Task** — you write real PM work (problem statement, JTBD, OKR); AI critiques it like a doc review | Strengths + improvements + an upgraded example line |

### Learning modes (how it actually teaches, not just quizzes)
- **Lessons** — scenario MCQs/recall with instant feedback. On a wrong answer you must engage with *why* before continuing.
- **Case Mode** (🧠 node at the end of each unit) — a realistic situation unfolds over 3 decisions; you type what you'd do, the AI mentor grades your reasoning and shows what a strong PM does.
- **Action Task** (✍️ node) — you produce real work for a product you choose; the AI reviews it against the principle the unit taught and rewrites one line as an example.
- **Forge** — generate quizzes from your own notes, or let AI plan adaptive review.

This shifts the app from *recognition* (tap the right option) toward *generation* (make the call, do the work) — the skills that actually matter for an AI PM.

The browser only calls these own-routes, never Groq directly — the secret key stays on the server.

## Deploy to Vercel (full setup)

### 1. Push to GitHub, import to Vercel
Import the repo in Vercel. Framework auto-detects as **Next.js**. No build settings to change.

### 2. Supabase (auth + data)
1. Create a project at supabase.com.
2. **SQL Editor → paste `supabase_schema.sql` → Run.** Creates tables + row-level security + the auto-profile trigger.
3. **Authentication → Providers → Google → enable** (add a Google OAuth client). Magic-link is on by default.
4. **Authentication → URL Configuration → Redirect URLs** → add:
   - `https://YOUR-APP.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local dev)
5. Copy **Project URL** and **anon public key** from Settings → API.

### 3. Groq (AI grading — the secret key)
1. Get an API key at console.groq.com.
2. It goes in `GROQ_API_KEY` **without** the `NEXT_PUBLIC_` prefix, so it is **never** sent to the browser. The browser only ever calls your own `/api/grade` route.

### 4. PostHog (analytics — safe public key)
1. Create a project at posthog.com. Copy the **Project API Key** (`phc_...`) — this is a write-only ingest key, safe in the browser.

### 5. Set env vars in Vercel
Project → Settings → Environment Variables:

| Key | Value | Exposed to browser? |
|---|---|---|
| `GROQ_API_KEY` | your Groq key | **No — secret** |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` (optional) | No |
| `NEXT_PUBLIC_SUPABASE_URL` | your project URL | yes (safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key | yes (RLS-gated) |
| `NEXT_PUBLIC_POSTHOG_KEY` | `phc_...` | yes (ingest key) |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` | yes |

Redeploy. Done.

---

## Where things live

```
app/
  learn/page.js        ← the whole app (tabs, lesson lifecycle, XP/streak/hearts)
  api/grade/route.js   ← Groq call. GROQ_API_KEY read here, server-only.
  auth/callback/route.js ← exchanges magic-link/OAuth code for a session
components/            ← Lesson engine, SkillTree, Notes, Profile, AuthScreen, Icon
lib/
  analytics.js         ← PostHog wrapper (no-op if key absent)
  supabaseClient.js    ← browser client (null in demo mode)
  store.js             ← progress, XP, hearts, streak, notes, timing + local↔remote sync
data/questions.js      ← the full curriculum (edit to add lessons)
supabase_schema.sql    ← run once in Supabase
```

## Editing content
All lessons live in `data/questions.js`. Each lesson is ~5 questions. Types: `mcq`, `trap` (wrong option = the common misconception), `fill`, `match`, `order`, `recall` (AI-graded). Add a lesson by dropping another object into a unit's `lessons` array — the skill tree and unlocking update automatically.

## Free vs gated
`FREE_UNITS = 3` in `components/SkillTree.js`. Chapters beyond that prompt sign-in.

## PostHog events
`lesson_started`, `question_answered` (with `correct` + `duration_ms`), `lesson_completed`, `lesson_failed`, `streak_extended`, `paywall_hit`, `note_saved`. Build funnels: chapter→lesson→question drop-off, and paywall_hit→sign-in.
