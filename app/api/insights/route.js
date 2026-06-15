// /app/api/insights/route.js — LLM-as-analyst over the learner's own stats.
// Receives pre-aggregated metrics (computed client-side from local/Supabase data),
// returns structured, actionable insights. No raw PII leaves the client beyond aggregates.
export const runtime = "nodejs";
import { callGroq } from "@/lib/groq";

const SYSTEM = `You are a learning-analytics coach for a Product Management study app.
You receive a JSON summary of one learner's activity. Analyse it like a data analyst and a tutor.

Look for: weak topics (low accuracy), slow topics (high avg time), drop-off (started but not completed),
streak/consistency, and which concept to review next. Be specific and reference the numbers.

OUTPUT minified JSON only:
{"headline":"<one punchy sentence>","insights":[{"label":"<short>","detail":"<<=160 chars, cite a number>","severity":"good|watch|act"}],
"focus":{"unit":"<unit id or name>","why":"<<=140 chars>"},
"encouragement":"<one warm sentence>"}
Give 3-5 insights. Never invent data not in the summary.`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { summary } = body || {};
  if (!summary) return Response.json({ error: "No summary" }, { status: 400 });

  const r = await callGroq({
    system: SYSTEM,
    user: `LEARNER SUMMARY:\n${JSON.stringify(summary).slice(0, 5000)}`,
    temperature: 0.3, maxTokens: 700,
  });

  if (!r.ok) {
    if (r.reason === "no_key")
      return Response.json({ unavailable: true, reason: "AI insights aren't configured. Add GROQ_API_KEY in Vercel." });
    return Response.json({ unavailable: true, reason: "Insights unavailable right now." });
  }
  return Response.json(r.data);
}
