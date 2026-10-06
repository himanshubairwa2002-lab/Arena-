# SidelineReel — PM Assessment Submission

**Candidate:** Himanshu Bairwa · himanshub.iitdelhi@gmail.com · IIT Delhi
**Prototype:** `prototype/index.html` (open in any browser — single file, no build)
**Video:** _[paste Loom / YouTube / unlisted Google Drive link here after recording]_

---

## TL;DR (the 30-second version for the reviewer)

If you only read this section: **ship Roster Tagging Confidence + Coach Review first; ship a scoped "Livestream Lite" (manual coach-tap-to-start) for Ridgeline's six-week deadline in parallel starting next sprint; do NOT commit to full autonomous livestreaming or to the full Reel Editor this cycle.** Everything below explains why with evidence, and the prototype shows the new Coach Review flow running end-to-end.

---

## Task 1 — The Roadmap Call

### How I'm ranking

Five credible asks surfaced from Materials 1–5. I ranked them against three criteria:

1. **Protects or grows renewal revenue** (clubs pay per season; Ridgeline is our single biggest account at $180k/season and is at known risk).
2. **Defends the core product promise** — "my kid's moments, in my kid's reel." If that's wrong, nothing else matters.
3. **Solves a validated problem, not a stated want.** What people say they want and what they actually do are different; I weight usage data over survey data when they conflict.

| Rank | Initiative | Why | Evidence |
|------|-----------|-----|----------|
| **#1** | **Roster Tagging Accuracy + Human-in-the-loop Coach Review (this sprint, ~2 weeks)** | Wrong-kid highlights are not a minor bug — they are an emotional failure of the product's core promise. A mom opens her daughter's reel and sees a different kid: that's a support ticket, an unshared reel, and at renewal time, a reason to churn. Three of the five support tickets this week are this exact bug, across *three different clubs*, all on visually similar jersey numbers (4↔14, digit swaps, 1↔11). Material 5 shows ~30% of generated reels are never opened, and analytics explicitly attributes the majority to wrong-kid thumbnails from number confusion. Fixing this protects **every** club's renewal, not just one. | Mat. 3 (tickets 1–3); Mat. 5 (30% unopened, wrong-kid thumbnail attribution); Mat. 2 (90% share rate on recaps — when it's right, parents *do* love it; the leak is upstream at tagging). |
| **#2** | **Livestream Lite — coach-initiated streaming → private roster link (next 4 weeks, parallel track)** | I will *not* promise full autonomous livestreaming in six weeks — that is a quarter+ build and a reliability story I can't stand behind. A promise we can't hit costs the account twice: once at the board meeting when we miss the date, again when it breaks on game day. But I *will* give Carla a concrete thing she can show her board: coach taps "Go Live" when the game starts, the phone streams to a private link we push to the roster, grandparents and scouts get a URL. That is one feature, shippable in six weeks, and it directly answers the renewal risk. | Mat. 1 (Carla's ask, six-week clock); Mat. 4 (Jamal: "needs to be concrete, not 'we hear you'"); account size. |
| **#3** | **Send-time + thumbnail optimization** | Cheap, high-leverage, and rides along with #1. Push notifications to 9 AM local (no more late-night pings); use a frame of the parent's own kid as the reel thumbnail (only safe to do once #1 makes tags trustworthy). | Mat. 5 (late-night notification call-out). |
| — | **Full Reel Editor (trim + custom music)** | Classic say-do gap. 58% of surveyed parents name it their top *stated* ask, but only 6% opened the editor in 90 days and **fewer than 1% actually finished an edit.** Meanwhile the Share button is used on 90% of auto-recaps. Parents don't edit — they share, when the reel is right. Building a deep editor now is building for what people say, not what they do. I'd revisit with a minimal 1-tap trim experiment *after* #1 ships and we re-measure demand. | Mat. 2 (survey vs. usage). |
| — | **App icon rebrand + watermark regression** | Real issues, both small. Icon is a brand decision, not a roadmap item. Watermark is a bug, sized as a bug ticket. Neither moves renewal or core engagement meaningfully. | Mat. 3 (tickets 4–5, marked low-urgency). |

### Two things I'm explicitly saying no to (and why)

- **Full autonomous livestreaming in six weeks.** I would tell Carla and Jamal this directly, in the same call where I commit to Livestream Lite. Over-promising on reliability to save an at-risk renewal is how you guarantee churn and damage your reputation with the customer. The concrete "tap-to-start link" is the version we can ship with pride.
- **The full Reel Editor.** I'd explain the 6% / <1% data to the team and park it until correctness is fixed. If post-#1 parents still demand editing, we start with inline 1-tap trim, not a multi-track timeline with custom music.

### Recommended sequencing

1. **This sprint:** Tagging confidence + Coach Review. Single-highest-leverage thing we can do for the product.
2. **Starting immediately after Tagging is in beta, in parallel:** Livestream Lite, gated to Ridgeline for its pilot season to hit the six-week window.
3. **Riding along with #1:** 9 AM send-time + parent-kid thumbnails.
4. **Backlog (not committed this quarter):** Full editor (re-validate post-fix), broad livestreaming roadmap, app icon, watermark bug fix.

---

## Task 2 — The Spec: Roster Tagging Confidence & Coach Review

### Outcome (the measurable thing)

**Wrong-kid clips reach parents zero times per week for known number-confusion pairs, and coach review time stays under two minutes per game.**

Secondary metrics:
- Unopened-reel rate (currently ~30%) drops materially because thumbnails are trustworthy.
- Support tickets of the form "my kid's reel had a clip of a different child" trend to zero within two weeks of ship.
- Reel Share Rate (92% on opened reels) holds or rises as confidence in "that's my kid" goes up.

### One-line problem statement

The jersey-number detector silently assigns low-confidence or confused-number clips to a player, and parents see them; there is no human checkpoint between detection and delivery.

### In scope

1. **Per-clip confidence score (0–100)** emitted by the existing CV pipeline for every detected jersey number.
2. **Number-confusion pair list** curated from support data: `{1↔11, 4↔14, 12↔21, 13↔31, …}` and any number where the detector's second candidate is within 15 points of the top candidate.
3. **Three-state output per clip:**
   - **Auto-confirmed** (confidence ≥ 85% AND not on a confusion pair AND gap to second-best ≥ 30 points) → straight to the player's reel, coach never sees it.
   - **Coach review** (everything else) → held out of all reels until the coach confirms, reassigns, or skips.
   - **Rejected** (detected number not on the roster OR confidence < 30%) → surfaced to coach as "not sure / not on roster," never auto-assigned.
4. **Coach Review screen** (see prototype), surfaced once per game before recap send:
   - Shows **only flagged clips**, never auto-confirmed ones, to keep the queue short.
   - For each clip: thumbnail with detected-jersey overlay, play affordance on hover, highlight title + timestamp, a plain-English reason the clip is held, confidence bar with color-coded score, and 1–2 best-guess player pills reflecting the model's top two candidates.
   - One-tap confirm for each guess; one-tap "pick someone else" (full roster picker with search); one-tap "skip — not a highlight."
5. **Send is locked** until every flagged clip is resolved. Coach can save draft and come back.
6. **Feedback loop:** every coach correction is logged as a training signal back into the detector (club-level opt-in, on by default for new accounts).
7. **Notification timing:** recap and personal-reel notifications default to **9:00 AM local** the morning after the game, regardless of when processing finishes.
8. **Thumbnail preference:** the notification thumbnail for a parent is drawn from *their* kid's clips, not a generic team frame (only safe to ship alongside #1, so coupled).
9. **Micro-interaction detail from the prototype that is also in the spec:** when confidence is under 60% on a clip with two candidates, the order of the quick-confirm buttons is randomized per render to break muscle-memory tap-through (see Failure Mode 1).

### Out of scope

- **Model-only resolution of confusion pairs.** The support data proves the model gets these wrong today; shipping a model-only "fix" without a human gate is how we repeat the bug.
- **End-to-end CV retraining in this release.** The feedback loop is built; retraining is a follow-up cycle.
- **Parent-facing correction flow ("That's not my kid" button).** V1 routes corrections through the coach. Parent-initiated flagging creates an arbitration problem (parent vs. coach) and is explicitly v2.
- **Editing controls of any kind** — separate roadmap track.
- **Backfill re-tagging** of previously-sent reels.
- **Any livestreaming work** — separate parallel track, not in this spec.

### Where a human stays in the loop

- The **coach** is always the arbiter of flagged clips. The model never sends a low-confidence or confused assignment to a parent.
- **Parents** continue to escalate via support; those tickets route back to the coach and to our queue (same as today).
- **Ajaia ops** reviews aggregate confusion data weekly to expand the pair list (e.g., if 7↔17 starts spiking, we add it to auto-flag before the model catches up).

### Acceptance criteria (testable)

1. **AC-1 — Confusion pairs are held.** A clip where the detector's top-1 is #4 and top-2 is #14 (within 15 points) appears in Coach Review and is not assigned to any player until confirmed.
2. **AC-2 — High-confidence clips flow through.** A clip scored ≥ 90% on #7 with second-best < 60% is auto-assigned to #7 and does not appear in Coach Review.
3. **AC-3 — Off-roster numbers are held.** A clip read as #12 when no #12 exists on the roster is shown in Coach Review with a "closest match" suggestion (#21) and is not auto-assigned.
4. **AC-4 — One-tap confirm.** Tapping "That's #4 Sofia" assigns the clip to Sofia, removes it from the queue, and advances progress — no confirmation modal.
5. **AC-5 — Skip.** Tapping "Not a highlight / skip" keeps the clip out of every player's reel and marks it skipped in logs.
6. **AC-6 — Send lock.** "Send weekly recap" is disabled until every flagged clip is confirmed, reassigned, or skipped. Draft save is always enabled.
7. **AC-7 — Notification timing.** A game that finishes processing at 11:37 PM local does not notify parents until 9:00 AM the next calendar day.
8. **AC-8 — Parent-kid thumbnail.** Two parents on the same roster receive reel notifications with thumbnails of their own kid, not generic team frames (verifiable by comparing two sent notifications).
9. **AC-9 — Feedback logging.** Every confirm / reassign / skip is written to an event log with `game_id, clip_id, detected_number, coach_chosen_number, confidence, review_latency_ms`.
10. **AC-10 — Time budget.** For games with ≤ 5 flagged clips, median coach review is under 90 seconds (measured across beta coaches).
11. **AC-11 — No silent wrong assignments.** After GA, zero parent support tickets for wrong-kid clips on known confusion pairs over a rolling two-week window on beta clubs. (Non-confusion errors can still occur and are tracked separately.)
12. **AC-12 — Queue sizing.** If a coach sees > 10 flagged clips in a single game, that is paged as a model-quality regression rather than treated as coach workload.

### Top two failure modes (and what catches each)

**Failure mode 1 — Tap-through fatigue.** Coaches muscle-tap the first suggestion on every clip to get back to their day, and wrong assignments get rubber-stamped with coach approval attached.

- *Detection:* telemetry flags any coach with > 95% top-guess acceptance and < 2 second median decision time; post-send "wrong kid" reports are tracked separately and correlated against those coaches.
- *Mitigation in the spec:*
  - Queue is capped to flagged clips only (target ≤ 5 per game). If the queue is long, the model is broken, not the coach — AC-12 pages ML.
  - Quick-confirm button order is randomized on clips below 60% confidence so a consistent first-tap doesn't always land on the same guess.
  - There is no "Approve All" button. That was a deliberate removal: bulk-approve turns the entire review into theater.
  - Coach-friendly language throughout ("needs your eye," "held for review," not "error" / "mistake") to frame this as a quick collaboration with the product, not a chore.

**Failure mode 2 — Confidence thresholds are wrong** (too aggressive → queue is noisy and coaches ignore it; too loose → wrong clips slip through again and we ship the same bug with a UI wrapped around it).

- *Detection:* a dashboard tracks flag rate (flagged / detected clips), review completion rate, time-from-game-to-send, and post-send wrong-kid tickets per 1,000 clips. Thresholds are config, not hardcoded, and can be tuned without a release. Starting values: 85% confidence / 15-point second-best gap; we will tune weekly during beta.
- *Mitigation in the spec:* launch as a closed beta to Ridgeline plus three volunteer clubs for two weeks before broad rollout. If flag rate exceeds 25% of clips in beta, we tighten the confusion-pair logic before GA rather than ship a noisy queue to every coach.

---

## Task 3 — Working Prototype

The prototype is a single self-contained HTML file: `prototype/index.html`. Open it directly in any browser — no build step, no server, no dependencies.

**What it demonstrates (all running/clickable):**

- A polished Coach Review experience matching the spec, with the three real support-ticket scenarios from Material 3 seeded as flagged clips:
  1. Ridgeline — #4 / #14 digit transpose (the mom whose daughter wore #14 and got a #4 clip).
  2. Cobblestone Little League — #1 / #11 single/double-digit ambiguity.
  3. Brightwater Lacrosse — model reads #12, no #12 on roster, digit-swap to #21 Lucas.
- Per clip: thumbnail with a stylized field + detected jersey overlaid, confidence bar with color coding, plain-English reason, 1-tap confirm buttons (randomized order below 60% confidence per the spec mitigation), full-roster picker with search, and a skip action.
- Roster sidebar with live status indicators for players involved in flagged vs. confirmed clips.
- Live progress bar in a sticky footer, and a gradient "Send weekly recap" card that unlocks only when all flagged clips are resolved (AC-6).
- Celebration state on send with recap stats, and a note that corrections feed back into the tagger.
- Scheduled-send card showing 9 AM delivery time (AC-7), micro-animations, hover states, toast feedback, keyboard support (Esc closes the modal), and a responsive layout.

What the prototype intentionally does **not** build: login/upload flow, auto-confirmed clips (the coach never sees them per spec), parent-facing views, or a replay of the video itself — those aren't where the product risk lives this cycle.

---

## Task 4 — AI Workflow Note

I used AI to scaffold the prototype HTML/CSS/JS and to generate an initial document outline for the spec, because speed-to-a-clickable-thing is the part of this assessment where tool leverage is appropriate and where AI is strong. I treated its output as a first draft, not as final.

I kept the **roadmap ranking, the two explicit "no" calls (full livestreaming / full Reel Editor), the acceptance criteria, and the failure modes** deliberately human. Those decisions turn on reconciling a loud $180k ask with quieter data about a 30% unopened-reel problem — that is a judgment trade, not a calculation, and PM judgment is the thing being assessed.

**One specific thing AI got wrong that I overrode:** its first prototype draft included an "Approve All" button at the top of the queue and showed every clip (auto-confirmed included) for review. Both choices invite exactly the tap-through-fatigue failure mode I call out in the spec — if everything is shown and bulk-approved, the confidence score and the review screen are theater. I scoped the queue to flagged clips only, removed bulk-approve, and added the button-order randomization on low-confidence clips as an explicit mitigation. That's the kind of decision you only make if you're thinking about how real humans will actually use the thing you ship, which is the job.
