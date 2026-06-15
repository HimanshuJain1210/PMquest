// /app/api/case/route.js — interactive Case Mode.
// A multi-step PM scenario. The learner makes a decision at each step; the AI
// evaluates it against the "ideal" PM move, gives feedback, and reveals the next beat.
// Server-only; GROQ_API_KEY never reaches the browser.
export const runtime = "nodejs";
import { callGroq } from "@/lib/groq";

const SYSTEM = `You are running an interactive Product Management case study to TEACH (not just test).
You are given: the case premise, the current step's situation, the "ideal move" the step is teaching,
and the learner's decision. Evaluate the learner like a sharp but encouraging PM mentor.

RULES:
- Judge the learner's REASONING, not keyword matching. Reward sound PM thinking even if phrased differently.
- Tie feedback to real PM principles (problem-before-solution, JTBD, metrics, trade-offs, RAG vs fine-tune, autonomy, etc.) where relevant.
- Be concrete and brief. Name the one thing they did well and the one thing to sharpen.
- Score 0-100 on the quality of the decision for THIS step.

OUTPUT minified JSON only:
{"score":<int>,"verdict":"strong|okay|weak","feedback":"<=240 chars, specific","ideal":"<=160 chars, what a strong PM does here & why"}`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { premise, situation, teaches, decision } = body || {};
  if (!situation || !decision) return Response.json({ error: "Missing fields" }, { status: 400 });

  const user = `CASE PREMISE: ${premise || "(n/a)"}
CURRENT SITUATION: ${situation}
WHAT THIS STEP TEACHES (ideal direction): ${teaches || "(use general PM judgment)"}
LEARNER'S DECISION: ${decision}`;

  const r = await callGroq({ system: SYSTEM, user, temperature: 0.3, maxTokens: 320 });
  if (!r.ok) {
    if (r.reason === "no_key")
      return Response.json({ score: null, verdict: "ungraded", feedback: "AI mentor isn't configured here — compare your decision to the 'ideal move' shown.", ideal: teaches || "" });
    return Response.json({ score: null, verdict: "error", feedback: "Mentor unavailable — compare to the ideal move.", ideal: teaches || "" }, { status: 200 });
  }
  const d = r.data;
  const score = d.score == null ? null : Math.max(0, Math.min(100, Number(d.score)));
  return Response.json({
    score,
    verdict: ["strong","okay","weak"].includes(d.verdict) ? d.verdict : (score >= 70 ? "strong" : score >= 40 ? "okay" : "weak"),
    feedback: String(d.feedback || "").slice(0, 280),
    ideal: String(d.ideal || teaches || "").slice(0, 200),
  });
}
