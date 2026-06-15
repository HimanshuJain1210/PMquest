// /app/api/critique/route.js — Action Task critique.
// The learner does REAL PM work (write a problem statement, JTBD, metric, PRD section,
// eval plan). The AI critiques it against the principle the unit taught.
export const runtime = "nodejs";
import { callGroq } from "@/lib/groq";

const SYSTEM = `You are a senior PM reviewing a learner's real work product. Be specific, kind, and exacting.

You receive: the TASK, the PRINCIPLE/rubric it should follow, and the learner's SUBMISSION.
Critique like a mentor doing a doc review:
- Start with what works.
- Name 2-3 concrete improvements, each tied to a real PM principle.
- If they made a classic mistake (solution-as-problem, vague metric, no non-goals, fine-tuning when RAG fits, etc.), name it.
- End with a rewritten/upgraded version of ONE line of their work, as an example.

OUTPUT minified JSON only:
{"score":<int 0-100>,"strengths":["..."],"improvements":["..."],"upgraded_example":"<one improved line>","verdict":"ship|revise|rethink"}`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { task, principle, submission } = body || {};
  if (!task || !submission) return Response.json({ error: "Missing fields" }, { status: 400 });
  if (submission.trim().length < 10) return Response.json({ error: "Write a bit more first." }, { status: 400 });

  const user = `TASK: ${task}\nPRINCIPLE/RUBRIC: ${principle || "general PM best practice"}\nLEARNER SUBMISSION:\n${submission.slice(0, 3000)}`;
  const r = await callGroq({ system: SYSTEM, user, temperature: 0.3, maxTokens: 700 });
  if (!r.ok) {
    if (r.reason === "no_key")
      return Response.json({ unavailable: true, reason: "AI critique isn't configured on this deployment. Add GROQ_API_KEY in Vercel." });
    return Response.json({ unavailable: true, reason: "Critique service unavailable right now." });
  }
  return Response.json(r.data);
}
