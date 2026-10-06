# SidelineReel — PM Assessment Submission

**Candidate:** Himanshu Bairwa
**Role:** Product Manager, Ajaia LLC (SidelineReel)

**Prototype link:** _[paste Netlify / hosted link here after uploading; if you didn't host it, delete this line and attach index.html]_
**Video link:** _[paste Loom / YouTube / Google Drive link here after recording]_

---

## Task 1 — The Roadmap Call

### The candidates on the table

From Materials 1–5, five credible "build next" candidates surface. I ranked them on three axes I believe actually move the business:

1. **Protects or grows renewal revenue** (clubs pay per season; one $180k account is at known risk).
2. **Defends the core promise of the product** (right highlight → right kid → parent shares it). The product lives or dies here.
3. **Solves a validated problem, not a stated want** (stated preference ≠ observed behavior).

| Rank | Initiative | Why here | Evidence |
|------|-----------|----------|----------|
| **#1** | **Roster Tagging Accuracy + Human-in-the-loop Coach Review** | This is the core-loop bug. When a #4 clip lands in #14's reel, the product fails at its single most important job: "my kid's moments, in my kid's reel." It is demonstrably hurting open rates (and therefore share rate, our leading indicator of parent love), and it's producing emotionally-charged support tickets from *multiple* clubs, not just one. Fixing it protects **all** renewals, not just Ridgeline's. | Mat. 3 (3 of 5 tickets this week are number-mismatches: 4↔14, digit swaps, 1↔11); Mat. 5 (30% of reels never opened; analytics explicitly attributes most of that to wrong-kid thumbnails from visually similar numbers); Mat. 2 (90% of auto-recaps get shared — when they're right, parents love the product — so the leak is upstream of sharing, at tagging). |
| **#2** | **"Livestream Lite" for Ridgeline (manual, coach-initiated stream → shared link) in 6 weeks, scoped** | I will *not* commit to full autonomous livestreaming (auto-camera start, graphics, multi-angle, scout feeds) in 6 weeks — that's a quarter+ build and a reliability promise we can't hit in a signup deadline. But I *will* commit Carla a concrete, shippable thing she can show her board: coach taps "Go Live" in SidelineReel when the game starts, the phone/tablet streams to a private link we send the roster, grandparents/scouts get a URL. This is one feature, not a platform. It directly answers the renewal risk ($180k/season, our biggest account). | Mat. 1 (Carla explicit ask, 6-week deadline); Mat. 4 (Jamal: "needs to be concrete, not 'we hear you'"); size of account relative to ask. |
| **#3** | **Send-time & thumbnail optimization for recap notifications** | Cheap, high-leverage. Analytics says a chunk of unopened reels sit unopened because notification arrives late at night. Push recap delivery to 9am local, and prefer a thumbnail of the *parent's own kid* (requires #1 to be trustworthy first). | Mat. 5 (late-night notifications called out); low effort, no new UX surface. |
| — (not next) | **Full Reel Editor (trim + custom music)** | Survey says it's the #1 *stated* want (58%), but observed behavior is stark: 6% opened it, <1% finished an edit. Meanwhile the feature parents *actually* use — the Share button on auto-recap — is hit on 90% of recaps. Building a deep editor now is building for the say-do gap. I would not ship this until #1 is fixed and we've run a lightweight experiment (e.g., inline 1-tap trim, not a full editor) to see if behavior changes. | Mat. 2 (survey vs. usage). |
| — (not next) | **App icon rebrand (soccer ball → all-sports) + watermark regression** | Both real, both small. Icon is a brand decision, not a roadmap call. Watermark is a bug, sized as a bug-fix ticket, not a roadmap item. They don't move renewal or engagement meaningfully. | Mat. 3 (tickets 4 and 5, filed as low-urgency / "not urgent, just noticed"). |

### What I am explicitly NOT building next, and why

**Full autonomous livestreaming.** I'd tell Carla and Jamal directly: we are not going to promise auto-starting, multi-camera, scout-grade livestreaming in six weeks — that promise is how you blow a renewal twice (once at the board meeting when we miss it, again when parents complain about reliability). Instead we are shipping a concrete, coach-tap-to-start streaming link in time for signups, with a roadmap on the page for the broader livestream vision next season. Saying no to the full ask protects the account better than a yes we can't hit.

I'm also **not** green-lighting the full Reel Editor yet, despite loud survey asks. The usage data is unambiguous: parents do not edit today. They share. The 58% "I want editing controls" answer is what people say when nothing is actively broken in their reel; the 90% Share rate is what they do when the reel is correct. The right move is to fix correctness (#1) and re-measure; if parents still scream for editing after wrong-kid clips stop, we ship a minimal trim-first version.

### Recommendation to the team (the "what we build next" call)

**Ship in order:**

1. **This sprint (2 weeks):** Roster Tagging Confidence + Coach Review (spec below). Stops wrong-kid reels from ever reaching parents.
2. **Next 4 weeks, parallel-track after Tagging Review is in beta:** Livestream Lite — coach-initiated streaming for Ridgeline's deadline, gated as a Ridgeline pilot for the first season.
3. **Riding along:** Send-time + thumbnail optimization (fits inside the Tagging work, since it touches the recap pipeline).
4. **Backlog, not committed:** Full Reel Editor (re-validate with a 1-tap trim experiment post-fix); app icon / watermark bug fixes.

---

## Task 2 — The Spec: Roster Tagging Confidence & Coach Review

### Outcome (what success looks like)

**Wrong-kid highlights reach parents 0 times per week for number-confusion pairs (1↔11, 4↔14, digit-swaps, missing roster numbers), and coach effort to confirm clips is under 2 minutes per game.**

Secondary outcomes:
- Unopened-reel rate drops (Mat. 5's 30% figure) because thumbnails are trustworthy.
- Support tickets about "wrong kid in reel" trend to zero within 2 weeks of ship.
- Reel Share Rate (currently 92% on opened reels) is maintained or rises because confidence in "that's my kid" goes up.

### Problem statement (1-line)

The jersey-number detector silently assigns low-confidence or confused-number clips to a kid, and parents see them; there is no human checkpoint between detection and delivery.

### In scope

1. **Confidence scoring on every detected jersey number** (0–100) from the CV model.
2. **Number-confusion pair list** — curated set built from support data: `{1↔11, 4↔14, 12↔21, 13↔31, …}` plus any number where the detector's second-best candidate is within 15 points of the best.
3. **Three-state output per clip:**
   - **Auto-confirmed** (confidence ≥ 85% AND not on a confusion pair AND second-best candidate gap ≥ 30 pts) → routes straight to the player's reel.
   - **Coach review** (everything else) → held out of reels until the coach confirms or reassigns.
   - **Rejected** (detector sees a number not on the roster, OR confidence < 30%) → shown to coach as "not sure / not a roster number."
4. **Coach Review screen** (see prototype) shown *once per game*, before recap send:
   - Lists only the flagged clips (never the auto-confirmed ones, to keep it short).
   - For each clip shows: thumbnail with detected jersey overlaid, highlight description, confidence bar, and 1–2 "best guess" player pills reflecting the model's top candidates.
   - One tap to confirm the guess; one tap to pick a different player from the full roster; one tap to skip ("not a highlight / don't send to anyone").
5. **Send is locked** until all flagged clips are resolved (confirm / assign / skip). Coaches can save a draft and come back.
6. **Feedback loop:** every coach correction is logged as a training signal back into the detector (with consent — club-level opt-in, on by default for new accounts).
7. **Notification timing change:** recap notifications default to 9:00 AM local time the morning after the game, regardless of when processing finishes.
8. **Thumbnail preference:** when sending a personal reel notification to a parent, the thumbnail is a frame of *their* kid from their reel, not a generic team frame (depends on #1 being correct — locked to roll out alongside this).

### Out of scope

- Fully automatic resolution of number-confusion pairs without a human in the loop. We tried and failed this in the support data; we will not ship a model-only fix without a checkpoint.
- Re-training the CV model end-to-end in this release. The feedback loop is built, but model re-training is a follow-up.
- A parent-facing correction flow (e.g., "that's not my kid" button). Out for v1 — parent-reported corrections create a messy arbitration problem. We route via coach in v1; parent flagging is v2.
- Any editing controls (trim/music). Separate roadmap item.
- Backfilling re-tagging of previously-sent reels.
- Livestreaming anything. Separate track.

### Where a human stays in the loop

- **The coach** is always the arbiter of flagged clips. The model never sends a low-confidence or confused assignment to a parent.
- **Parents** don't edit tags in v1, but they can already reach support, and those tickets continue to route back to the coach + our queue.
- **Ajaia ops** reviews aggregate confusion-pair data weekly to expand the pair list (e.g., if 7↔17 starts popping up, add it to the auto-flag list before model retraining).

### Acceptance criteria (testable)

1. **AC-1 — Confusion pairs are held.** Given a clip where the detector's top-1 is #4 and top-2 is #14 (within 15 points), the clip appears in Coach Review and does *not* appear in any player's reel until confirmed.
2. **AC-2 — High-confidence clips flow through.** Given a clip the detector scores ≥ 90% on #7 with second-best < 60%, the clip is auto-assigned to #7, appears in #7's reel, and does *not* appear in Coach Review.
3. **AC-3 — Off-roster numbers are held.** Given a clip the detector reads as #12 when no #12 exists on the roster, the clip is shown in Coach Review with "closest match" suggestion (#21 in our example), and is not auto-assigned.
4. **AC-4 — One-tap confirm.** Coach taps "That's #4 Sofia" → clip moves to Sofia's reel, disappears from the review queue, and the recap-send progress bar advances. No second modal.
5. **AC-5 — Skip.** Coach taps "Not a highlight / skip" → clip appears in no player's reel and is marked skipped in logs.
6. **AC-6 — Send lock.** "Send weekly recap" is disabled until every flagged clip is confirmed, reassigned, or skipped. Draft save is always enabled.
7. **AC-7 — Notification timing.** For a game that finishes processing at 11:37 PM local, recap notifications are held and delivered at 9:00 AM the next calendar day.
8. **AC-8 — Thumbnail is the parent's kid.** The push notification / email a parent receives for their kid's reel uses a thumbnail frame drawn from their kid's clips, not a generic team frame (verified by sending to two different parents in the same game and comparing thumbnails).
9. **AC-9 — Feedback logging.** Every coach confirmation, reassignment, and skip is written to an event log tagged with `game_id, clip_id, detected_number, coach_chosen_number, confidence, review_latency_ms`.
10. **AC-10 — Time budget.** For a game that produces ≤ 5 flagged clips, the median coach completes review in under 90 seconds (measured across beta coaches).
11. **AC-11 — No silent wrong assignments.** After release, zero support tickets of the form "clip of kid X was in kid Y's reel" for confusion pairs over a 2-week window on beta clubs.

### Top two failure modes (and what catches each)

**Failure mode 1 — Coach "tap-through fatigue":** coaches just tap the first suggestion on every flagged clip to get it over with, which means some wrong assignments get through, now with coach-approved authority behind them.

- *Detection:*
  - Telemetry: any coach with > 95% "confirm top suggestion" rate and < 2 second median decision time is flagged.
  - Outcomes: parent "wrong kid" reports are still tracked; any coach with tap-through behavior and any parent complaint gets a gentle "want us to hold all clips for manual review?" prompt.
- *Mitigation in the spec:* we cap the review queue to low-confidence clips only (target ≤ 5 per game). If a coach consistently sees > 10 flagged clips per game, that is a model-quality signal, not a coach-behavior signal — we page ML, not blame the coach. The UI randomizes the order of the "best guess" pills on clips where confidence is under 60% so a muscle-memory first-tap isn't always the same button.

**Failure mode 2 — Confidence threshold is set wrong** (either too aggressive, producing a giant review queue coaches ignore; or too loose, letting wrong clips slip through again).

- *Detection:*
  - A dashboard tracks: flag rate (clips flagged / clips detected), coach review completion rate, coach time-to-send after game, post-send wrong-kid support tickets per 1000 clips.
  - Thresholds are tunable without a release (config, not hardcoded). We start at 85% / 15pt gap; we will tune weekly during beta.
- *Mitigation in the spec:* launch as a beta to Ridgeline + 3 volunteer clubs for two weeks before broad rollout. If flag rate exceeds 25% of clips in beta, we tighten confusion-pair logic before GA rather than shipping a noisy queue to every coach.

---

## Task 3 — Working Prototype

A working prototype of the Coach Review flow ships as `prototype/index.html` — a single self-contained HTML file (no build, no dependencies, no server required). Open it directly in any browser, or serve the folder.

**What's clickable / working:**

- Post-game Coach Review screen seeded with three flagged clips that mirror the real support tickets in Material 3:
  - #4 / #14 digit transpose (Ridgeline ticket).
  - #1 / #11 single/double-digit ambiguity (Cobblestone Little League ticket).
  - #12 / #21 digit-swap with no matching roster number (Brightwater Lacrosse ticket).
- For each clip: confidence bar, detected-number overlay, reason text, 1-tap "That's #N Player" confirm buttons for the model's top two candidates, a "Someone else…" picker with the full roster, and a "Skip / not a highlight" button.
- Roster sidebar highlighting players involved in flagged clips.
- Progress bar + send lock — "Send weekly recap" stays disabled until every flagged clip is confirmed/reassigned/skipped (AC-6).
- Toast feedback on every action; "sent" state when done, noting corrections feed back into the tagger.
- Number picker modal for "someone else" reassignment.

---

## Task 4 — AI Workflow Note

I used AI to scaffold the prototype — generating the HTML/CSS/JS for the Coach Review screen, the data model for clips/players, and the interaction logic — because that is the part of this assessment where speed-to-a-clickable-thing is the goal, not where judgment is required. I also used AI to help structure the spec template (outcomes / in-scope / out-of-scope / ACs / failure modes) so I didn't forget a section under time pressure.

I deliberately kept the roadmap ranking and the "what not to build" call human. That decision turns on reading the tension between Materials 1/4 (a $180k renewal screaming for livestreaming) and Material 5 (the core product is silently mis-tagging reels at a rate that depresses opens by ~30%). That is a judgment trade — not a calculation — and PM judgment is the thing being assessed. I also wrote the specific acceptance criteria and failure modes myself; AC-11 (zero wrong-kid tickets on confusion pairs in 2 weeks) and the tap-through-fatigue failure mode are grounded in the specific evidence in Materials 2, 3, and 5.

**One specific thing AI got wrong / I chose not to use:** the first prototype draft defaulted to showing *all* clips in the review queue, including auto-confirmed ones, with a big "Approve All" button at the top. I removed that. That design invites exactly the tap-through fatigue failure mode I call out in the spec — if everything is shown to the coach, the confidence score is theater. I kept the queue to flagged clips only and removed the bulk-approve affordance.
