// ============================================================
// PM Quest — Question Bank
// Seeded from Himanshu's HelloPM curriculum notes.
// Question types: mcq | trap | fill | match | order | recall
//   trap  -> wrong option is the common misconception (explain why)
//   fill  -> single best blank answer + accepted alternates
//   match -> pairs [left,right]
//   order -> correct sequence
//   recall-> free-text, graded by Groq if key present (else self-rate)
// Each q: {type, q, options?, answer, why, pairs?, seq?, accept?}
// ============================================================

export const CURRICULUM = [
  // ───────────────────────────── UNIT 1
  {
    id: "fundamentals",
    title: "PM Fundamentals",
    blurb: "Value, outcomes, the PM lifecycle, artifacts.",
    color: "#6C5CE7",
    icon: "compass",
    lessons: [
      {
        id: "f1",
        title: "Value & Outcomes",
        q: [
          { type:"mcq", q:"A business exists to…", options:["Ship as many features as possible","Create value for the customer, who reciprocates with money or attention","Maximise engineering velocity","Raise the most funding"], answer:1, why:"Value = a real problem/desire + a solution that addresses it. The customer reciprocates with money or attention." },
          { type:"trap", q:"“We shipped 10 features this quarter.” Is that good product management?", options:["Yes — more features shipped means a better PM","Not necessarily — shipping speed ≠ value created"], answer:1, why:"This is the Feature Factory trap. Output (features) is not Outcome (impact on user/business). A busy team can produce zero value." },
          { type:"fill", q:"Building something nobody cares about is an ______ (just a solution); something that moves a real metric is an outcome.", answer:"output", accept:["output"], why:"Output = you built it. Outcome = it actually helped, measured by retention, revenue, engagement." },
          { type:"mcq", q:"How do customers reciprocate value? (best answer)", options:["Only with money","Money OR attention (which platforms sell to advertisers)","Only with attention","With code contributions"], answer:1, why:"Zomato/Netflix take money; Instagram/YouTube take attention and sell it to advertisers." },
          { type:"recall", q:"In one sentence, state the one law of product management.", answer:"Solve user problems and achieve business outcomes — everything else is derived from this.", why:"This is the anchor of the entire program." },
        ],
      },
      {
        id: "f2",
        title: "Lifecycle & Artifacts",
        q: [
          { type:"order", q:"Order the PM lifecycle phases.", seq:["Discovery","Delivery","Distribution"], why:"Discovery (roadmap) → Delivery (shipped product) → Distribution (GTM) → feeds back into Discovery. It's a continuous loop, never 'done'." },
          { type:"match", q:"Match the artifact to its audience.", pairs:[["Product Roadmap","Business leaders / senior stakeholders"],["PRD","Designers, devs, QA, sales"],["Product Backlog","Engineering — granular task list"],["Sprint Backlog","The team, for one 2-week cycle"]], why:"Each artifact serves a different altitude of detail and a different audience." },
          { type:"mcq", q:"How is a roadmap structured for clarity over time?", options:["Q1/Q2/Q3/Q4 fixed dates","NOW (90% clarity) → NEXT (50–70%) → LATER (20%+)","Alphabetically by feature","By engineer assigned"], answer:1, why:"NOW/NEXT/LATER communicates confidence honestly. Only write detailed PRDs for NOW items." },
          { type:"trap", q:"The default answer a PM should give to a new feature idea is…", options:["YES — keep the team busy","NO, unless proven needed and impactful"], answer:1, why:"Every hour on a low-impact idea is an hour stolen from a high-impact one (opportunity cost). Default NO protects focus." },
          { type:"fill", q:"A 2-week commitment to deliver a slice of the backlog is called a ______.", answer:"sprint", accept:["sprint","sprint backlog"], why:"Sprints leverage humans' short-term thinking; they end with Review + Retrospective." },
        ],
      },
      {
        id: "f3",
        title: "Roles & NoBroker",
        q: [
          { type:"match", q:"Match the role to its main focus.", pairs:[["Product Manager","Discovery — the why & what"],["Product Owner","Delivery — backlog & user stories"],["Project Manager","Sprint execution & on-time delivery"],["Product Marketing Manager","Distribution — GTM & adoption"]], why:"Roles are loosely defined in practice — always read the actual JD." },
          { type:"mcq", q:"What did NoBroker discover that changed their product?", options:["Brokers were unnecessary entirely","Brokers also did verification, agreements, key management — not just discovery","Owners didn't want to list online","Tenants preferred brokers socially"], answer:1, why:"Users still went to brokers even on the platform. The real job was managed services, not just listing — that unlocked growth." },
          { type:"recall", q:"State the golden rule that NoBroker embodies.", answer:"Rather than finding customers for your product, find products for your customers — start with the human.", why:"They listened to what users DID, not just what they SAID." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 2
  {
    id: "discovery",
    title: "Discovery & Research",
    blurb: "Product sense, JTBD, the Mom's Test, personas.",
    color: "#00B894",
    icon: "search",
    lessons: [
      {
        id: "d1",
        title: "Product Sense",
        q: [
          { type:"mcq", q:"The #1 most common PM interview rejection reason is…", options:["Not knowing frameworks","Jumping to solutions before understanding the problem","Weak SQL","No design skills"], answer:1, why:"Stay in the problem space longer. Context → segment → problems → THEN solutions." },
          { type:"order", q:"Order the 6-step product sense framework.", seq:["Business context & goals","User segments","Prioritise a segment","Problems & opportunities","Solutions & metrics","Recommendations & trade-offs"], why:"Trade-offs are made at EVERY step, not just at the end. The framework is iterative, not waterfall." },
          { type:"trap", q:"Best way to segment users?", options:["By demographics (age, gender)","By behaviour (e.g. commuters, travelers, gig workers)"], answer:1, why:"A 50-year-old power user behaves more like a 20-year-old tech-savvy user than a 50-year-old non-user. Behaviour predicts; demographics don't." },
          { type:"fill", q:"A problem users have but don't expect the product to solve is a ______ need — validated by observation, not surveys.", answer:"latent", accept:["latent","latent need"], why:"The refrigerator-as-status-symbol example: people cite specs, never aesthetics, but aesthetics drive the buy." },
          { type:"mcq", q:"Descript's product-sense insight was…", options:["Make a faster timeline editor","Identify content creators (not pros) and replace timeline with a transcript/doc view","Add more export formats","Target professional editors"], answer:1, why:"Right user + root problem (timeline complexity) + creative solution (edit the transcript like a Google Doc)." },
        ],
      },
      {
        id: "d2",
        title: "Jobs To Be Done",
        q: [
          { type:"mcq", q:"The core thesis of JTBD is…", options:["People buy products they like","People hire products to do a job in their life","People buy the cheapest option","People follow brand loyalty"], answer:1, why:"Know the job → you see the real competition and the right features. The milkshake competed with bananas and bagels, not other shakes." },
          { type:"fill", q:"JTBD statement format: “When I am [context], I want to [motivation], so that I can [______].”", answer:"outcome", accept:["outcome","expected outcome"], why:"Context + motivation + outcome. The outcome is the deeper progress the user seeks." },
          { type:"match", q:"Match the JTBD type to its driver.", pairs:[["Functional","Utility — speed, cost, accuracy"],["Emotional","How using it makes ME feel about myself"],["Social","What others think of me when I use it"]], why:"New PMs over-index on functional and ignore emotional + social — yet most buys are emotional, justified by logic." },
          { type:"trap", q:"“People don't want a drill, they want a hole.” The deeper point is…", options:["Sell drills cheaper","They don't even want the hole — they want to hang a picture and relive a memory","Holes are the real product","Drills are obsolete"], answer:1, why:"Always ask for the deeper outcome the user is chasing." },
          { type:"recall", q:"Why do sales of a kids' maths app spike every March despite parents citing 'curiosity'?", answer:"What users SAY ≠ what they DO. Exam season is the real driver; 'curiosity' is the stated reason. Triangulate words with behavioural/sales data.", why:"People buy with emotion and justify with logic." },
        ],
      },
      {
        id: "d3",
        title: "The Mom's Test",
        q: [
          { type:"mcq", q:"The Mom's Test exists because…", options:["Moms are biased experts","Humans give encouraging, positive feedback — so you must ask in ways even your mum can't lie","Surveys are illegal","Moms are the target user"], answer:1, why:"Don't ask 'is my idea good?' Put them in front of the scale and have them read the number." },
          { type:"match", q:"Match BAD question → its GOOD rewrite.", pairs:[["Would you use my fitness app?","When did you last go to the gym? How do you track fitness now?"],["Would you pay for this?","Have you paid for anything similar before? What was that like?"],["Is this a good idea?","Walk me through how you currently solve this."]], why:"Talk about their life, not your idea. Ask about past behaviour, not future intentions." },
          { type:"fill", q:"Golden rule: users are the WORST predictors of their future, but GREAT ______ of their past.", answer:"historians", accept:["historians","historian"], why:"Ask about what they've actually done, not what they think they'll do." },
          { type:"trap", q:"Henry Ford's 'faster horses' quote means…", options:["Never do user research","Research the PROBLEM space (horses are slow/messy); invent the SOLUTION with your team","Users always know best","Ignore what users say entirely"], answer:1, why:"Uncover problems through users; find solutions with your team. Ford observed the problem, then his team built the car." },
        ],
      },
      {
        id: "d4",
        title: "Personas & Journeys",
        q: [
          { type:"mcq", q:"The Meesho persona lesson was…", options:["Use stock photos","Posting the user's actual (old, low-bandwidth) phone on the wall changed decisions on image quality & performance","Hire more designers","Personas don't matter"], answer:1, why:"Bangalore devs on flagships were building for Tier-2/3 users on secondhand Xiaomis. The persona closed the empathy gap." },
          { type:"trap", q:"How many personas should you keep?", options:["As many as you find","3–5 max, with a primary persona for your highest-value user"], answer:1, why:"More than 5 dilutes focus. And never let personas die in a folder — use their names in standups and design reviews." },
          { type:"fill", q:"Intuit's programme where PMs physically watch clients use the product is called ______ Me Home.", answer:"Follow", accept:["follow","follow me home"], why:"They saw users copy-paste from Excel into QuickBooks — invisible in analytics. Led to Excel connectors." },
          { type:"recall", q:"What's the difference between a user persona and a buyer persona in B2B?", answer:"The user is the person using the product daily; the buyer is the CFO/CTO/CEO who signs the contract. In B2B you must satisfy both.", why:"Both sets of needs must be met to win the deal and retain usage." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 3
  {
    id: "strategy",
    title: "Strategy & Prioritisation",
    blurb: "Vision, OKRs, Kano, ICE, Impact×Effort.",
    color: "#E17055",
    icon: "target",
    lessons: [
      {
        id: "s1",
        title: "Vision, Strategy, OKRs",
        q: [
          { type:"match", q:"Match the concept to its definition.", pairs:[["Vision","What the PRODUCT looks like in its ultimate form"],["Mission","What the WORLD looks like when the product succeeds"],["Objective","Ambitious, inspiring qualitative goal"],["Key Result","Measurable, time-bound, specific outcome"]], why:"Netflix: vision = leading streaming service; mission = 'to entertain the world'." },
          { type:"trap", q:"Your team hits 100% of its OKRs every quarter. What does that mean?", options:["You're a high performer","Your objectives are too easy — aim to hit ~70%"], answer:1, why:"Genuinely ambitious OKRs should land around 70%. 100% means you sandbagged." },
          { type:"mcq", q:"In cascading OKRs, what cascades down a level?", options:["The objective stays identical","A higher level's Key Result becomes the next level's Objective","Nothing — each team is independent","Only the deadline"], answer:1, why:"Company KR → Sales-team Objective → its own KRs. Alignment with autonomy." },
          { type:"mcq", q:"Which is a BAD OKR?", options:["Become operationally profitable in North region. KR: revenue/order minus cost > 0; maintain 5% MoM growth","Become the best player in the world. KR: launch a new business line"], answer:1, why:"'Best player' is unmeasurable and 'launch a business line' is a wish, not a quantifiable KR." },
          { type:"fill", q:"The single root cause behind almost every INTERNAL product failure is poor ______ communication.", answer:"proactive", accept:["proactive","proactive and clear","clear"], why:"Agile, PRDs, OKRs, roadmaps are all communication tools at their core." },
        ],
      },
      {
        id: "s2",
        title: "Kano Model",
        q: [
          { type:"match", q:"Match Kano category to user reaction when ABSENT.", pairs:[["Must-have","Extremely frustrated"],["Performance","Less satisfied (linear)"],["Delighter","Indifferent — not expecting it"]], why:"Must-haves are assumed; performance is 'more is better'; delighters are pleasant surprises." },
          { type:"trap", q:"Should an MVP contain only must-have features?", options:["Yes — keep it minimal","No — if you only match competitors, users have no reason to switch (Instagram's MVP had Filters, a delighter)"], answer:1, why:"MVP = minimum features to test your riskiest assumption — NOT the simplest possible product. Switching cost is real." },
          { type:"fill", q:"Kano ______: yesterday's delighter becomes today's expectation and tomorrow's basic (e.g. live driver tracking).", answer:"drift", accept:["drift","kano drift"], why:"Expectations always escalate; never consider your product 'done'." },
          { type:"mcq", q:"Ola Play (in-cab entertainment) is a cautionary tale about…", options:["Too few features","Over-investing in delighters while losing reliability & pricing (the must-haves)","Bad marketing","Wrong target city"], answer:1, why:"A healthy roadmap balances Stability (must-haves), Growth (performance), Differentiation (delighters)." },
        ],
      },
      {
        id: "s3",
        title: "ICE & Impact×Effort",
        q: [
          { type:"match", q:"Match ICE letter to who estimates it.", pairs:[["Impact","PM — via research & data"],["Confidence","PM + team — based on evidence"],["Effort","Engineering & design"]], why:"Never give effort estimates without talking to the team building it." },
          { type:"match", q:"Match the Impact×Effort quadrant to the action.", pairs:[["High impact / Low effort","Quick wins — do first"],["High impact / High effort","Big bets — validate with an experiment"],["Low impact / Low effort","Valley of Death — feature factory trap"],["Low impact / High effort","Discard / park"]], why:"Teams chronically overestimate impact and underestimate effort." },
          { type:"trap", q:"You shipped 10 low-effort features in 6 months. Your manager asks one question. What is it?", options:["How fast did you ship?","Did any of them actually create value?"], answer:1, why:"The Valley of Death is the most dangerous quadrant for a PM's career. Be a value creator, not a builder." },
          { type:"fill", q:"Becoming emotionally attached to your own idea and overrating its impact is called ______'s bias.", answer:"innovator", accept:["innovator","innovators","innovator's"], why:"Fight it with collaboration (product trio), data, and small experiments." },
          { type:"mcq", q:"You have a High-Impact, High-Effort 'big bet' (localise site into 80+ languages). Best first move?", options:["Build it all immediately","Run an experiment: translate just sign-up/login into 3 languages, measure, then expand","Cancel it","Ask leadership to decide"], answer:1, why:"Convert big bets into small experiments to build confidence (the real meaning of MVP)." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 4
  {
    id: "prd",
    title: "PRD & Execution",
    blurb: "PRDs, Agile/Scrum, the PM-EM partnership.",
    color: "#0984E3",
    icon: "doc",
    lessons: [
      {
        id: "p1",
        title: "What a PRD Really Is",
        q: [
          { type:"trap", q:"A PRD is best described as…", options:["A document — a template you fill end to end","Proof that you did the thinking — the template writes itself once you've thought clearly"], answer:1, why:"Creating a PRD in one day usually means you skipped the thinking. As AI fills templates, the PM's value is the judgment behind it." },
          { type:"trap", q:"Is writing a PRD anti-agile?", options:["Yes — it forces waterfall","No — a lean (2–10pg), live, editable PRD evolves as you learn"], answer:1, why:"The misconception confuses what goes in a PRD with how it's maintained. It's a Google Doc, not a PDF." },
          { type:"match", q:"Match document to the question it answers.", pairs:[["BRD","Why should we invest in this?"],["PRD","What are we building to solve the problem?"],["FRD","How exactly should the system function?"]], why:"Most modern teams just use the PRD — it bridges business and engineering." },
          { type:"order", q:"Order the 6 phases of creating a great PRD.", seq:["Immerse","Frame","Explore","Align","Narrate","Evolve"], why:"The process matters more than the document. Align is the most-skipped and most failure-causing phase." },
          { type:"fill", q:"The metric formula is: Metric name + Current baseline + Target + ______.", answer:"timeframe", accept:["timeframe","time frame","time-frame"], why:"e.g. 'Reduce checkout abandonment from 23% to 15% in 90 days' — not 'improve UX'." },
        ],
      },
      {
        id: "p2",
        title: "Problem Statements & Sins",
        q: [
          { type:"mcq", q:"Which is a GOOD problem statement?", options:["We need to add a search feature to the dashboard","40% of users abandon onboarding and can't find value in 3 minutes","We should redesign the homepage","Let's improve the checkout flow"], answer:1, why:"If your problem statement contains a feature name, you've already jumped to a solution. The good one has data + behaviour + pain." },
          { type:"trap", q:"'Our NPS is 23 and declining, so we should redesign the UI.' What's wrong?", options:["Nothing — it has a metric","It jumps to a solution (redesign UI). The real question is WHY NPS is 23"], answer:1, why:"Good metric, but 'redesign UI' is an unexamined solution assumption. Sin #1: solution disguised as problem." },
          { type:"match", q:"Match the deadly PRD sin to its fix.", pairs:[["Vague metrics","Use Metric + Baseline + Target + Timeframe"],["Happy path only","For every flow ask: what could go wrong?"],["Missing non-goals","Add a Non-Goals section — state what's out of scope"],["Over-specifying","Define constraints & goals; let engineers shape the how"]], why:"7 deadly sins kill products; each maps to a discipline." },
          { type:"fill", q:"Explicitly stating what a feature will NOT do (yet) is called defining ______.", answer:"non-goals", accept:["non-goals","non goals","nongoals"], why:"Scope clarity is a gift to your engineering team — it prevents scope creep." },
          { type:"recall", q:"Why write the PRD to 'inspire' not just 'instruct' (the Like button example)?", answer:"Don't define the Like as 'a click that increments a DB count.' Tell the story: many people have no place to express themselves; a like is how they feel heard. Inspired engineers produce better work.", why:"Great PMs are leaders who motivate, not taskmasters." },
        ],
      },
      {
        id: "p3",
        title: "Agile, Scrum & the PM-EM line",
        q: [
          { type:"mcq", q:"Simplest definition of Agile?", options:["No planning at all","Very quick, repeated cycles of waterfall (2–4 weeks each)","Only for startups","Documentation-first"], answer:1, why:"Same process (define→build→release) but weeks not months, so you learn fast. Learning IS course correction." },
          { type:"match", q:"Match the Agile value (we value LEFT over right).", pairs:[["Working software","Comprehensive documentation"],["Customer collaboration","Contract negotiation"],["Responding to change","Following a plan"],["Individuals & interactions","Processes & tools"]], why:"The right-hand items still have value — prioritise the left when they conflict." },
          { type:"order", q:"Order the Scrum work hierarchy from broadest to narrowest.", seq:["Epic","Product Backlog","Sprint Backlog","User Story"], why:"Epic = huge body of work; backlog = all future work; sprint backlog = this cycle; story = one user-facing slice." },
          { type:"match", q:"Match each 'who owns what' to the right role.", pairs:[["WHY are we doing this?","Product Manager"],["WHAT are we building?","PM + Design Manager"],["HOW will we build it?","Engineering Manager"],["WHEN will it ship?","Engineering Manager"]], why:"Never commit to a timeline without the EM. If they say 6 months, negotiate scope — don't override the estimate." },
          { type:"trap", q:"Sales brings you a feature request from a big client. First move?", options:["Check if engineering has bandwidth, then say yes/no","Convert the feature into a problem statement, validate it, weigh it against the roadmap and company strategy"], answer:1, why:"A feature is a solution. Find the problem underneath; your answer depends on whether you're Oracle (customise), Slack (standardise), or SAP (partner-config)." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 5
  {
    id: "ai-foundations",
    title: "AI Foundations",
    blurb: "How LLMs work: tokens, embeddings, attention, hallucination.",
    color: "#A29BFE",
    icon: "brain",
    lessons: [
      {
        id: "a1",
        title: "How LLMs Work",
        q: [
          { type:"fill", q:"At its core, an LLM is just a next-______ predictor.", answer:"token", accept:["token"], why:"Everything else emerges from predicting the next token at massive scale." },
          { type:"trap", q:"Is 1 token equal to 1 word?", options:["Yes, always","No — ~0.75 words in English; 'impossible' is 1 token but 'imperfect' is 2"], answer:1, why:"Tokens are sub-word units by frequency (BPE). Hindi uses more tokens/word, making Indian-language products costlier." },
          { type:"mcq", q:"Tokens are directly proportional to which three things?", options:["Accuracy, trust, safety","Cost, latency, memory (context window)","Speed, design, virality","Users, revenue, churn"], answer:1, why:"Every product decision has a token implication — longer responses cost more, take longer, and eat the context window." },
          { type:"mcq", q:"What does the King − Man + Woman ≈ Queen example demonstrate?", options:["LLMs do algebra","Embeddings encode meaning as positions in vector space, so relationships become measurable","Models are programmed with rules","Random chance"], answer:1, why:"Similar meanings sit nearby in vector space; that's why semantic search works." },
          { type:"mcq", q:"The 2017 'Attention Is All You Need' breakthrough lets a model…", options:["Process words one at a time","Weigh which words are most relevant to each other, in parallel (Transformers)","Memorise the internet","Avoid GPUs"], answer:1, why:"In 'I sat on the bank of the river', attention links 'bank' to 'river' to disambiguate meaning." },
        ],
      },
      {
        id: "a2",
        title: "Hallucination & Post-training",
        q: [
          { type:"trap", q:"Hallucination is best understood as…", options:["A bug to be fully fixed","A characteristic of next-token prediction — reducible (RAG, grounding) but never fully eliminated"], answer:1, why:"The model generates statistically plausible text, not verified facts. The Bard JWST error cost Google $100B in a day." },
          { type:"trap", q:"“Post-training makes the model more factually correct.” True?", options:["Yes","No — post-training (RLHF, safety) changes BEHAVIOUR, not correctness"], answer:1, why:"Post-training = parenting (helpful, safe, polite). It doesn't add facts. Pre-training is the DNA." },
          { type:"match", q:"Match the LLM memory type to its trait.", pairs:[["Training memory","Old, general, compressed — like school knowledge"],["Context memory","Fresh, specific, highly reliable — what's in the prompt now"]], why:"Context memory beats training memory for reliability — this is the fundamental reason RAG works." },
          { type:"mcq", q:"A teammate says 'Let's fine-tune GPT-4 on our company docs.' Best response?", options:["Great, start training","In 99% of cases use RAG — it injects your data at query time without retraining","Fine-tune a bigger model","Do nothing"], answer:1, why:"Fine-tuning changes behaviour, not knowledge. Most 'we need to fine-tune' really means 'the model needs our data' = RAG." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 6
  {
    id: "ai-building",
    title: "RAG & Fine-Tuning",
    blurb: "Retrieval, the 2×2 decision, chunking, failure modes.",
    color: "#00CEC9",
    icon: "layers",
    lessons: [
      {
        id: "r1",
        title: "RAG Pipeline",
        q: [
          { type:"order", q:"Order the RAG pipeline (query side).", seq:["Embed the user query","Semantic search the vector DB","Retrieve Top-K chunks","Augment the prompt with chunks","LLM generates a grounded answer"], why:"Indexing (chunk→embed→store) happens once; this querying loop runs every request." },
          { type:"mcq", q:"When should you reach for RAG?", options:["For every prompt","When the knowledge base is large and/or updates frequently and can't fit/shouldn't bloat the context","Only for images","When you want to change the model's tone"], answer:1, why:"Even with million-token windows, stuffing context raises hallucinations and cost. RAG keeps it focused." },
          { type:"match", q:"Match dense vs sparse vectors to their strength.", pairs:[["Dense (semantic)","Understands meaning — 'refund' matches 'return policy'"],["Sparse (keyword)","Exact matches — 'Invoice #INV-2024-0891'"],["Hybrid search","Combines both for real queries"]], why:"If users search by exact IDs/codes, dense alone fails — you need sparse too." },
          { type:"recall", q:"Your RAG bot keeps quoting last month's refund policy (now changed). Which failure point, and the fix?", answer:"Failure Point #1: Data Quality. Retrieval works fine — the knowledge base is stale. The fix is operational: update the source + a data-freshness SLA, not a bigger model.", why:"Walk the 6 failure points in order; the fix is almost never 'upgrade the model'." },
        ],
      },
      {
        id: "r2",
        title: "RAG vs Fine-Tuning",
        q: [
          { type:"match", q:"Map the 2×2 (knowledge × behaviour) to the right approach.", pairs:[["Static knowledge + standard behaviour","Prompt engineering"],["Dynamic knowledge + standard behaviour","RAG"],["Static knowledge + custom behaviour","Fine-tuning"],["Dynamic knowledge + custom behaviour","RAG + Fine-tuning"]], why:"RAG = what the model KNOWS. Fine-tuning = how it BEHAVES. They're complementary, not competing." },
          { type:"trap", q:"What's the right order to try techniques?", options:["Fine-tune first for quality","Always start with prompt engineering; escalate to RAG, then fine-tuning only if needed"], answer:1, why:"Jumping straight to fine-tuning shows you don't understand cost/benefit. 'Don't use a sword where a needle works.'" },
          { type:"fill", q:"Using a big model to generate training data to teach a smaller, cheaper model is knowledge ______.", answer:"distillation", accept:["distillation"], why:"The PhD writes 10,000 perfect answers; the 10th-grader studies them and nearly matches on that task — at a fraction of cost." },
          { type:"mcq", q:"An SLM (small language model) is the right call when you need…", options:["Maximum general intelligence","Speed, low cost, or on-device privacy for a narrow task","To impress investors","The newest frontier model"], answer:1, why:"Superman vs the specialist doctor: most tasks need a fine-tuned specialist, not general superpowers." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 7
  {
    id: "agents",
    title: "AI Agents",
    blurb: "Agency, OWO, multi-agent Deep Research, autonomy.",
    color: "#FD79A8",
    icon: "robot",
    lessons: [
      {
        id: "g1",
        title: "What Makes an Agent",
        q: [
          { type:"match", q:"Match the 3 components of an AI agent.", pairs:[["Intelligence (brain)","The LLM — reasoning & decisions"],["Action (tools)","APIs, email, Slack, Sheets"],["Orchestration","n8n / LangGraph — manages the loop"]], why:"Terminator analogy: brain = LLM, hands/guns = tools, environment = orchestration." },
          { type:"trap", q:"What separates a true agent from an AI workflow?", options:["Agents use more tools","AGENCY — the LLM decides what to do next, rather than following predefined steps"], answer:1, why:"A workflow has fixed steps; an agent makes its own decisions. But don't over-engineer working workflows into agents." },
          { type:"order", q:"Order the OWO framework a PM uses before building an agent.", seq:["Opportunity","Workflow","Outcome"], why:"Opportunity (what problem, why now) → Workflow (old vs new) → Outcome (metrics that improve)." },
          { type:"mcq", q:"~95% of AI initiatives fail. The #1 reason is…", options:["Weak models","The Learning Gap: not understanding the real problem + the system not evolving over time","Too expensive","No GPUs"], answer:1, why:"Fix it with deep discovery + systems that continuously learn." },
        ],
      },
      {
        id: "g2",
        title: "Multi-Agent & Autonomy",
        q: [
          { type:"mcq", q:"In Deep Research, why do sub-agents have their OWN context windows?", options:["To use more memory","So raw web research stays isolated and never pollutes the master's context — only outputs pass back","For security only","To run slower"], answer:1, why:"Master = CEO who only cares about outputs; sub-agents = employees doing the messy ground work in parallel." },
          { type:"match", q:"Match autonomy level to its example.", pairs:[["AI suggests","ChatGPT, Perplexity"],["AI co-pilot (human reviews)","Cursor, Copilot, Harvey"],["AI acts autonomously (guardrails)","Lovable, Claude Code, Devin"]], why:"Higher stakes + lower reversibility = more human-in-the-loop." },
          { type:"trap", q:"Moving from low to high autonomy means…", options:["Removing all safety","Shifting from CONTROL (micromanage every step) to GUARDRAILS (set boundaries, let it act)","No difference","Always full automation"], answer:1, why:"Boss/employee analogy: a great manager sets the goal and the don'ts, then lets the agent figure out the how." },
          { type:"mcq", q:"You're building an agent that emails refunds to customers. Right design?", options:["Full autonomy — send instantly","Human-in-the-loop: agent drafts, a human approves before send (high stakes, irreversible)","No agent at all","Let users self-approve"], answer:1, why:"The higher the stakes and lower the reversibility, the more human review you need." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 8
  {
    id: "ai-pm-craft",
    title: "AI PM Craft",
    blurb: "Prompting, evals, the Octopus, AI-first UX.",
    color: "#FAB1A0",
    icon: "spark",
    lessons: [
      {
        id: "c1",
        title: "Prompting & Context",
        q: [
          { type:"order", q:"Order the RCTFCE prompt formula components.", seq:["Role","Context","Task","Format","Constraints","Examples"], why:"Minimum recommended: Role + Task + Format. Each added component improves output." },
          { type:"trap", q:"More context in the window = better answers?", options:["Yes — fill the window","No — accuracy degrades ('lost in the middle'); put the RIGHT info in, not ALL info"], answer:1, why:"Context engineering is resource allocation — a focused 2k-token context often beats a 50k one." },
          { type:"mcq", q:"What does 'Give AI an out' mean?", options:["Let it refuse work","Add: 'If you don't have enough info, say so and ask a clarifying question' — reduces hallucination","Lower the temperature","Use a bigger model"], answer:1, why:"LLMs are compulsive completers; permission to say 'I don't know' cuts forced hallucinations." },
          { type:"mcq", q:"Temperature near 0 is best for…", options:["Brainstorming taglines","Factual/consistent tasks like a medical or finance bot","Creative fiction","Random sampling"], answer:1, why:"Low temp = deterministic & focused; high temp = creative & varied. It's a product decision." },
          { type:"recall", q:"What is 'red teaming your own output' and why do it?", answer:"After getting a result, tell the AI to be a harsh critic and name 3 assumptions that could be wrong. LLMs default to agreement/flattery, so you must explicitly prompt for criticism to surface weaknesses.", why:"This single habit can lift output quality 30–40%." },
        ],
      },
      {
        id: "c2",
        title: "Evals & the Six Knobs",
        q: [
          { type:"trap", q:"Is your golden dataset the same as training data?", options:["Yes","No — training data BUILDS the model; the golden dataset TESTS the product. They never mix"], answer:1, why:"Fine-tuning on your golden dataset = teaching the student the exam answers; scores become meaningless." },
          { type:"order", q:"Order the six tuning knobs from cheapest/fastest to most expensive.", seq:["System prompt","Context / RAG","Tools","Model","Orchestration","Fine-tuning"], why:"~80% of quality issues are fixed at knobs 1–2. Fine-tuning is the LAST resort, not the first." },
          { type:"mcq", q:"Offline evals score 95% but the thumbs-down rate is climbing. Likely cause?", options:["The model got dumber overnight","Data drift — real queries diverged from your golden dataset's coverage","Users are wrong","Latency"], answer:1, why:"Continuously sample production queries and add new clusters to the golden dataset; offline evals only test what they cover." },
          { type:"mcq", q:"Best use of LLM-as-Judge?", options:["Replace all humans","Score subjective quality (tone, helpfulness, groundedness) at scale, calibrated against human review","Write the product","Set pricing"], answer:1, why:"Hybrid: code checks on 100%, LLM-judge flags issues, humans review the flagged sample." },
        ],
      },
      {
        id: "c3",
        title: "Octopus & AI-First UX",
        q: [
          { type:"mcq", q:"In the Intelligence–Latency–Cost triangle, you can optimise…", options:["All three at once","At most two — the third is the trade-off","None of them","Only cost"], answer:1, why:"High intelligence + low latency = expensive; low latency + low cost = less intelligent. Model choice is a product decision." },
          { type:"match", q:"Match the AI-first UX pattern to what it solves.", pairs:[["Feedback loop (👍/👎)","Fuel for the quality-improvement loop"],["Avoid the blank slate","Suggest prompts so new users aren't paralysed"],["Recovery / rollback","Undo wrong AI actions — essential, not optional"],["Explainability","Show reasoning/sources to build trust"]], why:"In AI, UX is the moat — Cursor is VS Code + existing LLM APIs + a brilliant experience." },
          { type:"trap", q:"What's the strongest AI competitive moat?", options:["Using the newest model","A data flywheel — every interaction improves the product, which attracts more users","A bigger marketing budget","More features"], answer:1, why:"Anyone can call the same API. Proprietary context, workflow integration, and a feedback flywheel are what defend you." },
          { type:"recall", q:"What is 'inherent virality' and give one example?", answer:"When normal use by one person automatically exposes others — e.g. a meeting-summary tool emails the AI summary to all 9 other attendees, who discover it with zero marketing spend. Build it into the architecture, not as a 'Share' button.", why:"It dramatically reduces customer acquisition cost." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 9
  {
    id: "build-career",
    title: "Build & Career",
    blurb: "Vibe coding, prototyping, resume & proof of work.",
    color: "#FFEAA7",
    icon: "rocket",
    lessons: [
      {
        id: "b1",
        title: "Vibe Coding & Prototyping",
        q: [
          { type:"trap", q:"What determines prototype quality?", options:["The tool you pick (Lovable vs Bolt vs v0)","Your prompt — driven by research depth and product sense; the tools are converging"], answer:1, why:"Anyone can type 'make a book summariser'. Knowing WHAT to build, WHY, and for WHOM is the differentiator." },
          { type:"order", q:"Order the right approach to prototyping.", seq:["Do discovery first","Write a PRD from research","Upload PRD to a vibe-coding tool","Chat iteratively to refine","Show real users — V2 is your portfolio piece"], why:"Never skip discovery; the tool can't compensate for shallow research. V2 (post-feedback) is what belongs in your portfolio." },
          { type:"fill", q:"The mindset rule for iterating on prompts: ABI — Always Be ______.", answer:"iterating", accept:["iterating"], why:"Your first prompt is never your last. There's no formula — only iteration." },
          { type:"recall", q:"Explain the torch-in-the-forest analogy for decision paralysis.", answer:"Walking a dark forest with a torch, you see only 2–3 metres — enough to take the next step. You don't need the whole path visible to move. Momentum brings clarity, not the other way round. Pick a tool and start.", why:"Action > information once you know enough to begin." },
        ],
      },
      {
        id: "b2",
        title: "Resume & Proof of Work",
        q: [
          { type:"match", q:"Match the WHAT/HOW/IMPACT formula for a resume bullet.", pairs:[["WHAT","The task — what you built/led/delivered"],["HOW","Strategy, frameworks, tools, stakeholders — inject PM keywords here"],["IMPACT","Numbers & KPIs — outward or inward"]], why:"At least 40–50% of bullets must contain numbers. 'Cannot be managed if it cannot be measured.'" },
          { type:"trap", q:"Will GPT-generated text hurt your ATS score?", options:["Yes — never use GPT","Over-stuffing buzzwords gets flagged; use AI as a collaborator and humanise every line, not as a ghostwriter"], answer:1, why:"There's no universal ATS standard. The real filter: does your resume add value to a human reader?" },
          { type:"mcq", q:"The strongest proof of work for a career-switcher is…", options:["A long list of courses","2–3 deep, research-based case studies (e.g. a 30-day plan sent directly to a target company)","10 shallow case studies","A certificate badge"], answer:1, why:"Portfolios are double-edged — shallow case studies hurt you. Depth shows you can think like a PM before the title." },
          { type:"fill", q:"Pick ONE variable to change at a time — role, domain, or industry — and keep the rest overlapping. That overlap is your ______.", answer:"anchor", accept:["anchor"], why:"Transferable skills, domain expertise, or product references — find yours." },
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
