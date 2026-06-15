// lib/groq.js  — server-only shared Groq caller + prompt assets.
// Never import this into client components.

export async function callGroq({ system, user, temperature = 0.3, maxTokens = 1024, json = true }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return { ok: false, reason: "no_key" };
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature,
        max_tokens: maxTokens,
        ...(json ? { response_format: { type: "json_object" } } : {}),
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!resp.ok) {
      const detail = (await resp.text()).slice(0, 300);
      return { ok: false, reason: "api_error", detail };
    }
    const data = await resp.json();
    let raw = data?.choices?.[0]?.message?.content?.trim() || "";
    raw = raw.replace(/```json|```/g, "").trim();
    if (!json) return { ok: true, text: raw };
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch { const m = raw.match(/\{[\s\S]*\}/); parsed = m ? JSON.parse(m[0]) : null; }
    if (!parsed) return { ok: false, reason: "parse_error", raw };
    return { ok: true, data: parsed };
  } catch (e) {
    return { ok: false, reason: "network", detail: String(e).slice(0, 200) };
  }
}

// ── Few-shot exemplars: distilled from the hand-authored question bank so
// generated questions inherit the same voice, the trap pattern (wrong option =
// the real misconception), and the "why" teaching style.
export const EXEMPLARS = `
EXAMPLE — type "trap" (the WRONG option is the common misconception):
{"type":"trap","q":"Is writing a PRD anti-agile?","options":["Yes — it forces waterfall","No — a lean, live, editable PRD evolves as you learn"],"answer":1,"why":"The misconception confuses what goes in a PRD with how it's maintained. It's a Google Doc, not a PDF."}

EXAMPLE — type "mcq":
{"type":"mcq","q":"Tokens are directly proportional to which three things?","options":["Accuracy, trust, safety","Cost, latency, memory (context window)","Speed, design, virality","Users, revenue, churn"],"answer":1,"why":"Every product decision has a token implication — longer responses cost more, take longer, and eat the context window."}

EXAMPLE — type "fill":
{"type":"fill","q":"At its core, an LLM is just a next-______ predictor.","answer":"token","accept":["token"],"why":"Everything else emerges from predicting the next token at massive scale."}

EXAMPLE — type "recall" (free-text, model answer given):
{"type":"recall","q":"In one sentence, state the one law of product management.","answer":"Solve user problems and achieve business outcomes — everything else is derived from this.","why":"This is the anchor of the entire program."}
`;
