// data/cases.js — Case Mode scenarios + end-of-unit Action Tasks.
// CASES[unitId] = { title, premise, steps:[{situation, teaches, hint}] }
// ACTIONS[unitId] = { title, task, principle, placeholder }

export const CASES = {
  fundamentals: {
    title: "The feature-factory trap",
    premise: "You just joined as PM of a B2C habit-tracking app. The team ships fast but the CEO is worried: lots of releases, flat retention.",
    steps: [
      { situation: "Your first week. The eng lead proudly shows you 14 features shipped last quarter. Retention is flat at 18%. What do you do first?", teaches: "Distinguish output from outcome. Investigate WHY retention is flat before shipping anything new; look at what users actually do.", hint: "Output ≠ outcome." },
      { situation: "Data shows 60% of users who set a daily reminder retain; only 12% retain without one. But onboarding never mentions reminders. What's your move?", teaches: "Find the activation lever and reduce friction to it. This is a quick win — high impact, low effort: surface reminders in onboarding.", hint: "Impact vs effort." },
      { situation: "Sales asks for a leaderboard feature 'because competitors have it.' It's 4 weeks of work. How do you respond?", teaches: "Default to NO unless proven. Convert the request to a problem, check if it serves the retention goal, weigh against the activation work that's already proven.", hint: "Default answer is NO." },
    ],
  },
  discovery: {
    title: "Finding the real job",
    premise: "You're PM for a meal-kit delivery service. Growth has stalled. Leadership says 'add more recipes.' You suspect the real problem is elsewhere.",
    steps: [
      { situation: "Leadership wants 50 new recipes. You have budget for research first. What do you do?", teaches: "Don't accept a solution as a problem. Talk to churned users about their actual life and last experience before building anything.", hint: "Problem before solution." },
      { situation: "In interviews, users say 'I love the recipes' but 70% churned within 2 months. The sales data shows most cancel after a missed/late delivery. What's the real job?", teaches: "What users SAY ≠ what they DO. The job is reliable dinner on time, not recipe variety. Triangulate words with behaviour.", hint: "Say vs do." },
      { situation: "You write a JTBD statement to align the team. Draft it.", teaches: "Format: When I am [context], I want to [motivation], so that I can [outcome]. e.g. 'When I get home exhausted, I want dinner handled reliably, so I can relax without planning.'", hint: "When I am… I want… so that…", free: true },
    ],
  },
  strategy: {
    title: "Prioritising under pressure",
    premise: "You're PM of a fintech app. You have 6 feature ideas, one quarter, and a goal: increase activation (first investment made).",
    steps: [
      { situation: "Your own idea — a slick portfolio animation — feels exciting. You rate everything and it scores 'high impact.' What's the risk?", teaches: "Innovator's bias: you overrate your own idea. Bring the product trio + data; rate impact collaboratively, not alone.", hint: "Whose idea is it?" },
      { situation: "Two options: (A) one-tap KYC that cuts signup drop-off, high impact but 5 weeks; (B) confetti on first deposit, low effort. Which, and how do you de-risk A?", teaches: "A is the high-impact bet — de-risk it as an experiment (e.g. KYC for one user segment) before full build. B is a Valley-of-Death distraction.", hint: "Big bet → experiment." },
      { situation: "Write one good OKR for this quarter's activation goal.", teaches: "Objective = ambitious + qualitative; KR = measurable + time-bound. e.g. O: Make first investment effortless. KR: lift activation 22%→35% by Q3; cut signup→deposit time to <10 min.", hint: "Objective + measurable KRs.", free: true },
    ],
  },
  prd: {
    title: "From request to PRD",
    premise: "You're PM on a SaaS analytics tool. A big client threatens to churn without a 'custom export' feature. Eng estimates 3 weeks.",
    steps: [
      { situation: "Sales forwards the churn threat and the feature ask. Your first move?", teaches: "A feature request is a solution. Find the underlying problem, and check how many other clients share it before committing roadmap time.", hint: "Solution in disguise." },
      { situation: "You learn 8 other enterprise clients manually export to Excel daily, losing ~3 hrs/week. Write the problem statement (not the solution).", teaches: "Good problem statement = data + behaviour + pain, no feature name. e.g. 'Enterprise users lose ~3 hrs/week manually exporting data across tools.'", hint: "No feature names.", free: true },
      { situation: "Define a success metric for solving it.", teaches: "Metric + baseline + target + timeframe. e.g. 'Cut median export time from 3 hrs/week to under 15 min within 60 days of launch.'", hint: "metric + baseline + target + timeframe.", free: true },
    ],
  },
  "ai-foundations": {
    title: "Debugging an AI feature",
    premise: "You're AI PM for a customer-support assistant. It sometimes invents refund amounts and policies that don't exist.",
    steps: [
      { situation: "An engineer says 'the model is buggy, let's fine-tune it to stop hallucinating.' Your response?", teaches: "Hallucination is a characteristic of next-token prediction, not a bug. Fine-tuning changes behaviour, not factual grounding. You likely need RAG.", hint: "Behaviour vs knowledge." },
      { situation: "The correct refund policies live in a knowledge base that changes weekly. What architecture do you choose and why?", teaches: "RAG — retrieve current policy chunks at query time so answers are grounded and always up to date, without retraining.", hint: "Dynamic knowledge →?" },
      { situation: "After RAG, it still cites last month's policy. Where's the failure and what's the fix?", teaches: "Failure Point #1: data quality — the source is stale. Fix is operational (update KB + freshness SLA), not a bigger model.", hint: "It's rarely the model." },
    ],
  },
  agents: {
    title: "Designing an agent safely",
    premise: "You're building an AI agent that handles customer refund requests end to end for an e-commerce store.",
    steps: [
      { situation: "Leadership wants full autonomy — the agent decides and issues refunds instantly. What's your concern?", teaches: "High stakes + low reversibility (money out) demands human-in-the-loop. Use guardrails: agent drafts, human approves above a threshold.", hint: "Stakes × reversibility." },
      { situation: "You design the agent. What are its three components and what tool access does it need?", teaches: "Intelligence (LLM decisions), Tools (order DB, refund API, email), Orchestration (the loop). Limit tool scope to least privilege.", hint: "Brain, tools, orchestration.", free: true },
      { situation: "How do you roll it out without betting the business on day one?", teaches: "Start low-autonomy (suggest → co-pilot → act). Auto-handle small/low-risk refunds; human-review large ones. Expand as confidence/data grows.", hint: "Crawl, walk, run." },
    ],
  },
  "ai-building": {
    title: "RAG vs fine-tune call",
    premise: "You lead an AI PM doc-assistant for a law firm. It must answer from 50,000 constantly-updated legal documents in a precise, formal house style.",
    steps: [
      { situation: "There are two needs: (1) answer from the changing 50k docs, (2) always use the firm's formal tone. Map each to RAG or fine-tuning.", teaches: "Dynamic knowledge → RAG. Custom behaviour/tone → fine-tuning. This is the 'RAG + fine-tune' quadrant.", hint: "Knows vs behaves." },
      { situation: "A lawyer searches by exact case number 'Re: 2024-CV-8891' and dense search misses it. Fix?", teaches: "Dense (semantic) search fails on exact IDs. Add sparse/keyword search → hybrid retrieval.", hint: "Dense + sparse." },
      { situation: "Budget is tight and latency matters for a narrow classification step. What model choice?", teaches: "Use a small/fine-tuned model (SLM) or distillation for the narrow task — don't pay frontier-model cost for a specialist job.", hint: "Specialist > Superman." },
    ],
  },
  "ai-pm-craft": {
    title: "Shipping quality AI",
    premise: "Your AI writing-assistant scores 95% on offline evals but users are increasingly unhappy. You must find and fix the gap.",
    steps: [
      { situation: "Offline evals say 95%, thumbs-down is rising. What's your hypothesis?", teaches: "Data drift — real queries diverged from your golden dataset's coverage. Offline evals only test what they contain.", hint: "What does the eval actually cover?" },
      { situation: "You can't have humans grade 20k daily outputs. Design a scalable eval system.", teaches: "Hybrid: code checks on 100% (format, safety), LLM-as-judge for quality flags, humans review the flagged sample. Feed new clusters back into the golden set.", hint: "Code + LLM-judge + human sample.", free: true },
      { situation: "Output quality is mediocre. List the order of knobs you'd try before fine-tuning.", teaches: "System prompt → context/RAG → tools → model → orchestration → fine-tuning (last). ~80% of issues fix at knobs 1-2.", hint: "Cheapest knob first.", free: true },
    ],
  },
  "build-career": {
    title: "Proof of work",
    premise: "You're a career-switcher (teacher → AI PM). You have one month to build a portfolio that gets you interviews.",
    steps: [
      { situation: "You could (A) take 4 more courses, or (B) build 2 deep case studies for target companies. Which, and why?", teaches: "Depth beats breadth. 2-3 research-based case studies (e.g. a 30-day product plan for a target company) prove you think like a PM. Shallow portfolios hurt.", hint: "Depth > breadth." },
      { situation: "Write one resume bullet about building PM Quest using the WHAT/HOW/IMPACT formula.", teaches: "WHAT (built an AI-native PM learning app) + HOW (Next.js, RAG-graded answers, scenario design) + IMPACT (numbers: users, completion, accuracy).", hint: "What + How + Impact, with a number.", free: true },
      { situation: "You're switching role, domain AND industry at once. What's the risk and the fix?", teaches: "Change ONE variable at a time; keep an anchor (transferable skill, domain, or references). Switching everything at once makes you illegible to hirers.", hint: "Keep an anchor." },
    ],
  },
};

export const ACTIONS = {
  fundamentals: { title: "Spot the outcome", task: "Pick any app you used today. In 2-3 lines, write what OUTPUT it shipped recently vs what OUTCOME (real metric/behaviour) it was chasing.", principle: "Output is the feature; outcome is the measurable impact on user/business.", placeholder: "App: …\nOutput: …\nOutcome it's really chasing: …" },
  discovery: { title: "Write a JTBD", task: "For a product you use, write one Jobs-To-Be-Done statement in the format: 'When I am [context], I want to [motivation], so that I can [outcome].'", principle: "JTBD captures the progress a user is trying to make, not the feature. Context + motivation + outcome.", placeholder: "When I am …, I want to …, so that I can …" },
  strategy: { title: "Write an OKR", task: "Write one OKR (1 Objective + 2 Key Results) for a product you know. The objective should be ambitious; the KRs measurable and time-bound.", principle: "Objective = inspiring + qualitative. KR = metric + baseline + target + timeframe. Aim to hit ~70%.", placeholder: "Objective: …\nKR1: …\nKR2: …" },
  prd: { title: "Write a problem statement", task: "Write a problem statement for a product pain you've felt. No feature names. Include data/behaviour + the pain.", principle: "Good = data + specific user behaviour + clear pain, no solution. If it names a feature, it's a solution in disguise.", placeholder: "e.g. 40% of users abandon X because …" },
  "ai-foundations": { task: "A teammate wants to 'fine-tune GPT to know our docs.' In 3-4 lines, explain whether that's right and what you'd do instead.", title: "RAG vs fine-tune memo", principle: "Fine-tuning changes behaviour, not knowledge. Dynamic/large knowledge → RAG. Be specific about why.", placeholder: "I'd push back because …\nInstead I'd …" },
  agents: { title: "Design an agent's guardrails", task: "Pick a task you'd give an AI agent. Define: its 3 components, its tool access, and where a human must stay in the loop.", principle: "Intelligence + tools + orchestration. Higher stakes & lower reversibility → more human review. Least-privilege tools.", placeholder: "Task: …\nBrain/Tools/Orchestration: …\nHuman-in-the-loop at: …" },
  "ai-building": { title: "Make the architecture call", task: "For an AI product idea, decide RAG, fine-tuning, both, or just prompting — and justify it using the knowledge×behaviour 2×2.", principle: "RAG = what it knows (dynamic). Fine-tune = how it behaves (custom). Start with the cheapest that works.", placeholder: "Idea: …\nKnowledge: static/dynamic? Behaviour: standard/custom?\nChoice + why: …" },
  "ai-pm-craft": { title: "Write a sharp prompt", task: "Write a production prompt for an AI feature using Role + Context + Task + Format + Constraints. Include an 'out' for uncertainty.", principle: "RCTFCE. Give the model an out ('if unsure, ask') to cut hallucination. Right info, not all info.", placeholder: "Role: …\nTask: …\nFormat: …\nConstraints (incl. 'if unsure, …'): …" },
  "build-career": { title: "Write your proof-of-work bullet", task: "Write one resume bullet about a project using WHAT + HOW + IMPACT, with at least one number.", principle: "WHAT you did + HOW (frameworks/tools/PM keywords) + IMPACT (a real number).", placeholder: "Built … using … which …% / … users / …" },
};
