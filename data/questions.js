// ============================================================
// PM Quest — Question Bank v2 (scenario-based, snappy)
// Every wrong option is a real mistake. Teaching lives in `why`.
// Types: mcq | trap | fill | match | order | recall
// ============================================================

export const CURRICULUM = [
  // ───────────────────────────── UNIT 1
  {
    id: "fundamentals", title: "PM Fundamentals",
    blurb: "Value, outcomes, the lifecycle, artifacts.",
    color: "#6C5CE7", icon: "compass",
    lessons: [
      {
        id: "f1", title: "Value & Outcomes",
        q: [
          { type:"mcq", q:"Your team shipped 12 features this quarter but retention, revenue and engagement are flat. What does that tell you?", options:["Great velocity — keep going","You created output, not outcome — busy ≠ valuable","Need to ship more to see impact","Marketing's fault, not product"], answer:1, why:"Output = you built it. Outcome = it moved a real metric. Flat metrics + lots of shipping = the Feature Factory trap." },
          { type:"trap", q:"A teammate says 'we create value by shipping as much as we can.' Right or wrong?", options:["Right — more shipped, more value","Wrong — value = a real problem/desire solved, measured by metrics"], answer:1, why:"Value isn't activity. It's a problem or desire actually solved. The customer then reciprocates with money or attention." },
          { type:"fill", q:"Something you built that moves no metric is just an ______ (not an outcome).", answer:"output", accept:["output"], why:"Output is the thing; outcome is the impact. PMs are paid for outcomes." },
          { type:"mcq", q:"Instagram is free to use. How does it capture value?", options:["It doesn't — it's charity","Attention — sold to advertisers","Hidden subscription","Selling user accounts"], answer:1, why:"Customers reciprocate with money (Netflix) OR attention (Instagram, YouTube), which platforms sell to advertisers." },
          { type:"recall", q:"State the one law of product management in a sentence.", answer:"Solve user problems and achieve business outcomes — everything else is derived from this.", why:"This is the anchor everything else hangs off." },
        ],
      },
      {
        id: "f2", title: "Lifecycle & Artifacts",
        q: [
          { type:"order", q:"Put the PM lifecycle in order.", seq:["Discovery","Delivery","Distribution"], why:"Discovery (roadmap) → Delivery (shipped) → Distribution (GTM) → loops back. You're never 'done'." },
          { type:"mcq", q:"You're explaining next quarter to the CEO. Which artifact do you bring?", options:["The 200-item backlog","The NOW/NEXT/LATER roadmap","A detailed FRD","The sprint board"], answer:1, why:"Roadmap = strategic, for leaders, structured NOW (90% clarity) / NEXT / LATER. Backlog & sprint board are for the team." },
          { type:"match", q:"Match artifact to audience.", pairs:[["Roadmap","Leaders & stakeholders"],["PRD","Design, dev, QA"],["Backlog","Engineering tasks"],["Sprint board","The team this cycle"]], why:"Each lives at a different altitude of detail." },
          { type:"trap", q:"A stakeholder pitches a feature. What's your strongest default stance?", options:["Yes — keep momentum","No, until the problem and impact are proven"], answer:1, why:"Default NO protects focus. Every hour on a weak idea is stolen from a strong one (opportunity cost)." },
          { type:"fill", q:"A 2-week commitment to deliver a slice of the backlog is a ______.", answer:"sprint", accept:["sprint","sprint backlog"], why:"Ends with Review + Retrospective. Leverages short-term human focus." },
        ],
      },
      {
        id: "f3", title: "Roles & NoBroker",
        q: [
          { type:"match", q:"Match the role to its main focus.", pairs:[["Product Manager","Discovery — why & what"],["Product Owner","Delivery — backlog & stories"],["Project Manager","Sprint execution & timing"],["PMM","Distribution — GTM & adoption"]], why:"Loosely defined in practice — always read the actual JD." },
          { type:"mcq", q:"NoBroker put listings online to cut out brokers — but users still used brokers. What was the real insight?", options:["Listings online was wrong","Brokers also did verification, agreements, keys — not just discovery","Owners hated the site","Tenants liked brokers socially"], answer:1, why:"The real job was managed services, not just listing. Listening to what users DID (not said) unlocked their growth." },
          { type:"recall", q:"State the golden rule NoBroker embodies.", answer:"Rather than finding customers for your product, find products for your customers — start with the human.", why:"Build for the user's real job, not your initial hypothesis." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 2
  {
    id: "discovery", title: "Discovery & Research",
    blurb: "Product sense, JTBD, the Mom's Test, personas.",
    color: "#00B894", icon: "search",
    lessons: [
      {
        id: "d1", title: "Product Sense",
        q: [
          { type:"mcq", q:"Asked 'How would you improve Zoom?', a candidate opens with 'add transcription and reactions.' What did they fail?", options:["Too few features","Jumped to solutions before user, context, problem","Unrealistic features","Forgot metrics"], answer:1, why:"The #1 rejection isn't the feature — it's skipping the problem space. Clarify context → segment → problem → THEN solutions." },
          { type:"order", q:"Order the 6-step product-sense framework.", seq:["Business context & goals","User segments","Prioritise a segment","Problems & opportunities","Solutions & metrics","Recommendations & trade-offs"], why:"Trade-offs happen at EVERY step. It's iterative, not waterfall." },
          { type:"trap", q:"You segment Google Maps users as 18–25, 26–40, 41+. Good approach?", options:["Yes — clear demographic buckets","No — segment by behaviour (commuters, travelers, gig workers)"], answer:1, why:"A 50-yr-old power user behaves like a 20-yr-old power user. Behaviour predicts; age doesn't." },
          { type:"fill", q:"A need users have but don't expect your product to solve is a ______ need.", answer:"latent", accept:["latent","latent need"], why:"Found by observation, not surveys. The fridge-as-status-symbol: buyers cite specs, never aesthetics." },
          { type:"mcq", q:"Descript beat Premiere for creators. What was the product-sense move?", options:["A faster timeline","Right user (creators, not pros) + replace timeline with an editable transcript","More export formats","Cheaper price"], answer:1, why:"Identify the right user, the root problem (timeline complexity), then a creative solution (edit like a Google Doc)." },
        ],
      },
      {
        id: "d2", title: "Jobs To Be Done",
        q: [
          { type:"mcq", q:"McDonald's milkshake sells most at 7am to lone drivers. What's the real 'job'?", options:["A tasty treat","A filling, one-handed companion for a boring commute","A cheap breakfast","A kids' reward"], answer:1, why:"Know the job → see the real competition (bananas, bagels — not other shakes). Context defines the hire." },
          { type:"fill", q:"JTBD format: 'When I am [context], I want to [motivation], so that I can [______].'", answer:"outcome", accept:["outcome","expected outcome"], why:"The outcome is the deeper progress the user is chasing." },
          { type:"match", q:"Match the JTBD type to its driver.", pairs:[["Functional","Utility — speed, cost, accuracy"],["Emotional","How it makes ME feel"],["Social","What others think of me"]], why:"New PMs over-index on functional; most buys are emotional, justified by logic." },
          { type:"trap", q:"'People want a drill.' What's the deeper truth?", options:["Yes, sell better drills","They want a hole — and really, to hang a picture and feel a memory"], answer:1, why:"Always ask for the outcome beneath the outcome." },
          { type:"recall", q:"A maths-app's parents say they enroll for 'curiosity', but sales spike every March. What's going on?", answer:"What users SAY ≠ what they DO. Exam season is the real driver; 'curiosity' is the stated reason. Triangulate words with behaviour/sales data.", why:"Buy on emotion, justify with logic." },
        ],
      },
      {
        id: "d3", title: "The Mom's Test",
        q: [
          { type:"mcq", q:"You ask a user 'would you use my fitness app?' and they say yes. Why distrust it?", options:["They're lying maliciously","People give encouraging answers — ask about past behaviour, not future intent","The sample's too small","They're not your user"], answer:1, why:"Don't ask if your idea's good. Ask 'when did you last go to the gym? how do you track fitness now?'" },
          { type:"match", q:"Match the BAD question to its GOOD rewrite.", pairs:[["Would you pay for this?","Have you paid for anything similar before?"],["Is this a good idea?","Walk me through how you solve this today"],["Would you use an AI tool?","Tell me about the last time you tried to automate this"]], why:"Talk about their life, not your idea. Past facts, not future opinions." },
          { type:"fill", q:"Users are the worst predictors of their future, but great ______ of their past.", answer:"historians", accept:["historians","historian"], why:"Ask what they've actually done." },
          { type:"trap", q:"Ford: 'they'd have asked for faster horses.' Does this kill user research?", options:["Yes — ignore users, just invent","No — research the PROBLEM (slow, messy horses); invent the SOLUTION with your team"], answer:1, why:"Uncover problems through users; design solutions with your team." },
        ],
      },
      {
        id: "d4", title: "Personas & Journeys",
        q: [
          { type:"mcq", q:"Meesho's Bangalore devs built a heavy app. What fixed their decisions overnight?", options:["Hiring designers","Putting the user's real low-end phone on the wall as a persona","A/B tests","More servers"], answer:1, why:"Devs on flagships were building for Tier-2/3 users on secondhand phones. The persona closed the empathy gap." },
          { type:"trap", q:"You've built 9 detailed personas. Problem?", options:["More personas = more empathy","Too many — keep 3–5 with one primary; >5 dilutes focus"], answer:1, why:"And never let them die in a folder — use their names in standups." },
          { type:"fill", q:"Intuit's programme where PMs watch clients use the product on-site is called ______ Me Home.", answer:"Follow", accept:["follow","follow me home"], why:"They saw users copy-paste from Excel — invisible in analytics. Built Excel connectors." },
          { type:"recall", q:"In B2B, why isn't one persona enough?", answer:"You need both the user (uses it daily) and the buyer (CFO/CTO who signs the contract). Both sets of needs must be met.", why:"Win the deal AND retain usage." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 3
  {
    id: "strategy", title: "Strategy & Prioritisation",
    blurb: "Vision, OKRs, Kano, ICE, Impact×Effort.",
    color: "#E17055", icon: "target",
    lessons: [
      {
        id: "s1", title: "Vision, Strategy, OKRs",
        q: [
          { type:"match", q:"Match each to its meaning.", pairs:[["Vision","The product in its ultimate form"],["Mission","The world when the product wins"],["Objective","Ambitious qualitative goal"],["Key Result","Measurable, time-bound outcome"]], why:"Netflix: vision = lead streaming; mission = 'entertain the world'." },
          { type:"trap", q:"Your team hits 100% of OKRs every quarter. Manager's reaction?", options:["Promote them — flawless","Concern — objectives are too easy; aim for ~70%"], answer:1, why:"Genuinely ambitious OKRs land near 70%. 100% means you sandbagged." },
          { type:"mcq", q:"Company KR: '30% of sales from Europe.' What does the sales team do with it?", options:["Ignore — it's company-level","Inherit it as their Objective and set their own KRs","Wait for instructions","Copy it word-for-word as a task"], answer:1, why:"Cascading OKRs: a level's KR becomes the next level's Objective. Alignment with autonomy." },
          { type:"mcq", q:"Which is a BAD OKR?", options:["Profitable in North: KR revenue/order minus cost > 0, 5% MoM growth","Become the best player in the world: KR launch a new business line"], answer:1, why:"'Best' is unmeasurable; 'launch a line' is a wish, not a quantified KR." },
          { type:"fill", q:"Nearly every INTERNAL product failure traces back to poor ______ communication.", answer:"proactive", accept:["proactive","clear","proactive and clear"], why:"Agile, PRDs, OKRs, roadmaps are all communication tools." },
        ],
      },
      {
        id: "s2", title: "Kano Model",
        q: [
          { type:"match", q:"Match Kano category to user reaction when ABSENT.", pairs:[["Must-have","Furious"],["Performance","Less satisfied (linear)"],["Delighter","Indifferent — didn't expect it"]], why:"Must-haves assumed; performance 'more is better'; delighters are surprises." },
          { type:"trap", q:"For your MVP you ship only the must-haves competitors already have. Smart?", options:["Yes — minimum = must-haves only","No — with no delighter, users have no reason to switch (Instagram's MVP had Filters)"], answer:1, why:"MVP = minimum to test your riskiest assumption, NOT the simplest product. Switching cost is real." },
          { type:"fill", q:"Kano ______: yesterday's delighter (live tracking) becomes today's expectation.", answer:"drift", accept:["drift","kano drift"], why:"Expectations escalate; never call your product 'done'." },
          { type:"mcq", q:"Ola Play poured effort into in-cab entertainment and slipped on reliability + price. Lesson?", options:["Entertainment was the wrong feature","Don't over-invest in delighters while the must-haves crumble","They needed more delighters","Pricing is irrelevant"], answer:1, why:"Balance Stability (must-haves), Growth (performance), Differentiation (delighters)." },
        ],
      },
      {
        id: "s3", title: "ICE & Impact×Effort",
        q: [
          { type:"match", q:"Match ICE letter to who estimates it.", pairs:[["Impact","PM — research & data"],["Confidence","PM + team — evidence"],["Effort","Engineering & design"]], why:"Never estimate effort without the team building it." },
          { type:"match", q:"Match the Impact×Effort quadrant to its action.", pairs:[["High impact / low effort","Quick win — do first"],["High impact / high effort","Big bet — experiment first"],["Low impact / low effort","Valley of Death"],["Low impact / high effort","Discard / park"]], why:"Teams overrate impact, underrate effort." },
          { type:"mcq", q:"You proudly show 10 low-effort features shipped in 6 months. Your manager's one question?", options:["How did you ship so fast?","Did any of them create value?","Which was hardest?","Can you do 20 next?"], answer:1, why:"That's the Valley of Death — the most dangerous quadrant for your career. Be a value creator, not a builder." },
          { type:"fill", q:"Overrating your own idea's impact because it's yours is ______'s bias.", answer:"innovator", accept:["innovator","innovators","innovator's"], why:"Fight it with the product trio, data, and experiments." },
          { type:"mcq", q:"You have a high-impact, high-effort bet: localise the site into 80+ languages. Best first move?", options:["Build all 80","Translate sign-up/login into 3 languages, measure, then expand","Cancel it","Let leadership decide"], answer:1, why:"Turn big bets into small experiments to build confidence — the real meaning of MVP." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 4
  {
    id: "prd", title: "PRD & Execution",
    blurb: "PRDs, Agile, the PM–EM partnership.",
    color: "#0984E3", icon: "doc",
    lessons: [
      {
        id: "p1", title: "What a PRD Really Is",
        q: [
          { type:"trap", q:"A new PM finishes a polished PRD in a day and feels productive. Red flag?", options:["No — fast is good","Yes — a one-day PRD usually means the thinking was skipped"], answer:1, why:"A PRD is proof you did the thinking. The template writes itself once you've thought clearly." },
          { type:"trap", q:"Eng says 'writing a PRD is anti-agile.' Are they right?", options:["Yes — it forces waterfall","No — a lean, live, editable PRD evolves as you learn"], answer:1, why:"The myth confuses what's in a PRD with how it's maintained. It's a Google Doc, not a PDF." },
          { type:"match", q:"Match the doc to the question it answers.", pairs:[["BRD","Why invest in this?"],["PRD","What are we building?"],["FRD","How should the system work?"]], why:"Most teams just use the PRD — it bridges business and engineering." },
          { type:"order", q:"Order the 6 phases of a great PRD.", seq:["Immerse","Frame","Explore","Align","Narrate","Evolve"], why:"Align is the most-skipped and most failure-causing phase." },
          { type:"fill", q:"Metric formula: Metric + Baseline + Target + ______.", answer:"timeframe", accept:["timeframe","time frame","time-frame"], why:"'Cut abandonment 23%→15% in 90 days' — not 'improve UX'." },
        ],
      },
      {
        id: "p2", title: "Problem Statements & Sins",
        q: [
          { type:"mcq", q:"Which is a real problem statement (not a solution in disguise)?", options:["Add a search bar to the dashboard","40% abandon onboarding, can't find value in 3 min","Redesign the homepage","Improve the checkout flow"], answer:1, why:"If it names a feature, you've jumped to a solution. The good one has data + behaviour + pain." },
          { type:"trap", q:"'NPS is 23 and falling, so let's redesign the UI.' What's wrong?", options:["Nothing — it has a metric","It jumps to a solution; the real question is WHY NPS is 23"], answer:1, why:"Good metric, unexamined solution. Sin #1: solution disguised as problem." },
          { type:"match", q:"Match the deadly PRD sin to its fix.", pairs:[["Vague metrics","Metric + Baseline + Target + Timeframe"],["Happy path only","Ask: what could go wrong?"],["Missing non-goals","State what's out of scope"],["Over-specifying","Give goals; let engineers shape the how"]], why:"Each sin maps to a discipline." },
          { type:"fill", q:"Explicitly stating what a feature will NOT do is defining ______.", answer:"non-goals", accept:["non-goals","non goals","nongoals"], why:"Scope clarity is a gift to engineering." },
          { type:"recall", q:"Why frame the Like button as a story, not 'a click that increments a count'?", answer:"Many people have no place to feel heard; a like is how they show appreciation. Inspired engineers build better than order-takers.", why:"Great PMs motivate, not dictate." },
        ],
      },
      {
        id: "p3", title: "Agile & the PM–EM line",
        q: [
          { type:"mcq", q:"Simplest honest definition of Agile?", options:["No planning","Quick repeated cycles (2–4 wks) of define→build→release, so you learn fast","Startups only","Docs first"], answer:1, why:"Same steps as waterfall, but weeks not months. Learning is course correction." },
          { type:"order", q:"Order the Scrum hierarchy, broad → narrow.", seq:["Epic","Product Backlog","Sprint Backlog","User Story"], why:"Epic = big body of work; backlog = all future work; sprint = this cycle; story = one slice." },
          { type:"match", q:"Match 'who owns what'.", pairs:[["WHY are we doing this","Product Manager"],["WHAT we're building","PM + Design"],["HOW we build it","Engineering Manager"],["WHEN it ships","Engineering Manager"]], why:"Never commit a timeline without the EM. If they say 6 months, negotiate scope — don't override the estimate." },
          { type:"trap", q:"Sales hands you a big client's feature request. First move?", options:["Check eng bandwidth, then yes/no","Convert it to a problem, validate it, weigh vs roadmap & strategy"], answer:1, why:"A feature is a solution. Find the problem under it before committing roadmap time." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 5
  {
    id: "ai-foundations", title: "AI Foundations",
    blurb: "Tokens, embeddings, attention, hallucination.",
    color: "#A29BFE", icon: "brain",
    lessons: [
      {
        id: "a1", title: "How LLMs Work",
        q: [
          { type:"fill", q:"At its core, an LLM is just a next-______ predictor.", answer:"token", accept:["token"], why:"Everything else emerges from predicting the next token at scale." },
          { type:"trap", q:"A PM assumes '1 token = 1 word' when budgeting cost. Safe?", options:["Yes, close enough","No — ~0.75 words in English; Hindi uses far more, raising cost"], answer:1, why:"Tokens are sub-word units. Mis-estimating tokens mis-estimates your bill, latency, and context budget." },
          { type:"mcq", q:"Your AI feature's cost suddenly tripled. Which lever most likely changed?", options:["The model's mood","Tokens — longer prompts/responses cost, slow, and fill the window","User count only","The UI color"], answer:1, why:"Tokens are directly proportional to cost, latency, and memory. Every output-length choice has a price." },
          { type:"mcq", q:"King − Man + Woman ≈ Queen. What does this show about LLMs?", options:["They do algebra","Embeddings place meaning in space, so relationships are measurable","They're rule-coded","Coincidence"], answer:1, why:"Similar meanings sit nearby — the basis of semantic search." },
          { type:"mcq", q:"'I sat on the bank of the river.' How does the model know 'bank' = riverbank?", options:["It guesses randomly","Attention links 'bank' to 'river' to disambiguate","A dictionary lookup","User tags it"], answer:1, why:"Attention (2017 Transformers) weighs which words matter to each other, in parallel." },
        ],
      },
      {
        id: "a2", title: "Hallucination & Post-training",
        q: [
          { type:"trap", q:"Your chatbot confidently invents a fake statistic. Is this a fixable bug?", options:["Yes — patch it out completely","No — it's a characteristic of next-token prediction; reducible (RAG), never zero"], answer:1, why:"The model generates plausible text, not verified facts. Bard's JWST error cost Google $100B in a day." },
          { type:"trap", q:"'Post-training (RLHF) makes the model more factually correct.' True?", options:["Yes","No — it changes behaviour (helpful, safe), not correctness"], answer:1, why:"Post-training is parenting; pre-training is the DNA. Politeness ≠ truth." },
          { type:"match", q:"Match the LLM memory type to its trait.", pairs:[["Training memory","Old, compressed — like school knowledge"],["Context memory","Fresh, specific, reliable — the prompt now"]], why:"Context memory beats training memory — the reason RAG works." },
          { type:"mcq", q:"A teammate wants to fine-tune GPT-4 on your company docs. Best response?", options:["Great, start training","99% of the time use RAG — inject the data at query time, no retraining","Use a bigger model","Do nothing"], answer:1, why:"Fine-tuning changes behaviour, not knowledge. 'We need our data in there' = RAG." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 6
  {
    id: "ai-building", title: "RAG & Fine-Tuning",
    blurb: "Retrieval, the 2×2 decision, failure modes.",
    color: "#00CEC9", icon: "layers",
    lessons: [
      {
        id: "r1", title: "RAG Pipeline",
        q: [
          { type:"order", q:"Order the RAG query pipeline.", seq:["Embed the query","Search the vector DB","Retrieve top-K chunks","Augment the prompt","LLM answers, grounded"], why:"Indexing (chunk→embed→store) happens once; this loop runs every request." },
          { type:"mcq", q:"Your support bot must answer from 10,000 policy docs that change weekly. Best approach?", options:["Fine-tune monthly","RAG — retrieve the right chunks at query time","Paste all docs into every prompt","Bigger model"], answer:1, why:"RAG keeps answers grounded and current without retraining or bloating the context." },
          { type:"match", q:"Match the retrieval type to its strength.", pairs:[["Dense (semantic)","'refund' matches 'return policy'"],["Sparse (keyword)","exact 'Invoice #INV-2024-0891'"],["Hybrid","both — real queries"]], why:"If users search exact IDs, dense alone fails — add sparse." },
          { type:"recall", q:"Your RAG bot keeps quoting last month's refund policy. Which failure point, and the fix?", answer:"Failure Point #1: Data Quality. Retrieval works; the source is stale. Fix is operational — update the data + a freshness SLA, not a bigger model.", why:"Walk the failure points in order; it's rarely the model." },
        ],
      },
      {
        id: "r2", title: "RAG vs Fine-Tuning",
        q: [
          { type:"match", q:"Map knowledge × behaviour to the right approach.", pairs:[["Static + standard","Prompt engineering"],["Dynamic + standard","RAG"],["Static + custom","Fine-tuning"],["Dynamic + custom","RAG + Fine-tuning"]], why:"RAG = what it KNOWS. Fine-tuning = how it BEHAVES. Complementary." },
          { type:"trap", q:"Your AI output is weak. A teammate says 'let's fine-tune first.' Wise?", options:["Yes — fine-tune for quality","No — start with prompt + RAG; fine-tune only if those plateau"], answer:1, why:"Jumping to fine-tuning shows no grasp of cost/benefit. Don't use a sword where a needle works." },
          { type:"fill", q:"Using a big model to train a small cheap one is knowledge ______.", answer:"distillation", accept:["distillation"], why:"The PhD writes the answers; the 10th-grader studies them and nearly matches — for cheap." },
          { type:"mcq", q:"You need a fast, cheap, on-device classifier for one narrow task. Pick:", options:["The biggest frontier model","A fine-tuned small model (SLM)","Whatever's newest","GPT-4 for everything"], answer:1, why:"Superman vs the specialist doctor — most tasks want a specialist, not general superpowers." },
        ],
      },
      {
        id: "r3", title: "Chunking & Retrieval Quality",
        q: [
          { type:"mcq", q:"Your RAG bot retrieves the right document but answers with half the policy missing. Likely cause?", options:["The model is too small","Chunking split the policy mid-thought, so a key chunk wasn't retrieved","Temperature too high","Not enough GPUs"], answer:1, why:"Chunk strategy decides what can be retrieved. Bad splits orphan critical context. Tune chunk size/overlap to the content." },
          { type:"trap", q:"To be safe, you set Top-K retrieval to 50 chunks per query. Good idea?", options:["Yes — more context, safer","No — too many chunks add noise, cost and 'lost in the middle'; retrieve few, relevant ones"], answer:1, why:"Retrieval quality > quantity. Stuffing K dilutes the signal and raises hallucination." },
          { type:"recall", q:"A user complains your RAG bot 'makes things up' for a question you KNOW is in the docs. Walk the first 3 things you'd check.", answer:"1) Did retrieval return the right chunk (retrieval log)? 2) Was the chunk well-formed (chunking/embedding)? 3) Did the prompt actually include it (augmentation)? Only then suspect the model.", why:"Debug the pipeline in order — generation is the last suspect, not the first." },
          { type:"mcq", q:"Two chunks contradict each other (old vs new policy both retrieved). Best fix?", options:["Let the model pick","Add metadata (date) + filter/rank by recency so stale chunks lose","Remove RAG","Bigger model"], answer:1, why:"Metadata filtering and re-ranking resolve conflicts retrieval alone can't." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 7
  {
    id: "agents", title: "AI Agents",
    blurb: "Agency, multi-agent, autonomy, guardrails.",
    color: "#FD79A8", icon: "robot",
    lessons: [
      {
        id: "g1", title: "What Makes an Agent",
        q: [
          { type:"match", q:"Match the 3 parts of an agent.", pairs:[["Intelligence","The LLM — decisions"],["Tools","APIs, email, Slack"],["Orchestration","n8n / LangGraph — the loop"]], why:"Brain, hands, and the nervous system that runs the loop." },
          { type:"trap", q:"What truly separates an agent from a fixed workflow?", options:["Agents use more tools","Agency — the LLM decides the next step, not predefined logic"], answer:1, why:"A workflow has fixed steps; an agent decides. Don't over-engineer a working workflow into one." },
          { type:"order", q:"Order the OWO check before building an agent.", seq:["Opportunity","Workflow","Outcome"], why:"What problem & why now → old vs new flow → which metric improves." },
          { type:"mcq", q:"~95% of AI initiatives fail. The biggest reason?", options:["Weak models","The Learning Gap — not understanding the real problem + no evolution","Too costly","No GPUs"], answer:1, why:"Deep discovery + systems that keep learning beat raw model power." },
        ],
      },
      {
        id: "g2", title: "Multi-Agent & Autonomy",
        q: [
          { type:"mcq", q:"In Deep Research, why give each sub-agent its OWN context window?", options:["More memory for fun","So messy research stays isolated — only clean outputs return to the master","Security only","To run slower"], answer:1, why:"Master = CEO who wants outputs; sub-agents do the ground work in parallel without polluting context." },
          { type:"match", q:"Match autonomy level to its example.", pairs:[["AI suggests","ChatGPT, Perplexity"],["AI co-pilot (you review)","Cursor, Copilot"],["AI acts (guardrails)","Lovable, Devin"]], why:"Higher stakes + lower reversibility = more human-in-the-loop." },
          { type:"trap", q:"Going from low to high autonomy means removing safety. True?", options:["Yes — full automation","No — you swap CONTROL (micromanage) for GUARDRAILS (set boundaries, let it act)"], answer:1, why:"A great manager sets the goal and the don'ts, then lets the agent figure out the how." },
          { type:"mcq", q:"Your agent emails refunds to customers automatically. Safest design?", options:["Full autonomy — send instantly","Human-in-the-loop: agent drafts, human approves before send","No agent","Users self-approve"], answer:1, why:"Higher stakes + irreversible = more human review." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 8
  {
    id: "ai-pm-craft", title: "AI PM Craft",
    blurb: "Prompting, evals, the Octopus, AI-first UX.",
    color: "#FAB1A0", icon: "spark",
    lessons: [
      {
        id: "c1", title: "Prompting & Context",
        q: [
          { type:"order", q:"Order the RCTFCE prompt components.", seq:["Role","Context","Task","Format","Constraints","Examples"], why:"Minimum useful: Role + Task + Format. Each adds quality." },
          { type:"trap", q:"To improve answers, a PM stuffs the whole knowledge base into the context. Smart?", options:["Yes — more context, better","No — accuracy drops ('lost in the middle'); put the RIGHT info, not ALL"], answer:1, why:"Context engineering is resource allocation. A focused 2k beats a noisy 50k." },
          { type:"mcq", q:"Your bot keeps confidently answering questions it has no data for. Best prompt fix?", options:["Bigger model","Add: 'if unsure, say so and ask a clarifying question'","Lower temperature only","More examples"], answer:1, why:"LLMs are compulsive completers; giving an 'out' cuts forced hallucination." },
          { type:"mcq", q:"You're building a finance bot that must be consistent and factual. Temperature?", options:["High (~0.9) for variety","Near 0 for deterministic, focused output","Doesn't matter","Always 1.0"], answer:1, why:"Low temp = focused; high temp = creative. It's a product decision." },
          { type:"recall", q:"What is 'red-teaming your own AI output', and why bother?", answer:"After a result, tell the AI to be a harsh critic and name assumptions that could be wrong. LLMs default to flattery, so you must prompt for criticism to surface weaknesses.", why:"This habit can lift output quality 30–40%." },
        ],
      },
      {
        id: "c2", title: "Evals & the Six Knobs",
        q: [
          { type:"trap", q:"Is your golden dataset the same as training data?", options:["Yes","No — training BUILDS the model; the golden set TESTS the product; never mix"], answer:1, why:"Fine-tuning on your eval set = giving the student the exam answers. Scores become meaningless." },
          { type:"order", q:"Order the six tuning knobs, cheapest → most expensive.", seq:["System prompt","Context / RAG","Tools","Model","Orchestration","Fine-tuning"], why:"~80% of issues fix at knobs 1–2. Fine-tuning is last, not first." },
          { type:"mcq", q:"Offline evals say 95% but thumbs-down is climbing in production. Likely cause?", options:["Model got dumber overnight","Data drift — real queries diverged from your golden set","Users are wrong","Latency"], answer:1, why:"Sample real queries, add new clusters to the golden set. Offline only tests what it covers." },
          { type:"mcq", q:"You can't have humans grade 10,000 daily answers. Best scalable check?", options:["Skip grading","LLM-as-judge on quality, calibrated against a human sample","Trust the model","Only star ratings"], answer:1, why:"Hybrid: code checks 100%, LLM-judge flags, humans review the flagged few." },
        ],
      },
      {
        id: "c3", title: "Octopus & AI-First UX",
        q: [
          { type:"mcq", q:"In the Intelligence–Latency–Cost triangle, how many can you maximise?", options:["All three","At most two — the third is the trade-off","None","Only cost"], answer:1, why:"Smart + fast = pricey; fast + cheap = less smart. Model choice is a product decision." },
          { type:"match", q:"Match the AI-first UX pattern to what it solves.", pairs:[["👍/👎 feedback","Fuel for the quality loop"],["Suggested prompts","Beats the blank-slate freeze"],["Undo / rollback","Recover from wrong AI actions"],["Show sources","Builds trust"]], why:"In AI, UX is the moat — Cursor is VS Code + an API + a great experience." },
          { type:"trap", q:"What's the strongest AI moat?", options:["Using the newest model","A data flywheel — every use improves the product, pulling more users"], answer:1, why:"Anyone can call the same API. Proprietary context + workflow lock-in + a feedback flywheel defend you." },
          { type:"recall", q:"What is 'inherent virality'? Give one example.", answer:"When one person's normal use exposes others — e.g. a meeting-summary tool emails the AI summary to all attendees, who discover it free. Build it into the product, not as a Share button.", why:"It slashes customer acquisition cost." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 9
  {
    id: "build-career", title: "Build & Career",
    blurb: "Vibe coding, prototyping, resume & proof.",
    color: "#FDCB6E", icon: "rocket",
    lessons: [
      {
        id: "b1", title: "Vibe Coding & Prototyping",
        q: [
          { type:"trap", q:"Two PMs use the same vibe-coding tool; one ships a great app, one a mess. What decides it?", options:["The tool they picked","Their prompt — driven by research depth and product sense"], answer:1, why:"Tools converge. Knowing WHAT to build, WHY, for WHOM is the differentiator." },
          { type:"order", q:"Order the right prototyping approach.", seq:["Do discovery first","Write a PRD from research","Feed it to a vibe-coding tool","Iterate by chat","Test with users — V2 is your portfolio"], why:"The tool can't compensate for shallow research. V2 (post-feedback) is what you show." },
          { type:"fill", q:"The prompt-iteration mindset: ABI — Always Be ______.", answer:"iterating", accept:["iterating"], why:"Your first prompt is never your last." },
          { type:"recall", q:"Explain the torch-in-the-forest idea for decision paralysis.", answer:"A torch lights only 2–3 metres — enough for the next step. You don't need the whole path to move. Momentum brings clarity; start.", why:"Action beats waiting for full certainty." },
        ],
      },
      {
        id: "b2", title: "Resume & Proof of Work",
        q: [
          { type:"match", q:"Match the resume-bullet formula.", pairs:[["WHAT","The task you delivered"],["HOW","Strategy, frameworks, tools — PM keywords"],["IMPACT","Numbers & KPIs"]], why:"40–50% of bullets must carry numbers. Can't manage what you don't measure." },
          { type:"trap", q:"You paste a GPT-written resume full of buzzwords. Risk?", options:["None — AI is fine","Over-stuffing gets flagged; use AI as a collaborator and humanise every line"], answer:1, why:"The real filter is a human reader — does it add value, or read like a bot?" },
          { type:"mcq", q:"As a career-switcher, what's the strongest proof of work?", options:["A long list of courses","2–3 deep, research-based case studies (e.g. a 30-day plan for a target company)","10 shallow case studies","A certificate badge"], answer:1, why:"Depth shows you can think like a PM before the title. Shallow portfolios hurt you." },
          { type:"fill", q:"When switching careers, change ONE variable (role/domain/industry) and keep the overlap as your ______.", answer:"anchor", accept:["anchor"], why:"Transferable skills, domain, or product references — find yours." },
        ],
      },
    ],
  },
];

// Flatten helper
export function allLessons() {
  const out = [];
  CURRICULUM.forEach((u) => u.lessons.forEach((l) => out.push({ unit: u.id, ...l })));
  return out;
}
