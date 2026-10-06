# Video Script — SidelineReel PM Assessment
**Himanshu Bairwa**
**Target length: 7–9 minutes**
**Tip: Read this a few times before recording, then speak naturally — don't read verbatim. Numbers and order matter; exact words don't.**

---

## 0. Intro (10 seconds)
"Hi, I'm Himanshu Bairwa. I'm walking through my answer to the SidelineReel PM assessment. I'll cover three things: the roadmap call, the spec for the top item, and a quick demo of the working prototype I built, then I'll close with who I am and why Ajaia."

---

## 1. Task 1 — The Roadmap Call (about 2.5 minutes)

**Open SUBMISSION.md on screen, point at the ranking table.**

"Five things were on the table after reading the five materials: fixing jersey-number tagging, building livestreaming, adding editing controls, fixing send timing, and a couple of small support tickets like the app icon.

I ranked roster-tagging accuracy as **number one**, and I want to be clear why — because there's a difference between the loudest problem and the most important problem.

The loudest problem is Carla at Ridgeline asking for livestreaming, backed by our VP of Sales, and that's a $180,000 account renewing in six weeks. That is real. But the most important problem is hiding in Material 3 and Material 5. This week alone we had three support tickets from three different clubs, all about the same bug: a kid's reel contained a clip of a different kid, caused by similar jersey numbers — 4 vs 14, 1 vs 11, digit swaps. Material 5 says roughly 30% of generated reels are never opened at all, and analytics explicitly attributes most of that to thumbnails showing the wrong kid when jersey numbers are visually similar.

So the product is silently failing at its core promise — *your kid's moments, in your kid's reel* — and that hurts every club's renewal, not just Ridgeline's. That's why it's number one.

**Number two is a scoped-down livestreaming commitment for Ridgeline.** But — and I want to be explicit about what I would NOT build — I would not promise full autonomous livestreaming in six weeks. Auto-start, multi-camera, scout-grade reliability is a quarter-plus build. A promise we can't hit costs us the account twice: once at the board meeting when we miss it, once when it breaks. Instead I'd commit Carla a concrete thing in six weeks: coach taps 'Go Live', the phone streams to a private link we send the roster, grandparents and scouts get a URL. That is shippable, that is concrete, that she can show her board.

**I'm also NOT building the full Reel Editor next**, even though 58% of surveyed parents said it was their top ask. The behavioral data tells a different story: in the last 90 days, only 6% of parents opened the editor, and fewer than 1% actually finished an edit. Meanwhile the Share button on the auto-recap is used on 90% of recaps sent. Parents don't edit — they share, when the reel is right. That's a classic say-do gap. I'd rather fix correctness first, re-measure, and then ship a minimal trim feature if the demand is real.

The app icon and the missing watermark are real bugs; they're just not roadmap items. They go in the sprint backlog as bugs."

---

## 2. Task 2 — The Spec (about 2.5 minutes)

**Scroll down in SUBMISSION.md to "Task 2 — The Spec".**

"For the top item — Roster Tagging Confidence with Coach Review — the spec starts with a single outcome: **zero wrong-kid clips reaching parents for known number-confusion pairs, with coach review time under two minutes per game.** That's a measurable outcome, not a feature list.

What's **in scope**: a confidence score on every detected jersey; a curated confusion-pair list built from support tickets — 1/11, 4/14, 12/21 and so on; three states per clip — auto-confirmed, coach review, or rejected; a Coach Review screen that appears once before each recap is sent, and shows only the flagged clips, not every clip; send is locked until the coach resolves every flagged clip; every correction feeds back as training data; and two quick wins riding alongside — recap notifications move to 9 AM local instead of late night, and the reel thumbnail a parent sees is a frame of their own kid.

What's **out of scope**: I am not retraining the CV model this release — the feedback loop is built, retraining is a follow-up. I'm not building a parent-facing 'that's not my kid' button in v1 — that creates an arbitration problem between parent and coach. Routing goes through the coach. And I'm not touching editing controls.

**Where is the human in the loop?** The coach is always the arbiter of flagged clips. The model never sends a low-confidence or confused assignment to a parent. Ajaia ops reviews aggregate confusion data weekly to expand the pair list before the model catches up.

There are **eleven acceptance criteria** in the doc — I'll call out two I care about most: AC-6, the send lock — the recap cannot be sent until every flagged clip is confirmed or skipped — and AC-11, the business outcome: zero wrong-kid support tickets on confusion pairs in a two-week beta window.

**The two ways this could fail after it ships:**

First, **tap-through fatigue** — coaches just tap the first suggestion on every clip to get it over with. We catch that with telemetry: any coach above 95% top-suggestion acceptance with sub-two-second decision time gets flagged, and we also randomize the order of the guess pills on low-confidence clips so muscle memory doesn't always pick the same button. Also, we cap the queue — if a coach sees more than ten flagged clips a game, that's a model problem, not a coach problem, and we page ML.

Second, **the confidence threshold is wrong** — too aggressive and we drown coaches in false flags, too loose and wrong clips slip through again. That's why thresholds are tunable config, not hardcoded, and we launch as a beta to Ridgeline plus three volunteer clubs for two weeks before we roll out broadly."

---

## 3. Task 3 — Prototype Demo (about 2 minutes)

**Open the prototype (index.html) in your browser. Share your screen.**

"For the prototype I built the core Coach Review flow, because that's the new screen that has to work. You're looking at it here.

This is what the coach sees the morning after a game — three clips have been flagged. Notice I've seeded them directly from the support tickets in the materials:

- **First clip** — the model detected #14 but it's a 4/14 transpose, confidence 42%. That's exactly the Ridgeline ticket — daughter wears 14, clip was of #4. I can tap 'That's #4 Sofia' one time to confirm… [click it] …and it's assigned.
- **Second clip** — 1 vs 11 ambiguity, the Cobblestone Little League case. Let me say this is Jaden, #11… [tap 'That's #11 Jaden'].
- **Third clip** — the model read #12 but #12 doesn't exist on the roster; closest match is Lucas #21. Let me say this one I'm actually not sure about — I'll open the full roster picker [click 'Someone else…'] and pick Noah #7 instead. [pick #7 Noah, click Assign].

Now watch the progress bar — all three are resolved [point at progress bar now 100%], the Send button unlocks, I hit Send [click Send], the recap goes out, and notifications are held until 9 AM.

The whole interaction is about 45 seconds for this game, which fits the under-two-minute time budget. Everything I did here maps back to an acceptance criterion in the spec."

---

## 4. Task 4 — AI Workflow (about 20 seconds)

"Quick note on AI use: I used AI to scaffold the prototype HTML and the document structure because speed-to-a-clickable-thing is what that part of the assessment rewards. I made the ranking decision, the 'what not to build' calls, the acceptance criteria, and the failure modes myself — that's PM judgment and it's the thing being tested. One specific thing AI got wrong: its first draft included an 'Approve All' button at the top of the queue, which is exactly the tap-through-fatigue failure I call out in the spec. I removed it."

---

## 5. Who I am / Why Ajaia / Salary (about 1.5 minutes)

"A bit about me: I'm Himanshu Bairwa, IIT Delhi. I want this role because SidelineReel is the kind of product work that actually sticks with you — you're building something that shows up at breakfast tables, that grandparents watch from out of state, that kids themselves look back on years later. The PM job here isn't abstract metrics; a wrong-kid reel makes an eight-year-old sad in a real way, and a correct one gets shared. That clarity — that you can read a support ticket from a mom about her daughter and know exactly what to fix — is why I want to work on it, and why Ajaia specifically. You're early enough that a PM's decisions actually ship to real users and move the business, not just get debated in a roadmap doc.

On salary: I'm looking for a total compensation package in the range of **[FILL THIS IN BEFORE RECORDING]**, flexible based on equity and how the role is scoped. Happy to talk through what makes sense together.

Thanks — that's the submission."

---

## ✅ Before you hit record — fill in these two blanks

1. Salary expectation number (US role, PM at early-stage sports tech startup): reference point for Associate/PM level is often **$110k–$140k base** + equity depending on location/experience. Decide your number and write it above.
2. Open SUBMISSION.md in a tab, and open the prototype in another tab so you can switch between them during the demo.
