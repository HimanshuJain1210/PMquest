// ============================================================
// PM Quest — Question Bank v3 (arc-structured)
// Each lesson moves through distinct steps: concept → apply →
// edge case → diagnose → connect. No repetition. Strong distractors.
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
          { type:"mcq", q:"A team ships 12 features in Q3. Retention, revenue, engagement: all flat. Most accurate read?", options:["Good velocity — keep the pace","Output without outcome — motion isn't impact","Need a few more quarters to judge","The metrics are probably wrong"], answer:1, why:"Output = built; outcome = a metric moved. A and C rationalise the trap; D dodges it. Flat metrics after heavy shipping is the signal, not noise." },
          { type:"mcq", q:"Two roadmap items, one quarter. X: redesign settings (team's been asking). Y: fix checkout where 30% drop off. Pick.", options:["X — internal happiness matters","Y — it's tied to a metric that's clearly leaking value","Both, split the team","Whichever ships faster"], answer:1, why:"Outcome-thinking follows the bleeding metric. A optimises feelings; C and D optimise activity. A 30% drop is quantified value left on the table." },
          { type:"mcq", q:"A feature ships and moves no short-term metric — but it's table-stakes security compliance. Worth building?", options:["No — it moved no metric","Yes — outcome includes risk avoided and trust kept, not just growth","Only if a competitor has it","No, unless legal forced it"], answer:1, why:"Outcome ≠ only growth numbers. Avoided churn, risk and trust are real outcomes even when no dashboard spikes. A misreads outcome as growth-only." },
          { type:"trap", q:"A PM reports '8 features shipped, on time.' What thinking trap is hiding here?", options:["This is solid delivery — no trap","Feature-factory — counting output (shipping) as if it were outcome"], answer:1, why:"Counting shipped features as success is the classic output-as-outcome error. The unasked question: did any move a user or business metric?" },
          { type:"recall", q:"In one line, how does 'outcome over output' connect to the one law of PM?", answer:"The law — solve user problems to achieve business outcomes — IS outcome-thinking; output is just the activity in between.", why:"Outcome-thinking is the law in practice. Output is the work; outcome is the point." },
        ],
      },
      {
        id: "f2", title: "The PM Lifecycle",
        q: [
          { type:"order", q:"Order the PM lifecycle phases.", seq:["Discovery","Delivery","Distribution"], why:"Discovery (roadmap) → Delivery (shipped) → Distribution (GTM) → loops back to Discovery. You're never 'done'." },
          { type:"mcq", q:"You skipped Discovery and jumped to building because 'leadership already decided.' Most likely outcome?", options:["Faster shipping, no downside","High risk of building the wrong thing — the expensive failure mode","Better team morale","Lower engineering cost"], answer:1, why:"Discovery is where you de-risk WHAT to build. Skipping it is how teams ship polished products nobody needs." },
          { type:"mcq", q:"Your feature launched and adoption is low. Which phase failed — and where do you look first?", options:["Delivery — the code is buggy","Often Distribution — no GTM/adoption plan; but check Discovery too (was the need real?)","Discovery only","None — low adoption is normal"], answer:1, why:"A good product with no distribution dies quietly. But always re-ask Discovery: did the need actually exist? Low adoption has two root causes." },
          { type:"trap", q:"'Once we ship, the PM's job on this feature is basically done.' True?", options:["True — shipping is the finish line","False — Distribution + learning feed back into Discovery; the loop continues"], answer:1, why:"Shipping is the middle, not the end. Data from launch starts the next Discovery cycle. The lifecycle is a loop." },
          { type:"recall", q:"Why is the lifecycle drawn as a loop, not a line?", answer:"Each launch generates data and feedback that feeds the next Discovery cycle — you continuously learn and iterate, never finishing.", why:"Linear thinking ('build it and move on') is how products stagnate." },
        ],
      },
      {
        id: "f3", title: "Artifacts & Roles",
        q: [
          { type:"match", q:"Match the artifact to its audience.", pairs:[["Roadmap","Leaders & stakeholders"],["PRD","Design, dev, QA"],["Backlog","Engineering tasks"],["Sprint board","The team this cycle"]], why:"Each artifact lives at a different altitude of detail and audience." },
          { type:"mcq", q:"The CEO asks 'what's coming this year?' You hand them the 200-item backlog. What went wrong?", options:["Nothing — full transparency","Wrong altitude — leaders need the NOW/NEXT/LATER roadmap, not task-level detail","Should've shown the sprint board","Should've shown the PRD"], answer:1, why:"Matching artifact to audience is the skill. A backlog buries strategy in noise; the roadmap communicates direction." },
          { type:"mcq", q:"A stakeholder pitches a shiny feature. What's your strongest default and why?", options:["Yes — keep momentum and goodwill","No, until the problem and impact are proven — every yes has an opportunity cost","Maybe — defer to leadership","Yes if engineering has capacity"], answer:1, why:"Default NO protects focus. Capacity (D) isn't the test — opportunity cost is. Every hour on a weak idea is stolen from a strong one." },
          { type:"trap", q:"'PM, PO, Project Manager — basically the same role.' Right?", options:["Right — interchangeable titles","Wrong — PM owns discovery/why, PO owns delivery/backlog, Project Mgr owns execution/timing"], answer:1, why:"They're loosely defined in practice, but the focus differs sharply. Always read the actual JD." },
          { type:"recall", q:"NoBroker put listings online to kill brokers — but users still used brokers. What's the lesson?", answer:"Listen to what users DO, not just say. The real job included verification, agreements and keys — not just discovery. Find products for your customers.", why:"Their initial hypothesis was wrong; observing real behaviour unlocked growth." },
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
          { type:"mcq", q:"Asked 'improve Zoom?', a candidate opens with 'add transcription and reactions.' Biggest problem?", options:["Features are too small","Jumped to solutions before context, users, or problem","Features are unrealistic","Didn't mention revenue"], answer:1, why:"The rejection isn't the feature choice — it's skipping the whole problem space. Establish context → segment → problem → THEN solutions." },
          { type:"order", q:"Order the 6-step product-sense framework.", seq:["Business context & goals","User segments","Prioritise a segment","Problems & opportunities","Solutions & metrics","Recommendations & trade-offs"], why:"Trade-offs happen at every step. It's iterative — you can revisit earlier choices." },
          { type:"mcq", q:"You must improve a maps app. You pick 'travellers' over 'daily commuters.' Strongest justification?", options:["Travellers are wealthier","Travellers have more unmet problems + higher intent in an unfamiliar city","Commuters are boring","More travellers exist"], answer:1, why:"Segment choice is justified by unmet need and opportunity, not vibes (C) or unproven size (D). Commuter needs are largely solved already." },
          { type:"trap", q:"You segment users as 18–25, 26–40, 41+. Sound approach?", options:["Yes — clean demographic buckets","No — segment by behaviour; a 50-yr-old power user acts like a 20-yr-old power user"], answer:1, why:"Behaviour predicts what people do; age usually doesn't. Demographic-only segmentation hides the real patterns." },
          { type:"recall", q:"Descript beat Premiere for creators. Name the product-sense move in one line.", answer:"Identify the right user (creators, not pros), the root problem (timeline complexity), then a creative solution (edit a transcript like a Google Doc).", why:"Right user + root problem + creative solution — the essence of product sense." },
        ],
      },
      {
        id: "d2", title: "Jobs To Be Done",
        q: [
          { type:"mcq", q:"Milkshakes sell most at 7am to lone drivers who leave immediately. The real 'job'?", options:["A tasty treat","A filling, one-handed companion for a boring commute","A cheap breakfast","A kids' reward"], answer:1, why:"Know the job and you see the real competition — bananas and bagels, not other shakes. Context defines what gets hired." },
          { type:"mcq", q:"Knowing the milkshake's real job, what would you actually improve?", options:["Make it sweeter","Make it thicker (lasts the commute) + a faster grab-and-go lane","Add a kids' size","Lower the price"], answer:1, why:"Once the job is 'survive a boring commute one-handed,' the improvements follow: thicker = lasts longer, faster lane = fits the rushed context. Sweetness misses the job." },
          { type:"match", q:"Match the JTBD type to its driver.", pairs:[["Functional","Utility — speed, cost, accuracy"],["Emotional","How it makes ME feel"],["Social","What others think of me"]], why:"New PMs over-index on functional; most purchases are emotional, justified later with logic." },
          { type:"trap", q:"Parents say they buy a maths app for 'curiosity,' but sales spike every March. What do you trust?", options:["Their stated reason — curiosity","The behaviour — exam-season fear is the real driver"], answer:1, why:"What users SAY ≠ what they DO. Triangulate interviews with behavioural/sales data; the spike reveals the true job." },
          { type:"recall", q:"'People want a drill.' Push the JTBD two levels deeper.", answer:"They don't want a drill — they want a hole; and not even the hole — they want a hung picture and the feeling/memory it brings.", why:"Always chase the outcome beneath the outcome." },
        ],
      },
      {
        id: "d3", title: "The Mom's Test",
        q: [
          { type:"mcq", q:"You ask 'would you use my fitness app?' and they say yes. Why is that data nearly worthless?", options:["Sample too small","People give encouraging answers about hypothetical futures","They're not your user","They lied on purpose"], answer:1, why:"Opinions about the future are flattery-prone. Ask about concrete past behaviour instead." },
          { type:"match", q:"Match the BAD question to its GOOD rewrite.", pairs:[["Would you pay for this?","Have you paid for anything similar before?"],["Is this a good idea?","Walk me through how you solve this today"],["Would you use an AI tool?","Tell me about the last time you tried to automate this"]], why:"Talk about their life, not your idea. Past facts beat future opinions." },
          { type:"mcq", q:"In an interview the user keeps praising your idea. What should you actually do?", options:["Feel validated, wrap up","Redirect to specifics of their past behaviour — praise is the danger sign","Pitch harder","Ask them to rate it 1-10"], answer:1, why:"Compliments are the trap, not the goal. A good interview has the user talking about their real life, not rating your concept." },
          { type:"trap", q:"Ford: 'they'd have asked for faster horses.' Does this mean ignore users?", options:["Yes — just invent, skip research","No — research the PROBLEM (slow, costly horses); design the SOLUTION with your team"], answer:1, why:"Uncover problems through users; invent solutions with your team. Ford observed the pain, then built the car." },
          { type:"recall", q:"State the golden rule of the Mom's Test in one line.", answer:"Users are the worst predictors of their future, but great historians of their past — so ask what they've actually done.", why:"Anchor every question in real past behaviour." },
        ],
      },
      {
        id: "d4", title: "Personas & Journeys",
        q: [
          { type:"mcq", q:"Meesho's Bangalore devs built a heavy app for Tier-2/3 users on cheap phones. What fixed it fastest?", options:["Hiring more designers","Putting the user's actual low-end phone on the wall as a persona","Running more A/B tests","Adding servers"], answer:1, why:"The persona made the empathy gap physical — devs on flagships finally saw the real constraint and changed image/perf decisions." },
          { type:"mcq", q:"Your team wrote 9 detailed personas. What's the risk, and the fix?", options:["No risk — more is better","Diluted focus — cut to 3-5 with one primary persona","Too few — write more","Personas don't matter"], answer:1, why:"Beyond 3-5, focus dissolves. And a persona that lives in a folder is useless — use their names in standups and reviews." },
          { type:"mcq", q:"In B2B, you nailed the daily user's needs but lost the deal. Likely miss?", options:["Bad pricing only","Ignored the BUYER persona (CFO/CTO who signs) — both must be satisfied","User persona was wrong","Too few features"], answer:1, why:"B2B needs user AND buyer personas. Delight the user, but the buyer signs the contract — win both." },
          { type:"trap", q:"Intuit watched users copy-paste from Excel into QuickBooks. Why did analytics miss this?", options:["Analytics is unreliable","Behaviour outside the product is invisible to in-app data — only observation caught it","Users hid it","It wasn't important"], answer:1, why:"'Follow Me Home' observation revealed friction dashboards couldn't see, leading to Excel connectors. Some insights only exist in behaviour." },
          { type:"recall", q:"What does a journey map add beyond a persona?", answer:"It maps the steps, thoughts, feelings, pain points and opportunities across a flow — turning who the user is into where to improve.", why:"Persona = who; journey = where the value and friction are." },
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
        id: "s1", title: "Vision, Mission, OKRs",
        q: [
          { type:"match", q:"Match each to its meaning.", pairs:[["Vision","The product in its ultimate form"],["Mission","The world when the product wins"],["Objective","Ambitious qualitative goal"],["Key Result","Measurable, time-bound outcome"]], why:"Netflix: vision = lead streaming; mission = entertain the world." },
          { type:"mcq", q:"You're handed: 'O: delight users. KR: improve the experience.' What's broken?", options:["Nothing — it's aspirational","The KR isn't measurable or time-bound — it's a wish, not a result","The objective is too bold","Too many KRs"], answer:1, why:"KRs must be quantified with a baseline, target and timeframe. 'Improve the experience' can't be scored." },
          { type:"mcq", q:"Your team hits 100% of OKRs every quarter. A good sign?", options:["Yes — flawless execution","No — objectives are too easy; truly ambitious OKRs land near 70%","Yes — promote everyone","Means the metrics are wrong"], answer:1, why:"Consistent 100% signals sandbagging. Stretch goals should make ~70% a strong result." },
          { type:"trap", q:"A junior PM sets KRs that just restate the company's existing targets word-for-word. Problem?", options:["Good — perfect alignment","They missed cascading — a level's KR becomes the next level's Objective, with its OWN new KRs"], answer:1, why:"Cascading preserves alignment WITH autonomy — each level sets how, not just copies what." },
          { type:"recall", q:"Why is poor communication blamed for most INTERNAL product failures?", answer:"Agile, PRDs, OKRs and roadmaps are all communication tools; when teams misalign, estimate badly, or skip feedback, the root is people not talking clearly and proactively.", why:"Most internal failure traces to communication, not talent." },
        ],
      },
      {
        id: "s2", title: "Kano Model",
        q: [
          { type:"match", q:"Match Kano category to the user's reaction when it's ABSENT.", pairs:[["Must-have","Furious"],["Performance","Less satisfied (linear)"],["Delighter","Indifferent — didn't expect it"]], why:"Must-haves are assumed; performance is 'more is better'; delighters are pleasant surprises." },
          { type:"mcq", q:"For your MVP you ship only the must-haves competitors already have. Why might that flop?", options:["MVPs should be minimal","With no delighter, users have no reason to switch — Instagram's MVP shipped Filters","Must-haves are enough","Too risky to add more"], answer:1, why:"MVP = minimum to test your riskiest assumption, NOT the simplest product. Switching cost is real; give a reason to move." },
          { type:"trap", q:"Live driver-tracking thrilled users in 2018. Treat it as a delighter forever?", options:["Yes — it was a delighter","No — Kano drift: today it's an expectation, tomorrow a basic"], answer:1, why:"Delighters decay into expectations and then must-haves. Never call your product done; expectations escalate." },
          { type:"mcq", q:"Ola Play poured effort into in-cab entertainment and slipped on reliability + price. The lesson?", options:["Entertainment was wrong","Don't over-invest in delighters while the must-haves crumble","Needed more delighters","Pricing is irrelevant"], answer:1, why:"A healthy roadmap balances stability (must-haves), growth (performance) and differentiation (delighters). Delighters on a broken base lose." },
          { type:"recall", q:"How would you decide whether a feature is a must-have, performance, or delighter?", answer:"Through user research, competitive analysis and observation — categories are defined from the user's perspective, not by guessing internally.", why:"Empathy and evidence are the inputs; there's no formula." },
        ],
      },
      {
        id: "s3", title: "ICE & Impact×Effort",
        q: [
          { type:"match", q:"Match ICE letter to who estimates it.", pairs:[["Impact","PM — research & data"],["Confidence","PM + team — evidence"],["Effort","Engineering & design"]], why:"Never estimate effort without the team that will build it." },
          { type:"match", q:"Match the Impact×Effort quadrant to its action.", pairs:[["High impact / low effort","Quick win — do first"],["High impact / high effort","Big bet — experiment first"],["Low impact / low effort","Valley of Death"],["Low impact / high effort","Discard / park"]], why:"Teams chronically overrate impact and underrate effort — score honestly." },
          { type:"mcq", q:"You proudly show 10 low-effort features shipped in 6 months. Your manager's one killer question?", options:["How did you ship so fast?","Did any of them create value?","Which was hardest?","Can you do 20 next?"], answer:1, why:"That's the Valley of Death — busy, cheap, and impact-free. Shipping speed isn't PM quality; value is." },
          { type:"mcq", q:"You have a high-impact, high-effort bet: localise the site into 80 languages. Smartest first move?", options:["Build all 80","Translate sign-up+login into 3 languages, measure, then expand","Cancel it — too big","Let leadership decide"], answer:1, why:"Turn big bets into cheap experiments to build confidence — that's the real meaning of MVP." },
          { type:"trap", q:"Every idea you personally pitch scores 'high impact.' Statistically suspicious?", options:["No — you have great instincts","Yes — innovator's bias; you overrate your own ideas. Bring the trio + data"], answer:1, why:"Emotional attachment inflates your impact scores. Fight it with collaboration, data and experiments." },
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
          { type:"trap", q:"A new PM finishes a polished PRD in a day and feels productive. Red flag?", options:["No — speed is good","Yes — a one-day PRD usually means the thinking was skipped"], answer:1, why:"A PRD is proof you did the thinking. The template writes itself once the thinking is clear; rushing it skips the point." },
          { type:"order", q:"Order the 6 phases of creating a great PRD.", seq:["Immerse","Frame","Explore","Align","Narrate","Evolve"], why:"Align is the most-skipped and most failure-causing phase — get sign-off on the problem before solutions." },
          { type:"mcq", q:"Eng says 'a PRD is anti-agile — it forces waterfall.' Your best response?", options:["They're right, drop the PRD","A lean, live, editable PRD evolves as you learn — the myth confuses content with how it's maintained","Make it longer to be safe","Only startups skip PRDs"], answer:1, why:"It's a Google Doc, not a PDF. The PRD captures minimum clarity and updates continuously — fully agile." },
          { type:"mcq", q:"Which success metric is actually usable?", options:["Improve user experience","Cut checkout abandonment from 23% to 15% in 90 days","Increase engagement","Make users happier"], answer:1, why:"Metric formula: name + baseline + target + timeframe. The rest are unmeasurable wishes." },
          { type:"recall", q:"Why is 'the PRD is never done' a feature, not a failure?", answer:"Products are alive; as you learn from users the doc updates. Treating it as a living Google Doc (not a finished PDF) is the agile process working.", why:"Resist innovator's bias — updates are learning, not failure." },
        ],
      },
      {
        id: "p2", title: "Problems & Deadly Sins",
        q: [
          { type:"mcq", q:"Which is a real problem statement, not a solution in disguise?", options:["Add a search bar to the dashboard","40% abandon onboarding, can't find value in 3 min","Redesign the homepage","Improve the checkout flow"], answer:1, why:"If it names a feature, it's already a solution. The good one has data + behaviour + pain, no solution baked in." },
          { type:"trap", q:"'NPS is 23 and falling, so let's redesign the UI.' What's the flaw?", options:["Nothing — it cites a metric","It leaps to a solution; the real question is WHY NPS is 23"], answer:1, why:"Good metric, unexamined jump. Sin #1: solution disguised as problem. Investigate the cause first." },
          { type:"match", q:"Match the deadly PRD sin to its fix.", pairs:[["Vague metrics","Metric + baseline + target + timeframe"],["Happy path only","Ask: what could go wrong?"],["Missing non-goals","State what's out of scope"],["Over-specifying","Give goals; let engineers shape the how"]], why:"Each sin maps to a concrete discipline." },
          { type:"mcq", q:"Your eng team keeps building things you didn't intend, and timelines slip. Which sin is most likely?", options:["Vague metrics","Missing non-goals — scope was never bounded","Solo authoring","Over-specifying"], answer:1, why:"Without explicit non-goals, engineers interpret broadly and scope creeps. Stating what you WON'T do is a gift to the team." },
          { type:"recall", q:"Why write the Like button as a story, not 'a click that increments a count'?", answer:"Framing the human meaning (people feel heard) inspires engineers to build better than order-takers following a spec.", why:"Great PMs narrate impact; inspired teams produce better work." },
        ],
      },
      {
        id: "p3", title: "Agile & the PM–EM Line",
        q: [
          { type:"mcq", q:"Simplest honest definition of Agile?", options:["No planning at all","Quick repeated cycles (2-4 wks) of define→build→release, so you learn fast","A startup-only method","Documentation first"], answer:1, why:"Same steps as waterfall but in weeks, not months — so course-correction is cheap. Learning is the point." },
          { type:"order", q:"Order the Scrum hierarchy, broad → narrow.", seq:["Epic","Product Backlog","Sprint Backlog","User Story"], why:"Epic = big body of work; backlog = all future work; sprint backlog = this cycle; story = one user-facing slice." },
          { type:"match", q:"Match 'who owns what'.", pairs:[["WHY are we doing this","Product Manager"],["WHAT we're building","PM + Design"],["HOW we build it","Engineering Manager"],["WHEN it ships","Engineering Manager"]], why:"Never commit a timeline without the EM — negotiate scope, don't override the estimate." },
          { type:"mcq", q:"Sales hands you a big client's exact feature request. First move?", options:["Check eng capacity, then yes/no","Convert it to a problem, validate it, weigh vs roadmap & strategy","Build it — the client is big","Decline — one client shouldn't decide"], answer:1, why:"A feature is a solution. Find the problem underneath and whether it generalises before committing roadmap time. Capacity isn't the first question." },
          { type:"recall", q:"The EM estimates 6 months; you wanted 3. What do you do?", answer:"Negotiate scope — cut or phase the work — rather than overriding the estimate. The EM owns HOW and WHEN; you own WHY and shape WHAT.", why:"Respecting the ownership line keeps estimates honest and the team bought-in." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 5
  {
    id: "ai-foundations", title: "AI PM: Foundations",
    blurb: "Tokens, embeddings, attention, hallucination.",
    color: "#A29BFE", icon: "brain",
    lessons: [
      {
        id: "a1", title: "How LLMs Work",
        q: [
          { type:"fill", q:"At its core, an LLM is just a next-______ predictor.", answer:"token", accept:["token"], why:"Everything else — reasoning, style, knowledge — emerges from predicting the next token at scale." },
          { type:"mcq", q:"Your AI feature's bill tripled overnight. Which lever most likely moved?", options:["The model's mood","Tokens — longer prompts/outputs cost more, run slower, and fill the context window","User colour theme","Random variance"], answer:1, why:"Tokens are directly proportional to cost, latency and memory. Output-length and prompt-size choices are price choices." },
          { type:"trap", q:"A PM budgets cost assuming '1 token = 1 word.' Safe?", options:["Yes — close enough","No — ~0.75 words in English, and non-English (e.g. Hindi) uses many more tokens"], answer:1, why:"Tokens are sub-word units. Mis-estimating them mis-estimates cost, latency and context budget — badly for non-English products." },
          { type:"mcq", q:"'I sat on the bank of the river.' How does the model know which 'bank'?", options:["Random guess","Attention weighs related words — 'river' disambiguates 'bank' — in parallel","A built-in dictionary","The user tags it"], answer:1, why:"Attention (2017 Transformers) lets the model weigh which words matter to each other. Embeddings + attention are why meaning, not just spelling, drives output." },
          { type:"recall", q:"What does King − Man + Woman ≈ Queen reveal about how LLMs represent meaning?", answer:"Embeddings place words as positions in vector space, so semantic relationships become measurable arithmetic — similar meanings sit nearby.", why:"This is the basis of semantic search and why RAG retrieval works." },
        ],
      },
      {
        id: "a2", title: "Hallucination & Training",
        q: [
          { type:"trap", q:"Your chatbot invents a fake stat with total confidence. A fixable bug?", options:["Yes — patch it out entirely","No — it's a characteristic of next-token prediction; reducible (RAG, grounding) but never zero"], answer:1, why:"The model generates plausible text, not verified facts. Bard's JWST error wiped ~$100B off Google in a day — manage it, don't expect to delete it." },
          { type:"trap", q:"A teammate says 'RLHF post-training will make it more factually correct.' True?", options:["Yes — that's what post-training does","No — post-training changes behaviour (helpful, safe, polite), not factual knowledge"], answer:1, why:"Post-training is parenting; pre-training is the DNA. Politeness and safety ≠ truth." },
          { type:"match", q:"Match the memory type to its trait.", pairs:[["Training memory","Old, compressed — like half-remembered school"],["Context memory","Fresh, specific, reliable — the prompt right now"]], why:"Context memory beats training memory for reliability — the core reason RAG works." },
          { type:"mcq", q:"A teammate wants to fine-tune GPT-4 on your weekly-changing company docs. Best response?", options:["Great — start training","Use RAG — inject current data at query time; fine-tuning bakes in stale facts and changes behaviour, not knowledge","Use a bigger model","Do nothing"], answer:1, why:"Fine-tuning changes how it behaves, not what it knows. Dynamic knowledge → RAG, retrained never." },
          { type:"recall", q:"Explain why 'the model is hallucinating, let's just retrain it' is usually the wrong instinct.", answer:"Hallucination comes from plausible next-token generation, not missing training. The fix is usually grounding (RAG) and prompting, not retraining the weights.", why:"Diagnose the mechanism before reaching for the most expensive lever." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 6
  {
    id: "ai-building", title: "AI PM: RAG & Fine-Tuning",
    blurb: "Retrieval, the 2×2 decision, failure modes.",
    color: "#00CEC9", icon: "layers",
    lessons: [
      {
        id: "r1", title: "The RAG Pipeline",
        q: [
          { type:"order", q:"Order the RAG query pipeline.", seq:["Embed the query","Search the vector DB","Retrieve top-K chunks","Augment the prompt","LLM answers, grounded"], why:"Indexing (chunk→embed→store) happens once; this query loop runs every request." },
          { type:"mcq", q:"A support bot must answer from 10,000 policy docs that change weekly. Best architecture?", options:["Fine-tune the model monthly","RAG — retrieve current chunks at query time","Paste all docs into every prompt","Use a bigger context window only"], answer:1, why:"RAG keeps answers grounded AND current without retraining or bloating every prompt. Stuffing context (C/D) raises cost and hallucination." },
          { type:"mcq", q:"Lawyers search your bot by exact case number 'Re: 2024-CV-8891' and it misses. Why, and the fix?", options:["Model too small","Dense/semantic search is weak on exact IDs — add sparse/keyword for hybrid retrieval","Bad prompt","Need fine-tuning"], answer:1, why:"Dense search understands meaning, not exact strings. Hybrid (dense + sparse) handles both concepts and IDs." },
          { type:"trap", q:"To be safe you set Top-K to 50 chunks per query. Smart?", options:["Yes — more context is safer","No — too many chunks add noise, cost, and 'lost in the middle'; retrieve few, relevant ones"], answer:1, why:"Retrieval quality beats quantity. Flooding the prompt dilutes the signal and degrades the answer." },
          { type:"recall", q:"Your RAG bot keeps citing last month's refund policy. Where's the failure and what's the fix?", answer:"Failure Point #1: data quality — retrieval works, the source is stale. The fix is operational (update the knowledge base + a freshness SLA), not a bigger model.", why:"Walk the failure points in order; the model is the last suspect, not the first." },
        ],
      },
      {
        id: "r2", title: "RAG vs Fine-Tuning",
        q: [
          { type:"match", q:"Map knowledge × behaviour to the right approach.", pairs:[["Static + standard","Prompt engineering"],["Dynamic + standard","RAG"],["Static + custom","Fine-tuning"],["Dynamic + custom","RAG + Fine-tuning"]], why:"RAG = what it KNOWS. Fine-tuning = how it BEHAVES. They're complementary, not rivals." },
          { type:"trap", q:"Output quality is weak; a teammate says 'fine-tune first.' Wise?", options:["Yes — fine-tune for quality","No — start with prompt + RAG; fine-tune only if those plateau"], answer:1, why:"Jumping to fine-tuning first shows no grasp of cost/benefit. Don't use a sword where a needle works." },
          { type:"mcq", q:"A law firm's assistant needs both up-to-date case law AND a strict formal house tone. Which approach?", options:["RAG only","Fine-tuning only","RAG for the changing law + fine-tuning for the tone","Prompt engineering only"], answer:2, why:"Dynamic knowledge → RAG; custom behaviour/tone → fine-tuning. This is the 'both' quadrant — each tool does its job." },
          { type:"fill", q:"Using a big model to generate data that trains a small cheap one is knowledge ______.", answer:"distillation", accept:["distillation"], why:"The PhD writes the answers; the smaller model studies them and nearly matches on that task — for a fraction of the cost." },
          { type:"recall", q:"You need a fast, cheap, on-device classifier for one narrow task. Frontier model or SLM, and why?", answer:"A small/fine-tuned model (SLM) — for a narrow task you want a specialist, not frontier-level general intelligence you'll pay latency and cost for.", why:"Superman vs the specialist doctor — most tasks want the specialist." },
        ],
      },
      {
        id: "r3", title: "Retrieval Quality",
        q: [
          { type:"mcq", q:"Your bot retrieves the right document but answers with half the policy missing. Likely cause?", options:["Model too small","Chunking split the policy mid-thought, so a key chunk wasn't retrieved","Temperature too high","Not enough GPUs"], answer:1, why:"Chunk strategy decides what CAN be retrieved. Bad splits orphan critical context — tune chunk size and overlap to the content." },
          { type:"mcq", q:"Two retrieved chunks contradict each other (old vs new policy). Best fix?", options:["Let the model pick","Add metadata (dates) and rank/filter by recency so stale chunks lose","Remove RAG","Use a bigger model"], answer:1, why:"Metadata filtering and re-ranking resolve conflicts that raw similarity can't." },
          { type:"trap", q:"A user says the bot 'makes things up' for a fact you KNOW is in the docs. Blame the model?", options:["Yes — the model hallucinated","No — first check retrieval and chunking; the right chunk may never have reached the prompt"], answer:1, why:"Debug the pipeline in order: did retrieval return it? was the chunk well-formed? did augmentation include it? Generation is the last suspect." },
          { type:"recall", q:"Name the first three things you'd check when a RAG answer is wrong.", answer:"1) Did retrieval return the right chunk (check the log)? 2) Was the chunk well-formed (chunking/embedding)? 3) Did the prompt actually include it (augmentation)? Only then suspect the model.", why:"Systematic pipeline debugging beats blaming the LLM." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 7
  {
    id: "agents", title: "AI PM: Agents",
    blurb: "Agency, multi-agent, autonomy, guardrails.",
    color: "#FD79A8", icon: "robot",
    lessons: [
      {
        id: "g1", title: "What Makes an Agent",
        q: [
          { type:"match", q:"Match the 3 parts of an agent.", pairs:[["Intelligence","The LLM — makes decisions"],["Tools","APIs, email, Slack, DBs"],["Orchestration","n8n / LangGraph — runs the loop"]], why:"Brain, hands, and the nervous system that runs the loop." },
          { type:"trap", q:"You have a reliable 5-step automation. A teammate wants to rebuild it as an autonomous agent. Wise?", options:["Yes — agents are more advanced","Not necessarily — if the steps are fixed, a workflow is simpler and more reliable; don't over-engineer"], answer:1, why:"Agency (the LLM deciding next steps) earns its complexity only when the path isn't predefined. A working workflow shouldn't become an agent for fashion." },
          { type:"order", q:"Order the OWO check before building an agent.", seq:["Opportunity","Workflow","Outcome"], why:"What problem & why now → old vs new flow → which metric improves. Skip this and you join the 95% that fail." },
          { type:"mcq", q:"~95% of AI initiatives fail. The biggest single reason?", options:["Weak models","The Learning Gap — not understanding the real problem + the system never evolving","Too expensive","No GPUs"], answer:1, why:"Deep discovery plus systems that keep learning beat raw model power. It's a problem-understanding failure, not a tech one." },
          { type:"recall", q:"What separates a true agent from an AI workflow, in one line?", answer:"Agency — the LLM decides what to do next, rather than following predefined steps.", why:"A workflow has fixed steps; an agent makes its own decisions." },
        ],
      },
      {
        id: "g2", title: "Autonomy & Guardrails",
        q: [
          { type:"mcq", q:"You're building an agent that issues customer refunds. Leadership wants full autonomy. Your concern?", options:["None — automate fully","High stakes + irreversible (money out) demands human-in-the-loop, at least above a threshold","Agents can't do refunds","It'll be too slow"], answer:1, why:"Design autonomy by stakes × reversibility. Money leaving the business is exactly where a human should approve." },
          { type:"match", q:"Match the autonomy level to its example.", pairs:[["AI suggests","ChatGPT, Perplexity"],["Co-pilot (you review)","Cursor, Copilot"],["Acts with guardrails","Lovable, Devin"]], why:"The higher the stakes and the lower the reversibility, the more human-in-the-loop you keep." },
          { type:"trap", q:"Moving to higher autonomy means removing safety. True?", options:["Yes — full automation, no checks","No — you swap CONTROL (micromanage every step) for GUARDRAILS (set boundaries, then let it act)"], answer:1, why:"A great manager sets the goal and the don'ts, then lets the agent figure out the how — that's guardrails, not absence of safety." },
          { type:"mcq", q:"In a Deep-Research multi-agent setup, why give each sub-agent its OWN context window?", options:["To use more memory","So messy raw research stays isolated — only clean outputs return to the master, unpolluted","For security only","To run slower"], answer:1, why:"Master = CEO who wants outputs; sub-agents do the ground work in parallel without flooding the master's context." },
          { type:"recall", q:"How would you roll out a refund agent without betting the business on day one?", answer:"Start low-autonomy: auto-handle small/low-risk refunds, human-review large ones; expand the threshold as data and confidence grow.", why:"Crawl, walk, run — earn autonomy with evidence." },
        ],
      },
    ],
  },

  // ───────────────────────────── UNIT 8
  {
    id: "ai-pm-craft", title: "AI PM: Craft",
    blurb: "Prompting, evals, the trade-off triangle, AI UX.",
    color: "#FAB1A0", icon: "spark",
    lessons: [
      {
        id: "c1", title: "Prompting & Context",
        q: [
          { type:"order", q:"Order the RCTFCE prompt components.", seq:["Role","Context","Task","Format","Constraints","Examples"], why:"Minimum useful is Role + Task + Format; each added component sharpens output." },
          { type:"trap", q:"To boost accuracy, a PM stuffs the entire knowledge base into the context. Good move?", options:["Yes — more context, better answers","No — accuracy drops ('lost in the middle'); supply the RIGHT info, not ALL info"], answer:1, why:"Context engineering is resource allocation. A focused 2k-token context often beats a noisy 50k one." },
          { type:"mcq", q:"Your bot confidently answers questions it has no data for. Best single fix?", options:["A bigger model","Add an 'out': 'if unsure, say so and ask a clarifying question'","Lower temperature only","More few-shot examples"], answer:1, why:"LLMs are compulsive completers; explicit permission to say 'I don't know' cuts forced hallucination." },
          { type:"mcq", q:"You're building a finance bot that must be consistent and factual. Temperature setting?", options:["High (~0.9) for variety","Near 0 for deterministic, focused output","Doesn't matter","Always 1.0"], answer:1, why:"Low temp = focused and repeatable; high temp = creative and varied. It's a deliberate product decision." },
          { type:"recall", q:"What is 'red-teaming your own AI output' and why does it work?", answer:"After a result, tell the AI to be a harsh critic and name assumptions that could be wrong. LLMs default to agreement/flattery, so you must explicitly prompt for criticism to surface weaknesses.", why:"This one habit can lift output quality 30–40%." },
        ],
      },
      {
        id: "c2", title: "Evals & the Six Knobs",
        q: [
          { type:"trap", q:"Is your golden eval dataset the same as your training data?", options:["Yes — reuse it","No — training BUILDS the model; the golden set TESTS the product; never mix them"], answer:1, why:"Fine-tuning on your eval set is like giving the student the exam answers — scores become meaningless." },
          { type:"order", q:"Order the six tuning knobs, cheapest → most expensive.", seq:["System prompt","Context / RAG","Tools","Model","Orchestration","Fine-tuning"], why:"~80% of quality issues fix at knobs 1–2. Fine-tuning is the last resort, not the first." },
          { type:"mcq", q:"Offline evals say 95% but production thumbs-down keeps rising. Most likely cause?", options:["The model got dumber overnight","Data drift — real queries diverged from your golden set's coverage","Users are wrong","Latency"], answer:1, why:"Offline evals only test what they contain. Sample real queries and add new clusters to the golden set." },
          { type:"mcq", q:"You can't have humans grade 20,000 daily outputs. Best scalable design?", options:["Skip grading","Hybrid: code checks on 100%, LLM-as-judge flags issues, humans review the flagged sample","Trust the model","Star ratings only"], answer:1, why:"LLM-as-judge scales subjective quality scoring, calibrated against a human-reviewed sample." },
          { type:"recall", q:"Why is 'just fine-tune it' usually the wrong first reaction to weak AI output?", answer:"Most quality issues are fixed cheaply at the system-prompt and context/RAG knobs; fine-tuning is the most expensive, slowest lever and should be last.", why:"Cheapest effective knob first — discipline beats reflex." },
        ],
      },
      {
        id: "c3", title: "Trade-offs & AI-First UX",
        q: [
          { type:"mcq", q:"In the Intelligence–Latency–Cost triangle, how many can you maximise at once?", options:["All three","At most two — the third becomes the trade-off","None","Only cost"], answer:1, why:"Smart + fast = expensive; fast + cheap = less smart. Model choice is a product decision, not a default." },
          { type:"match", q:"Match the AI-first UX pattern to what it solves.", pairs:[["👍/👎 feedback","Fuel for the quality-improvement loop"],["Suggested prompts","Beats the blank-slate freeze"],["Undo / rollback","Recovers from wrong AI actions"],["Show sources","Builds trust"]], why:"In AI products, UX is often the moat — Cursor is VS Code + an API + a brilliant experience." },
          { type:"trap", q:"Your competitor uses the same model API as you. What actually defends your product?", options:["Using a newer model first","A data flywheel + workflow lock-in — anyone can call the same API","A bigger ad budget","More features"], answer:1, why:"Proprietary context, deep workflow integration and a feedback flywheel that improves with use are the real moats, not model access." },
          { type:"mcq", q:"You're designing where to spend effort on an AI feature users don't trust. Highest-leverage move?", options:["Swap to the newest model","Add explainability + sources + an easy undo so users can trust and recover","Lower the price","Add more features"], answer:1, why:"Trust and recoverability drive adoption of AI features far more than raw model upgrades." },
          { type:"recall", q:"What is 'inherent virality'? Give one concrete example.", answer:"When one person's normal use exposes others — e.g. a meeting-summary tool emails the AI summary to every attendee, who discover it with zero marketing spend. Build it into the architecture, not as a 'Share' button.", why:"It slashes customer acquisition cost by design." },
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
          { type:"trap", q:"Two PMs use the same vibe-coding tool; one ships a great app, one a mess. What decides it?", options:["The tool they chose","Their prompt — driven by research depth and product sense; tools are converging"], answer:1, why:"Anyone can type 'make a book app'. Knowing WHAT to build, WHY and for WHOM is the differentiator, not the tool." },
          { type:"order", q:"Order the right prototyping approach.", seq:["Do discovery first","Write a PRD from research","Feed it to a vibe-coding tool","Iterate by chat","Test with users — V2 is the portfolio piece"], why:"The tool can't compensate for shallow research. V2 (post-feedback) is what belongs in your portfolio, not V1." },
          { type:"mcq", q:"You're paralysed picking the 'perfect' stack before starting. Best mental model?", options:["Research every option fully first","Torch in a forest — you only need to see the next 2-3 metres to move; momentum brings clarity","Wait for a mentor","Pick the most popular tool always"], answer:1, why:"Action beats over-research once you know enough to begin. Start; the path reveals itself." },
          { type:"recall", q:"Why is V2 (not V1) the prototype that belongs in your portfolio?", answer:"V1 reflects your assumptions; V2 reflects real user feedback applied. Showing you iterated on evidence is the PM skill worth demonstrating.", why:"Discovery → build → test → iterate is the loop you're proving you can run." },
        ],
      },
      {
        id: "b2", title: "Resume & Proof of Work",
        q: [
          { type:"match", q:"Match the resume-bullet formula.", pairs:[["WHAT","The task you delivered"],["HOW","Strategy, frameworks, tools — PM keywords"],["IMPACT","Numbers & KPIs"]], why:"40–50% of bullets should carry a number — you can't manage (or sell) what you don't measure." },
          { type:"mcq", q:"As a career-switcher, which portfolio wins more interviews?", options:["10 shallow case studies","2-3 deep, research-based case studies (e.g. a 30-day plan for a target company)","A list of certificates","One huge generic doc"], answer:1, why:"Depth shows you can think like a PM before the title. Shallow portfolios actively hurt — they signal surface understanding." },
          { type:"trap", q:"You paste a GPT-written resume full of PM buzzwords. Risk?", options:["None — AI writing is fine","Over-stuffing reads like a bot and gets filtered; use AI as a collaborator and humanise every line"], answer:1, why:"The real filter is a human reader: does each line add value, or just stack keywords?" },
          { type:"recall", q:"You're switching role, domain AND industry at once. What's the risk and the fix?", answer:"Changing everything makes you illegible to hirers. Change one variable at a time and keep an anchor — a transferable skill, domain, or references — so your story is readable.", why:"One variable + an anchor keeps the switch credible." },
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
