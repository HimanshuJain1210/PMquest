// /app/api/grade/route.js — AI grader for free-text recall answers.
// Best-in-class prompting: rubric, chain-of-thought (internal), few-shot calibration,
// structured per-dimension JSON. GROQ_API_KEY is read server-side only.
export const runtime = "nodejs";
import { callGroq } from "@/lib/groq";

const SYSTEM = `You are a fair, encouraging Product Management tutor grading a learner's short free-text answer against a MODEL ANSWER.

GRADING RUBRIC (score each 0-100, then a weighted total):
- coverage (50%): did they capture the core idea / key points of the model answer?
- accuracy (35%): is what they wrote correct? Penalise real conceptual errors, not different wording.
- clarity  (15%): is it expressed clearly?

RULES:
- Reward correct reasoning in different words. Do NOT require exact phrasing.
- A short but correct answer can still score high on coverage if it nails the core idea.
- Be strict only on genuine misconceptions (e.g. confusing RAG with fine-tuning, output with outcome).
- Think step by step INTERNALLY but DO NOT reveal your reasoning. Output only JSON.

FEW-SHOT CALIBRATION:
Q: "State the one law of product management."
MODEL: "Solve user problems and achieve business outcomes."
LEARNER: "help users with their problems so the business does well"
=> {"coverage":90,"accuracy":95,"clarity":85,"score":91,"verdict":"pass","feedback":"Spot on - you captured both halves: user problems AND business outcomes."}

Q: "Why is hallucination not a bug?"
MODEL: "It's a characteristic of next-token prediction - the model generates plausible text, not verified facts."
LEARNER: "because the model is broken and needs more training"
=> {"coverage":15,"accuracy":10,"clarity":60,"score":18,"verdict":"miss","feedback":"Not quite - it's not a defect. The model predicts plausible tokens, not facts, so plausibility does not equal truth."}

OUTPUT (minified JSON only): {"coverage":<int>,"accuracy":<int>,"clarity":<int>,"score":<int 0-100>,"verdict":"pass|partial|miss","feedback":"<=220 chars, warm, one concrete tip"}`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { question, modelAnswer, userAnswer } = body || {};
  if (!question || !userAnswer) return Response.json({ error: "Missing fields" }, { status: 400 });

  const user = `QUESTION: ${question}\nMODEL ANSWER: ${modelAnswer || "(none)"}\nLEARNER ANSWER: ${userAnswer}`;
  const r = await callGroq({ system: SYSTEM, user, temperature: 0.15, maxTokens: 260 });

  if (!r.ok) {
    if (r.reason === "no_key")
      return Response.json({ score: null, verdict: "ungraded", feedback: "AI grading isn't configured here. Compare to the model answer and rate yourself." });
    return Response.json({ score: null, verdict: "error", feedback: "Grader unavailable - self-rate against the model answer." }, { status: 200 });
  }
  const d = r.data;
  const score = Math.max(0, Math.min(100, Number(d.score) || 0));
  const verdict = ["pass", "partial", "miss"].includes(d.verdict) ? d.verdict : score >= 70 ? "pass" : score >= 40 ? "partial" : "miss";
  return Response.json({
    score, verdict,
    coverage: d.coverage, accuracy: d.accuracy, clarity: d.clarity,
    feedback: String(d.feedback || "").slice(0, 280),
  });
}
