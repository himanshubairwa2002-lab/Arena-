# Scoring Method & Validation Framework
### How each idea was scored, what every factor means, and how to check "how many people are already doing this"
*Companion to `IDEAS_DEEP_DIVE.md`. Read this if you want to disagree with the ranking intelligently — every number here is adjustable.*

---

## Part 1 — Why a weighted model instead of a gut-feel list

Most "top digital product" lists are written from what sounds exciting. That produces the same list everywhere: courses, journals, MRR packs, "make money online". It also produces businesses that die at month two, because the product could never pay for its own advertising.

This model scores each idea 0–10 on nine factors, weights them, and adds them up. The weights encode three hard-won truths:

1. **Demand without an ad angle is worthless.** A product nobody can sell in an 8-second Reel is a product that never scales. Hence "Meta/Instagram fit" carries 15–18%.
2. **A low price only works if the order value is higher.** In 2026 the average cost per purchase on Meta is $25–$70 in the West and ₹380–₹1,200 in India. A ₹199 file alone cannot buy itself. Hence "ladder depth" is a full factor.
3. **A great product in a restricted category is a bad business.** Health, income and employment claims get ads rejected, accounts throttled and money burnt. Hence "policy safety" is scored, not assumed.

---

## Part 2 — The nine global factors

Each factor is judged on the same 1–10 band. The bands below are the actual rubric used.

### 1. Demand (weight 20%)
*How many people have this problem badly enough to pay for a fix?*
- **1–3** Narrow hobby audience, no urgency, no recurring need.
- **5** Real audience, mild urgency, buys once.
- **7** Large audience with a felt problem; buys repeatedly or annually.
- **9–10** Universal, emotionally urgent, permanently recurring — parents, exams, weddings, money, health.
*Evidence used:* Google Trends direction, marketplace search volume, community size, whether the problem is seasonal or every-month.

### 2. Meta-ad fit (18%)
*Can a stranger be convinced in 8 seconds of vertical video?*
- **1–3** Abstract, invisible, or requires reading (software, spreadsheets, "systems" with no visual).
- **5** Demonstrable but needs 20+ seconds or explanation.
- **7** Clear before/after or flip-through that works in one Reel.
- **9–10** The product *is* the creative — food, planners, templates, transformations, screen-record prompts.
*Evidence used:* whether winning ads in the category are video-led, whether the product can be shown hands-only, Reels' share of Instagram time (~50%), Reels CPM being 20–35% below Feed.

### 3. Money proof (15%)
*Is there documented evidence that real sellers get paid?*
- **1–3** "Seems like it should sell"; no sales counters anywhere.
- **5** Category-level proof only (the category sells, this product may not).
- **7** Named products with 1,000+ sales or documented revenue in the same category.
- **9–10** Named sellers with 5-figure+ revenue in this exact product type.
*Evidence used:* Etsy review/sales counters, Gumroad public sales proxies, platform earnings reports, documented creator revenue. **All of it is reported, not audited — treated as directional, never as a forecast.**

### 4. Upsell ladder (12%)
*Can the ₹199/$9 buyer be turned into a ₹1,299/$49 order?*
- **1–3** One-off file, nothing to add, nothing to renew.
- **5** One add-on possible (a bundle).
- **7** Bump + bundle + a course or service to sell.
- **9–10** Natural path from file → system → subscription/community → done-for-you service.
*Evidence used:* whether the category already sells bundles/subscriptions, and whether an adjacent service exists to sell (templates → retainer; food → coaching).

### 5. Margin & ease (10%)
*How much of the money survives, and how much support do you provide?*
- **1–3** Personalisation, printing, live elements, or heavy support per sale.
- **5** Digital but needs explaining; some refund risk.
- **9–10** A PDF or Sheet, delivered automatically, near-zero marginal cost, 85–95% gross margin.
*Evidence used:* file type, delivery automation, refund exposure.

### 6. Speed to launch (8%)
*How fast can a genuinely good v1 exist?*
- **3** Weeks of work, needs expert input or complex tooling.
- **7** A week of focused work.
- **10** One weekend in Canva/Sheets/Notion, sellable Monday.
*Evidence used:* production steps and whether accuracy/review is required.

### 7. Policy safety (7%)
*Will Meta let you advertise this at scale?*
- **1–3** Health outcomes, income claims, employment category, restricted finance.
- **5** Adjacent to restriction — needs careful wording and 18+ targeting.
- **7–9** Safe; claims are descriptive and provable.
- **10** Purely educational/decorative; no regulated claim exists.
*Evidence used:* Meta's health & wellness policy (rewritten July 2026), personal-attributes rules, the Employment Special Ad Category, and the 2026 tightening of implied-claim enforcement.

### 8. Low competition (6%)
*Inverted saturation. High score = open lane.*
- **1–3** Thousands of near-identical listings; price war already lost.
- **5** Crowded but segmented; a niche can still win.
- **7** Few serious, well-made competitors.
- **9–10** Almost nobody serving a large, obvious need.
*Evidence used:* search-result counts, review counts on top listings, active Meta Ad Library advertisers and ad longevity, marketplace "high sales volume" flags.

### 9. Evergreen (4%)
*Does it sell in every month, or only in a window?*
- **1–3** Single 2–4 week season.
- **5** Two to three real seasons.
- **9–10** Sells all year and still spikes (parents, money, health).
*Evidence used:* seasonal sales concentration data for the category.

---

## Part 3 — The nine India factors (what changed, and why)

India uses the same nine factors with three deliberate changes, because Indian buying behaviour is genuinely different.

| Change | Global factor | India factor | Why |
|---|---|---|---|
| **Replaced** | Margin & ease (10%) | **Price fit in ₹ (15%)** | Willingness to pay is the binding constraint in India, not margin. ₹199–₹499 converts; ₹999+ digital files convert far worse at the same quality. Price fit scores the *realistic* ₹ band and how easily that band clears ad costs. |
| **Replaced** | Speed to launch (8%) | **Payment & checkout (10%)** | In India, checkout friction destroys conversions. A product with a UPI/Razorpay/Topmate path scores 10; anything card-only, USD-only, or reliant on Western gateways scores far lower. |
| **Re-weighted** | Money proof (15%) | **India money proof (12%)** | Etsy counters are the wrong evidence for India. This factor scores Indian evidence specifically — creator-selling behaviour, Indian price bands in guides, Telegram/marketplace activity, documented Indian earnings where they exist. |
| Kept | Demand, Instagram fit, ladder, policy, competition, evergreen | same | These behave similarly in India, with judgement applied to Indian context. |

**Weights — India:** Demand 20 · Price fit 15 · Instagram fit 15 · India proof 12 · Payment 10 · Ladder 10 · Policy 8 · Competition 7 · Evergreen 3.

**Worked example (Wedding templates, India):**
`demand 10×0.20 = 2.00` + `price fit 10×0.15 = 1.50` + `IG fit 10×0.15 = 1.50` + `India proof 8×0.12 = 0.96` + `payment 10×0.10 = 1.00` + `ladder 8×0.10 = 0.80` + `policy 9×0.08 = 0.72` + `competition 6×0.07 = 0.42` + `evergreen 8×0.03 = 0.24` = **9.14** → India rank 1.

**Worked example (Perimenopause trackers, India):**
`5×0.20 = 1.00` + `6×0.15 = 0.90` + `6×0.15 = 0.90` + `proof 4×0.12 = 0.48` + `payment 10×0.10 = 1.00` + `ladder 6×0.10 = 0.60` + `policy 5×0.08 = 0.40` + `competition 8×0.07 = 0.56` + `evergreen 7×0.03 = 0.21` = **6.05** → India rank 20.

Notice the pattern in those two: the low-score idea scores *well* on competition (8) and payment (10) and still finishes last, because demand, price fit, proof and policy are what actually decide a business. That's the model doing its job.

---

## Part 4 — Validation: "how many people are already doing this?"

Competition is the easiest factor to check and the most often guessed. This is the exact method, in the order you should run it.

### The six signals

| # | Signal | Where | What it tells you |
|---|---|---|---|
| 1 | **Marketplace saturation** | Etsy search for the product term | Listing count = supply. But ignore the raw number: filter to listings with **1,000+ reviews** — those are the ones actually selling. |
| 2 | **Active advertiser count** | Meta Ad Library (filter: India / All, Active) | 0–3 active advertisers = untested or banned. 4–15 = healthy, proven. 50+ = bloodbath. |
| 3 | **Ad longevity** | Meta Ad Library "started running on" date | This is the single best profit signal available. Nobody keeps paying for a losing ad for 3 months. Long-running + multiple creatives = the offer works. |
| 4 | **Free-content density** | Telegram channels, YouTube, Instagram saves | High free supply means the paid product must be *systematic* (updates, tests, community, personalisation), not informational. |
| 5 | **Price visibility** | Instagram bios, DM-for-price, Gumroad/Topmate pages | If nobody displays a price, the market's willingness to pay is unproven. If you see ₹499 and ₹999 repeatedly, it's proven. |
| 6 | **Peer proof** | Reddit/YouTube income reports, seller interviews | The only place you'll find refund rates, CPA and reality. Search "[product] income report" and "[platform] refund rate". |

### How to read the numbers (as used in this document)

| What you find | Reading | Action |
|---|---|---|
| Many listings, few with 1,000+ reviews | Volume demand, weak incumbents | **Enter** with better packaging and a bundle |
| Many listings, many with 1,000+ reviews | Saturated, price war | Enter only with a niche or a distribution advantage |
| Few listings, strong engagement | Open lane | **Enter fast**, expect to educate the buyer |
| Ad Library: 5–15 active, 60+ days running | Proven offer | Copy the *structure*, not the creative |
| Ad Library: 50+ active, mostly <30 days | Crowded and churning | Avoid unless you have creative advantage |
| Free Telegram/YouTube flood | Information is commoditised | Sell updates, tests, community or done-for-you |
| Nobody shows a price anywhere | Demand unproven | Test with ₹99–₹199 before building big |

### Worked example — how the exam-prep idea was read

1. **Marketplace:** little on Etsy (this market lives on Instagram and Telegram, not Etsy) → *signal 1 is invalid here, note it and move on.*
2. **Ad Library (India), "REET notes" / "Patwar notes":** a modest number of active advertisers, several running continuously through the exam season → *proven willingness to pay.*
3. **Telegram:** directories list 765+ UPSC channels alone, with individual channels at 90k–600k subscribers giving away free PDFs → *free-content density is extreme; information is worthless here.*
4. **Price visibility:** sellers openly show ₹99, ₹199, ₹499 in bios → *willingness to pay proven at low price points, not at ₹2,000+.*
5. **Peer proof:** coaching giants sell ₹1,000–₹5,000/year subscriptions → *the ceiling exists and is being paid, but only by brands with trust.*
6. **Conclusion:** demand 10, proof 9, competition 4, ladder 8 → ranked **#4 in India** with the explicit instruction to sell a *monthly-updated subscription and mock tests*, not a static PDF, because static PDFs leak on Telegram within days.

That reasoning chain is reproduced inside every idea card, so you can re-run it yourself the week you launch.

### What the model deliberately does NOT score

- **Your skill at the craft.** A #4 idea executed badly loses to a #18 idea executed well.
- **Your existing audience.** 10,000 engaged followers is worth more than any score here.
- **Creative quality.** Ad creative decides roughly 70% of results; that's an execution variable, not an idea variable.
- **Luck, timing, and platform mood.** Two sellers, same product, different months.
- **Ad-account health.** A restricted Business Manager changes every number above.

---

## Part 5 — Re-ranking it for yourself

The scores are data, not scripture. Everything lives in editable files:

1. Open `content_1.py` / `content_2.py` — each idea's descriptive content lives here.
2. Open `build.py` — the `INDIA_SCORES` dictionary holds all 180 India scores (20 ideas × 9 factors), and `I_FACTORS` holds the weights.
3. Change what you disagree with, then run:
```bash
python3 build.py
```
That regenerates `IDEAS_DEEP_DIVE.md`, `top20_scored.csv` and `dashboard.html` with your ranking. If you think policy risk matters more than 8%, change the weight and watch the order move — that's the honest way to decide, not argument.

**A useful exercise:** drop `price_fit` to 10% and raise `demand` to 25%. Weddings, exam prep and Canva kits stay on top; personalisation and craft patterns climb; Notion and perimenopause fall further. That tells you something real: in India, this is a demand-driven market, and packaging is your differentiator.
