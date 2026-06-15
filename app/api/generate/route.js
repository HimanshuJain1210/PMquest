// /app/api/generate/route.js — SMART two-pass question generator.
// Pass 1: generate deep questions from real PM / AI-PM domain knowledge (a topic brief
//         seeds it; uploaded notes are optional flavour, NOT the ceiling).
// Pass 2: a verifier checks each question — is the keyed answer actually correct? are
//         distractors plausible-but-wrong? is it non-trivial? — and rejects the bad ones.
// GROQ_API_KEY stays server-side.
export const runtime = "nodejs";
import { callGroq, EXEMPLARS } from "@/lib/groq";

const GEN_SYSTEM = `You are a senior Product Management instructor who specialises in AI PM. You write SHARP, scenario-based quiz questions that test judgment, not trivia.

STYLE (match exactly):
- Scenario-first: drop the learner into a realistic situation, then ask the decision.
- Every wrong option must be a REAL mistake a practising PM makes — tempting, not obviously dumb.
- The correct answer must be genuinely correct and defensible to an expert.
- Keep stems tight (1-2 lines). Put the teaching in "why", and have "why" explain why the wrong options are wrong too.
- Prefer depth over breadth. No "all of the above". No trick wording.

TYPES: mcq, trap (wrong option = the common misconception), fill, recall.
- mcq/trap: "answer" = 0-based index of the correct option (3-4 options).
- fill: short answer + "accept" array of acceptable variants.
- recall: a model "answer" (1-3 sentences) the learner writes toward.

You may use the SOURCE NOTES as flavour and to match the learner's curriculum, but you SHOULD draw on broader, current, correct PM/AI-PM knowledge to make questions deeper than the notes. Never contradict established PM fact.

OUTPUT ONLY JSON: {"questions":[ ... ]}

${EXEMPLARS}`;

const VERIFY_SYSTEM = `You are a strict reviewer of PM quiz questions. For each question decide if it is SHIP-QUALITY.

REJECT if any are true:
- The marked correct answer is wrong, debatable, or not clearly best.
- A "wrong" option is actually also correct, OR is so obviously dumb it's not tempting.
- The question is trivia / definition-recall with no judgment.
- The stem is ambiguous, incomplete, or the "why" doesn't justify the answer.
- For fill: the answer isn't clearly the single best word/phrase.

Return ONLY JSON: {"results":[{"keep":true|false,"reason":"<short>"} ...]} with one entry per question, in order.`;

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { source, topic, brief, count = 5 } = body || {};
  const n = Math.max(3, Math.min(8, Number(count) || 5));

  // brief (domain knowledge) is the primary seed; source notes are optional
  const seed = brief
    ? `TOPIC: ${brief.title}\nFOCUS AREAS: ${brief.focus}\nHOW TO TEST: ${brief.depth}`
    : topic ? `TOPIC: ${topic}` : null;

  if (!seed && (!source || source.trim().length < 40))
    return Response.json({ error: "Provide a topic brief or some source text." }, { status: 400 });

  const genUser = `${seed || ""}${source ? `\n\nSOURCE NOTES (flavour, not a limit):\n"""${source.slice(0, 4000)}"""` : ""}\n\nWrite ${n + 2} excellent questions (I will filter). Make them deep and scenario-based. Output JSON {"questions":[...]}.`;

  // ── PASS 1: generate ──
  const gen = await callGroq({ system: GEN_SYSTEM, user: genUser, temperature: 0.6, maxTokens: 2000 });
  if (!gen.ok) {
    if (gen.reason === "no_key")
      return Response.json({ error: "AI generation isn't configured. Add GROQ_API_KEY in Vercel." }, { status: 200 });
    return Response.json({ error: "Generator unavailable.", detail: gen.detail }, { status: 200 });
  }

  // structural sanitise
  const candidates = [];
  for (const q of (Array.isArray(gen.data?.questions) ? gen.data.questions : [])) {
    if (!q || !q.type || !q.q || !q.why) continue;
    if (q.type === "mcq" || q.type === "trap") {
      if (!Array.isArray(q.options) || q.options.length < 2) continue;
      const ai = Number(q.answer);
      if (!(ai >= 0 && ai < q.options.length)) continue;
      candidates.push({ type: q.type, q: String(q.q), options: q.options.map(String).slice(0, 4), answer: ai, why: String(q.why) });
    } else if (q.type === "fill") {
      if (!q.answer) continue;
      candidates.push({ type: "fill", q: String(q.q), answer: String(q.answer), accept: Array.isArray(q.accept) ? q.accept.map(String) : [String(q.answer)], why: String(q.why) });
    } else if (q.type === "recall") {
      if (!q.answer) continue;
      candidates.push({ type: "recall", q: String(q.q), answer: String(q.answer), why: String(q.why) });
    }
  }
  if (candidates.length === 0)
    return Response.json({ error: "Generation produced nothing usable. Try again." }, { status: 200 });

  // ── PASS 2: verify (reject bad questions) ──
  const verifyUser = "Review these questions:\n" + candidates.map((q, i) => {
    const opts = q.options ? ` OPTIONS: ${q.options.map((o, j) => `${j}) ${o}`).join(" | ")} ANSWER_INDEX: ${q.answer}` : ` ANSWER: ${q.answer}`;
    return `[${i}] (${q.type}) ${q.q}${opts} WHY: ${q.why}`;
  }).join("\n");

  let kept = candidates;
  const ver = await callGroq({ system: VERIFY_SYSTEM, user: verifyUser, temperature: 0.1, maxTokens: 800 });
  if (ver.ok && Array.isArray(ver.data?.results)) {
    kept = candidates.filter((_, i) => ver.data.results[i]?.keep !== false);
  }
  // if verification nuked everything (over-zealous), fall back to candidates
  if (kept.length === 0) kept = candidates;

  return Response.json({ questions: kept.slice(0, n), generated: candidates.length, kept: kept.length });
}
