// /app/api/generate/route.js — generate fresh quiz questions from a note/topic.
// Few-shot seeded to match the app's voice + trap pattern. Grounded: every question
// must be answerable from the supplied source text (guardrail against hallucinated PM facts).
export const runtime = "nodejs";
import { callGroq, EXEMPLARS } from "@/lib/groq";

const SYSTEM = `You generate active-recall quiz questions for a Product Management learning app, in the EXACT JSON style of the examples.

HARD RULES:
- Ground EVERY question strictly in the SOURCE TEXT provided. Do NOT use outside facts. If the source doesn't support a question, don't write it.
- Match the house style: crisp stems, a teaching "why" on every question.
- For "trap" questions, the WRONG option must be a realistic common misconception, and answer must point to the correct one.
- Mix types across: mcq, trap, fill, recall. Aim for ~ 2 mcq/trap, 1 fill, 1 recall unless count says otherwise.
- "answer" for mcq/trap is the 0-based index of the correct option.
- Keep options plausible and mutually exclusive. Never include "all of the above".
- Output ONLY JSON: {"questions":[ ...question objects... ]}

${EXEMPLARS}`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { source, topic, count = 5 } = body || {};
  if (!source || source.trim().length < 40)
    return Response.json({ error: "Provide at least a short paragraph of source text." }, { status: 400 });

  const n = Math.max(3, Math.min(8, Number(count) || 5));
  const user = `SOURCE TEXT${topic ? ` (topic: ${topic})` : ""}:\n"""\n${source.slice(0, 6000)}\n"""\n\nGenerate exactly ${n} questions grounded in this source. Output JSON {"questions":[...]}.`;

  const r = await callGroq({ system: SYSTEM, user, temperature: 0.5, maxTokens: 1600 });
  if (!r.ok) {
    if (r.reason === "no_key")
      return Response.json({ error: "AI generation isn't configured on this deployment. Add GROQ_API_KEY in Vercel." }, { status: 200 });
    return Response.json({ error: "Generator unavailable right now.", detail: r.detail }, { status: 200 });
  }

  // validate + sanitise
  const raw = Array.isArray(r.data?.questions) ? r.data.questions : [];
  const clean = [];
  for (const q of raw) {
    if (!q || !q.type || !q.q) continue;
    if (q.type === "mcq" || q.type === "trap") {
      if (!Array.isArray(q.options) || q.options.length < 2) continue;
      const ai = Number(q.answer);
      if (!(ai >= 0 && ai < q.options.length)) continue;
      clean.push({ type: q.type, q: String(q.q), options: q.options.map(String).slice(0, 5), answer: ai, why: String(q.why || "") });
    } else if (q.type === "fill") {
      if (!q.answer) continue;
      clean.push({ type: "fill", q: String(q.q), answer: String(q.answer), accept: Array.isArray(q.accept) ? q.accept.map(String) : [String(q.answer)], why: String(q.why || "") });
    } else if (q.type === "recall") {
      if (!q.answer) continue;
      clean.push({ type: "recall", q: String(q.q), answer: String(q.answer), why: String(q.why || "") });
    }
  }
  if (clean.length === 0) return Response.json({ error: "Could not generate valid questions from that text. Try a richer paragraph." }, { status: 200 });
  return Response.json({ questions: clean });
}
