// data/topicBriefs.js
// Rich, domain-aware briefs that SEED AI question generation.
// These go far beyond the uploaded notes — they encode real PM / AI-PM knowledge
// so generated questions are deep and current, not limited to the source material.
// AI PM topics are deliberately the richest.

export const TOPIC_BRIEFS = {
  fundamentals: {
    title: "PM Fundamentals",
    focus: "What a PM does, value vs output/outcome, the discovery→delivery→distribution lifecycle, roadmaps/PRDs/backlogs/sprints, default-to-no, opportunity cost, the feature factory trap.",
    depth: "Test judgment in real situations: prioritisation under pressure, distinguishing activity from impact, reading what users do vs say. Avoid trivia; pose decisions.",
  },
  discovery: {
    title: "Discovery & Research",
    focus: "Product sense, problem-space vs solution-space, JTBD (functional/emotional/social), the Mom's Test, user interviews, latent needs, personas & journey maps, behaviour vs demographic segmentation.",
    depth: "Scenarios where the obvious move is wrong: leading questions, solutions disguised as problems, say-vs-do gaps, choosing the right user to talk to.",
  },
  strategy: {
    title: "Strategy & Prioritisation",
    focus: "Vision vs mission, product strategy, OKRs (objective vs KR, cascading, ~70% target), Kano model (must-have/performance/delighter, Kano drift), ICE & RICE, Impact×Effort matrix, Valley of Death, innovator's bias, MVP as riskiest-assumption test.",
    depth: "Force trade-off calls. Make the learner choose between tempting options and justify; surface bias and the cost of low-impact work.",
  },
  prd: {
    title: "PRD & Execution",
    focus: "PRD as proof of thinking, lean/live docs, problem statements (data+behaviour+pain, no feature names), success metrics (baseline+target+timeframe), non-goals, the 7 deadly PRD sins, Agile/Scrum, epics/stories, the PM–EM ownership line.",
    depth: "Doc-review-style judgment: spot the solution-as-problem, the vague metric, the missing non-goal, the over-spec. Real execution dilemmas.",
  },
  "ai-foundations": {
    title: "AI PM: Foundations",
    focus: "How LLMs work for PMs: next-token prediction, tokens↔cost/latency/context-window, tokenizer quirks (sub-word, non-English cost), embeddings & vector space, attention/Transformers, context vs training memory, hallucination as a characteristic not a bug, pre-training vs post-training (RLHF changes behaviour not facts), temperature.",
    depth: "AI PM is the priority. Pose product decisions a real AI PM faces: budgeting tokens, why a feature hallucinates, when post-training won't help, reading the cost/latency/quality trade-off. Ground every 'why' in mechanism.",
  },
  "ai-building": {
    title: "AI PM: RAG & Fine-Tuning",
    focus: "RAG pipeline (chunk→embed→store; embed query→retrieve top-K→augment→generate), when RAG vs fine-tuning vs prompt vs RAG+FT (knowledge×behaviour 2×2), dense vs sparse vs hybrid retrieval, chunking strategy, top-K noise, the 6 RAG failure points (data quality first), knowledge distillation, SLMs, evals.",
    depth: "Priority AI-PM track. Debugging scenarios: bot quotes stale policy, misses exact IDs, answers half a doc, contradicts itself. Architecture calls with cost/latency reasoning. The fix is rarely 'bigger model'.",
  },
  agents: {
    title: "AI PM: Agents",
    focus: "Agent = intelligence(LLM)+tools+orchestration; agency vs workflow; OWO framework; the Learning Gap (~95% AI initiatives fail); multi-agent design & isolated context windows; autonomy levels (suggest→co-pilot→act); guardrails vs control; human-in-the-loop by stakes×reversibility; least-privilege tools.",
    depth: "Priority AI-PM track. Design-and-safety scenarios: refund agents, autonomy roll-out, where humans must stay in loop, why a workflow shouldn't be an agent, tool-scope decisions.",
  },
  "ai-pm-craft": {
    title: "AI PM: Craft",
    focus: "Prompting (RCTFCE, give-an-out, context engineering, lost-in-the-middle, red-teaming output, temperature as product choice), evals (golden dataset ≠ training data, the six tuning knobs cheapest-first, data drift, LLM-as-judge, hybrid eval), the intelligence/latency/cost triangle, AI-first UX (feedback loops, blank-slate, rollback, explainability), data flywheel moat, inherent virality.",
    depth: "Priority AI-PM track. Real craft decisions: why offline evals pass but users churn, knob order before fine-tuning, designing eval systems at scale, what actually makes an AI moat.",
  },
  "build-career": {
    title: "Build & Career",
    focus: "Vibe coding (prompt quality > tool choice, discovery-first, V2 is the portfolio), ABI iterating, decision paralysis, resume WHAT/HOW/IMPACT with numbers, proof-of-work depth over breadth, changing one career variable at a time with an anchor.",
    depth: "Career-switcher scenarios and build judgment. Make the learner choose between shallow-broad and deep-narrow, and apply the bullet formula.",
  },
};
