// /app/api/review/route.js — adaptive review planner.
// Given the learner's miss tallies per lesson + the lesson catalog, returns an ordered
// review plan (spaced-repetition flavoured) with a one-line rationale per item.
export const runtime = "nodejs";
import { callGroq } from "@/lib/groq";

const SYSTEM = `You are a spaced-repetition planner for a PM study app.
Input: the learner's per-lesson miss counts and last-seen recency, plus the lesson catalog.
Pick the best 5-8 lessons to review next. Prioritise: most-missed first, then least-recently-seen,
then foundational topics that unlock later ones. Avoid recommending lessons they've never started.

OUTPUT minified JSON only:
{"plan":[{"unit":"<unit id>","lesson":"<lesson id>","reason":"<<=90 chars, cite the miss count or recency>"}],
"note":"<one sentence on the strategy>"}`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { missData, catalog } = body || {};
  if (!missData || !catalog) return Response.json({ error: "Missing data" }, { status: 400 });

  const r = await callGroq({
    system: SYSTEM,
    user: `MISS DATA:\n${JSON.stringify(missData).slice(0, 3000)}\n\nCATALOG:\n${JSON.stringify(catalog).slice(0, 3000)}`,
    temperature: 0.2, maxTokens: 700,
  });
  if (!r.ok) {
    if (r.reason === "no_key") return Response.json({ unavailable: true, reason: "Adaptive review needs GROQ_API_KEY." });
    return Response.json({ unavailable: true, reason: "Review planner unavailable." });
  }
  return Response.json(r.data);
}
