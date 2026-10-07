#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builds the India-first deliverables:
  IDEAS_DEEP_DIVE.md   full descriptive write-up of all 20 ideas, ordered by India score
  top20_scored.csv     both score sets + every descriptive field
  dashboard.html       interactive India/Global dashboard

Global scores come from build_data.py (single source of truth).
India scores + all descriptive content come from content_1.py / content_2.py.
"""
import csv, html, importlib.util, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from content_1 import CONTENT_1
from content_2 import CONTENT_2

# ---- global scores (single source of truth) ---------------------------------
spec = importlib.util.spec_from_file_location("bd", os.path.join(HERE, "global_scores.py"))
bd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bd)
GLOBAL = {p["name"]: p for p in bd.P}
G_FACTORS = bd.FACTORS  # [("demand",0.20,"Demand"), ...]

# ---- India rubric -----------------------------------------------------------
I_FACTORS = [
    ("demand",       0.20, "Demand in India"),
    ("price_fit",    0.15, "Price fit (₹)"),
    ("ig_fit",       0.15, "Instagram fit (India)"),
    ("proof",        0.12, "India money proof"),
    ("payment",      0.10, "Payment & checkout"),
    ("ladder",       0.10, "Ladder depth (₹)"),
    ("policy",       0.08, "Policy safety"),
    ("comp",         0.07, "Low competition"),
    ("evergreen",    0.03, "Evergreen / repeat"),
]

# Union of both rubrics so the two sides can be shown side by side (label, india_key, india_w, global_key, global_w)
_F = {k: (w, l) for k, w, l in I_FACTORS}
_G = {k: (w, l) for k, w, l in G_FACTORS}
FACTOR_MAP = [
    ("Demand",                        "demand",      _F["demand"][0],      "demand",         _G["demand"][0]),
    ("Price fit in ₹",              "price_fit",   _F["price_fit"][0],   None,             None),
    ("Instagram / Meta ad fit",       "ig_fit",      _F["ig_fit"][0],      "meta_fit",       _G["meta_fit"][0]),
    ("Money proof",                   "proof",       _F["proof"][0],       "money_proof",    _G["money_proof"][0]),
    ("Payment & checkout",            "payment",     _F["payment"][0],     None,             None),
    ("Offer ladder depth",            "ladder",      _F["ladder"][0],      "upsell_ladder",  _G["upsell_ladder"][0]),
    ("Policy safety",                 "policy",      _F["policy"][0],      "policy_safety",  _G["policy_safety"][0]),
    ("Low competition",               "comp",        _F["comp"][0],        "low_competition",_G["low_competition"][0]),
    ("Evergreen / repeat",            "evergreen",   _F["evergreen"][0],   "evergreen",      _G["evergreen"][0]),
    ("Margin & ease",                 None,          None,                 "margin_ease",    _G["margin_ease"][0]),
    ("Speed to launch",               None,          None,                 "speed_to_launch",_G["speed_to_launch"][0]),
]

INDIA_SCORES = {
 "Budget systems, cash-stuffing kits & debt-payoff spreadsheets": (7.5,7,7,6,10,8,8,6,8),
 "ADHD / neurodivergent planners & life systems": (6,7,7,5,10,7,8,8,7),
 "Wedding & event template suites (Canva/editable)": (10,10,10,8,10,8,9,6,8),
 "Kids' educational printables, homeschool & screen-free activity bundles": (9.5,9,8,8,10,8,10,6,9),
 "Canva template packs for small businesses & social media kits": (9.5,9,9,9,10,9,9,6,9),
 "Nursing / medical-student study bundles": (9,8,7,8,10,7,9,6,8),
 "Digital iPad / GoodNotes planners & hyperlinked systems": (5,6,6,4,10,6,10,8,6),
 "Reading journals, book trackers & bookish products": (5,6,6,4,10,5,10,7,6),
 "AI prompt packs & 'AI for [profession]' playbooks": (9,7,9,6,10,7,8,4,6),
 "Resume / LinkedIn / job-search kits (ATS-ready)": (9.5,8,8,8,10,8,8,6,8),
 "Faith-based devotionals, prayer journals & scripture study guides": (6,6,7,4,10,5,8,7,8),
 "GLP-1 companion guides & high-protein meal plans": (7,8,8,6,10,7,5,6,7),
 "Printable wall art, gallery-wall bundles & poster sets": (6,6,7,5,10,5,9,4,7),
 "Personalised kids' storybooks & AI-made personalised gifts": (7,8,8,5,10,7,8,7,7),
 "Certification & exam-prep cheat sheets (licence, board, bootcamp)": (10,9,8,9,10,8,9,4,8),
 "Notion / business 'operating system' templates": (6,6,7,5,10,7,9,7,6),
 "Crochet / knitting patterns & SVG craft files": (8,7,8,7,10,7,10,6,8),
 "Perimenopause / hormone-health trackers & doctor-visit kits": (5,6,6,4,10,6,5,8,7),
 "Faceless-instagram / theme-page growth guides + MRR-PLR resell packs": (9,8,10,8,10,7,5,3,5),
 "Manifestation, shadow-work & spiritual journals": (7,7,8,5,10,6,6,5,7),
}

# ---- merge ------------------------------------------------------------------
IDEAS = []
for name, g in GLOBAL.items():
    c1, c2 = CONTENT_1.get(name), CONTENT_2.get(name)
    content = c1 or c2
    if not content:
        raise SystemExit("missing content for: " + name)
    i_scores = dict(zip([f[0] for f in I_FACTORS], INDIA_SCORES[name]))
    india_total = round(sum(i_scores[k] * w for k, w, _ in I_FACTORS), 2)
    row = dict(name=name, category=g["category"], global_total=g["total"], global_scores=g["scores"],
               india_total=india_total, india_scores=i_scores, **content)
    IDEAS.append(row)

IDEAS.sort(key=lambda x: (-x["india_total"], -x["india_scores"]["demand"], -x["global_total"]))
for n, r in enumerate(IDEAS, 1):
    r["india_rank"] = n
    r["global_rank"] = GLOBAL[r["name"]]["__rank"] if "__rank" in GLOBAL[r["name"]] else None
gorder = [p["name"] for p in sorted(GLOBAL.values(), key=lambda p: -p["total"])]
for r in IDEAS:
    r["global_rank"] = gorder.index(r["name"]) + 1

print("India ranking:")
for r in IDEAS:
    print(f"  {r['india_rank']:2d}. {r['india_total']:5.2f}  (global #{r['global_rank']:2d})  {r['name'][:62]}")

# ---- CSV --------------------------------------------------------------------
cols = (["india_rank", "global_rank", "product", "category", "india_score", "global_score",
         "price_india", "aov_india", "price_global", "aov_global"]
        + ["i_" + k for k, _, _ in I_FACTORS] + ["g_" + k for k, _, _ in G_FACTORS]
        + ["whats_inside", "buyers_india", "buyers_global", "why_it_works", "india_twist",
           "proof_global", "proof_india", "competition_global", "competition_india",
           "how_to_validate", "why_this_score", "ladder_india", "ladder_global",
           "hooks_india", "hooks_global", "watch_india", "watch_global"])
with open(os.path.join(HERE, "top20_scored.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(cols)
    for r in IDEAS:
        w.writerow([r["india_rank"], r["global_rank"], r["name"], r["category"], r["india_total"],
                    r["global_total"], r["price_india"], r["aov_india"], r["price_global"], r["aov_global"]]
                   + [r["india_scores"][k] for k, _, _ in I_FACTORS]
                   + [r["global_scores"][k] for k, _, _ in G_FACTORS]
                   + [" | ".join(r["contents"]), r["buyers_india"], r["buyers_global"], r["why_meta"],
                      r["india_twist"], r["proof_global"], r["proof_india"], r["comp_global"], r["comp_india"],
                      " | ".join(r["verify"]), r["score_notes"], r["ladder_india"], r["ladder_global"],
                      " | ".join(r["hooks_india"]), " | ".join(r["hooks_global"]),
                      r["watch_india"], r["watch_global"]])

# ---- Markdown deep dive -----------------------------------------------------
def md_list(items):
    return "\n".join(f"- {i}" for i in items)

L = []
A = L.append
A("# Top 20 Low-Ticket Digital Products — India First, Then Global")
A("### Full description of every idea: what's inside, who buys it, how it was scored, how it's validated, how it makes money, and what can go wrong")
A("*Compiled October 2026 · Himanshu Bairwa · prioritised for India, with the foreign-market version of each idea*")
A("")
A("---")
A("")
A("## How to read this document")
A("")
A("Each of the 20 ideas is described in the same 12 blocks so you can compare them like-for-like:")
A("")
A("| Block | What it tells you |")
A("|---|---|")
A("| **Score & rank** | India rank vs global rank, and the two weighted scores |")
A("| **Factor table** | Every individual score, India side by side with global |")
A("| **Price & AOV** | What you charge, and what an average order is worth after bumps/upsells |")
A("| **What's inside** | The actual deliverable — file by file. This is what you would build. |")
A("| **Who buys — India / Foreign** | The buyer, described specifically enough to write an ad to |")
A("| **Why it works on Meta** | Why an Instagram/Facebook ad can sell this to a stranger |")
A("| **The India twist** | How the idea changes for Indian buyers, language and pricing |")
A("| **Money proof** | Reported sales/revenue numbers, global and India |")
A("| **Competition** | How crowded it is, and where the open lane is |")
A("| **How to validate it yourself** | The exact searches to run, in order |")
A("| **Why it scored this way** | The specific factors that raised or lowered its rank |")
A("| **Offer ladder** | The ₹ (and $) sequence that makes a low ticket profitable |")
A("| **Ad hooks** | Real opening lines for Reels, India and global |")
A("| **Watch-outs** | Platform policy, legal, India-specific and operational risks |")
A("")
A("**Every revenue figure in this document is a reported marketplace number or creator report, not audited data.**")
A("Treat them as evidence that buyers exist — never as a forecast of your results. Verification steps are included")
A("for exactly this reason: the search counts change, and you should check them the week you launch.")
A("")
A("---")
A("")
A("## India leaderboard (the ranking you asked for)")
A("")
A("| # | Idea | India score | Global rank | India price band | Target AOV |")
A("|---|---|---|---|---|---|")
for r in IDEAS:
    A(f"| {r['india_rank']} | **{r['name']}** | {r['india_total']:.2f} | #{r['global_rank']} | {r['price_india']} | {r['aov_india']} |")
A("")
A("### The India scoring model")
A("")
A("Score (0–10 per factor, weighted): **Demand in India 20% · Price fit in ₹ 15% · Instagram fit 15% · India money proof 12% · Payment & checkout 10% · Ladder depth 10% · Policy safety 8% · Low competition 7% · Evergreen 3%**")
A("")
A("The India model differs from the global one in three deliberate ways: **price ceiling** replaces raw willingness-to-pay")
A("(Indians convert beautifully at ₹199–₹499 and resist ₹999+ digital files), **payment & checkout** becomes a full factor")
A("(UPI is why India converts, and card-only Western stores are why it doesn't), and **proof** is weighted to India-specific")
A("evidence rather than Etsy counters. Global-to-India rank shifts are the most useful thing in this document: **weddings,")
A("exam prep, Canva kits, nursing notes and resume kits move up; iPad planners, reading journals, wall art and")
A("perimenopause trackers move down.** Full rubric: `SCORING_METHOD.md`. India economics: `INDIA_PLAYBOOK.md`.")
A("")
A("---")
A("")

for r in IDEAS:
    A(f"## {r['india_rank']}. {r['name']}")
    A("")
    A(f"**Category:** {r['category']}  ·  **India score: {r['india_total']:.2f}** (global rank #{r['global_rank']}, global score {r['global_total']:.2f})")
    A("")
    A(f"| Factor | India score (weight) | Global score (weight) |")
    A("|---|---|---|")
    for label, ik, iw, gk, gw in FACTOR_MAP:
        iv = f"**{r['india_scores'][ik]}** ({int(iw*100)}%)" if ik else "—"
        gv = f"{r['global_scores'][gk]} ({int(gw*100)}%)" if gk else "—"
        A(f"| {label} | {iv} | {gv} |")
    A(f"| **Weighted total** | **{r['india_total']:.2f}** | **{r['global_total']:.2f}** |")
    A("")
    A(f"**Price — India:** {r['price_india']} · **Target AOV (India):** {r['aov_india']}")
    A(f"**Price — Foreign:** {r['price_global']} · **Target AOV (global):** {r['aov_global']}")
    A("")
    A("### What's inside (the actual product)")
    A("")
    A(md_list(r["contents"]))
    A("")
    A("### Who buys it")
    A("")
    A(f"- **India:** {r['buyers_india']}")
    A(f"- **Foreign:** {r['buyers_global']}")
    A("")
    A("### Why it works on Meta")
    A("")
    A(r["why_meta"])
    A("")
    A("**The India twist:** " + r["india_twist"])
    A("")
    A("### Money proof (who is actually making money)")
    A("")
    A(f"- **Global evidence:** {r['proof_global']}")
    A(f"- **India evidence:** {r['proof_india']}")
    A("")
    A("### Competition — how many people are doing this")
    A("")
    A(f"- **Global:** {r['comp_global']}")
    A(f"- **India:** {r['comp_india']}")
    A("")
    A("**How to validate it yourself (do this before spending a rupee):**")
    A("")
    for i, v in enumerate(r["verify"], 1):
        A(f"{i}. {v}")
    A("")
    A("### Why it scored this way")
    A("")
    A(r["score_notes"])
    A("")
    A("### The offer ladder (this is what makes a low ticket profitable)")
    A("")
    A(f"- **India:** {r['ladder_india']}")
    A(f"- **Foreign:** {r['ladder_global']}")
    A("")
    A("### Ad hooks you could film this week")
    A("")
    A("**India (Hinglish):**")
    A("")
    A(md_list(r["hooks_india"]))
    A("")
    A("**Foreign (English):**")
    A("")
    A(md_list(r["hooks_global"]))
    A("")
    A("### Watch-outs")
    A("")
    A(f"- **India:** {r['watch_india']}")
    A(f"- **Foreign:** {r['watch_global']}")
    A("")
    A("---")
    A("")

A("## India-native bonus ideas (not in the global 20)")
A("")
A("These surfaced repeatedly in the India research and are worth testing alongside the ranked list — they are India-first")
A("products with no direct Western equivalent, so they don't fit a global ranking table.")
A("")
BONUS = [
 ("Spoken English & interview English for Tier-2/3 job seekers",
  "₹299–₹999",
  "The single largest paid-demand education market in India. 30-day speaking plans, 500 daily-use sentences, interview answer banks, pronunciation drills with audio, and WhatsApp voice-note practice groups. Huge Reels engagement, buyers in the 18–28 range, and a natural ₹999 course upsell."),
 ("Regional-language exam notes (Hindi, Marathi, Tamil, Telugu, Bengali)",
  "₹199–₹699",
  "Almost every exam-notes seller works in English; the largest aspirant volume is not in English. Pick ONE exam in ONE language and own it. The 765+ UPSC Telegram-channel directory and 90k–600k subscriber channels show the appetite; language is your moat."),
 ("Digital invitation & event-video studio (CapCut/Canva project files)",
  "₹499–₹2,999",
  "Invitation *videos* sent on WhatsApp are now the default for Indian weddings, birthdays and naming ceremonies. Sell editable project files plus a done-for-you option. Recurring: every family has multiple events a year, and wedding planners buy in bulk."),
 ("GST, invoicing & payment-follow-up kits for shopkeepers and freelancers",
  "₹299–₹999",
  "Millions of small Indian businesses need GST invoices, UPI reconciliation, expense tracking and polite payment-reminder templates. Sheets + Word templates + a Hinglish walkthrough. B2B pricing, low refunds, and a natural ₹2,000+/mo service upsell."),
 ("Astrology, numerology & vastu printables",
  "₹199–₹999",
  "Mainstream in India, fringe in the West — a genuine asymmetry. Panchang planners, birth-chart workbooks (blank), vastu room checklists, numerology name sheets. Enormous engagement, low competition in paid products. Never make predictive or outcome promises (policy and consumer-protection risk)."),
 ("WhatsApp / Instagram growth kits for local businesses",
  "₹499–₹1,999",
  "Not just templates: a 30-day content plan, 100 hooks in Hinglish, WhatsApp broadcast scripts, review-request messages, and festival campaign calendars — built for salons, clinics, gyms and coaching centres. Upsells into a ₹4,999/mo retainer faster than any other product here."),
 ("Festival decor & gifting printable kits (Diwali, Navratri, Rakhi, Christmas)",
  "₹199–₹999",
  "A 3–4 week revenue spike every year, repeatable across four or five festivals, with a genuine B2B lane in corporate Diwali gifting. Build September to sell in October; run the same playbook for every festival in the calendar."),
]
for name, price, desc in BONUS:
    A(f"### {name}")
    A(f"**Price band:** {price}")
    A("")
    A(desc)
    A("")

A("---")
A("")
A("## Files in this folder")
A("")
A("- **`IDEAS_DEEP_DIVE.md`** — this document (India-ranked, fully descriptive)")
A("- **`INDIA_PLAYBOOK.md`** — India ad economics in ₹, payment/GST stack, WhatsApp funnel, language, festive calendar, policy")
A("- **`SCORING_METHOD.md`** — every factor defined, with the 1–10 band rubric and evidence sources")
A("- **`REPORT.md`** — the original global-first write-up (still useful for US/EU markets)")
A("- **`top20_scored.csv`** — both score sets plus every descriptive field, if you want to re-sort it yourself")
A("- **`dashboard.html`** — interactive version: search, filter, sort, India/Global toggle")
A("")

with open(os.path.join(HERE, "IDEAS_DEEP_DIVE.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(L))
print("wrote IDEAS_DEEP_DIVE.md", len("\n".join(L)), "chars")

# ---- dashboard --------------------------------------------------------------
payload = json.dumps([dict(
    ir=r["india_rank"], gr=r["global_rank"], name=r["name"], cat=r["category"],
    it=r["india_total"], gt=r["global_total"], isc=r["india_scores"], gsc=r["global_scores"],
    pi=r["price_india"], ai=r["aov_india"], pg=r["price_global"], ag=r["aov_global"],
    inside=r["contents"], bi=r["buyers_india"], bg=r["buyers_global"], why=r["why_meta"],
    tw=r["india_twist"], pgr=r["proof_global"], pin=r["proof_india"],
    cgr=r["comp_global"], cin=r["comp_india"], verify=r["verify"], note=r["score_notes"],
    li=r["ladder_india"], lg=r["ladder_global"], hi=r["hooks_india"], hg=r["hooks_global"],
    wi=r["watch_india"], wg=r["watch_global"],
) for r in IDEAS], ensure_ascii=False)

HTML = r"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Top 20 Low-Ticket Digital Products — India First</title>
<style>
:root{--bg:#0a0c11;--panel:#131822;--panel2:#1a212e;--line:#242c3c;--txt:#e9edf5;--mut:#8b97ad;--acc:#f9a825;--acc2:#22c55e;--blue:#60a5fa;--warn:#fbbf24;--bad:#f87171}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(1100px 560px at 12% -8%,#2a2113 0%,var(--bg) 58%);color:var(--txt);
 font:15px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Inter,sans-serif}
.wrap{max-width:1260px;margin:0 auto;padding:34px 20px 90px}
h1{font-size:clamp(23px,3.3vw,38px);line-height:1.15;margin:0 0 10px;letter-spacing:-.5px}
h1 span{background:linear-gradient(90deg,var(--acc),var(--acc2));-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:var(--mut);max-width:88ch;margin:0 0 22px}
.stats{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 22px}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:11px 15px;min-width:132px}
.stat b{display:block;font-size:19px;color:var(--acc)}
.stat small{color:var(--mut);font-size:11px;text-transform:uppercase;letter-spacing:.5px}
.controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 8px}
input[type=search],select{background:var(--panel);color:var(--txt);border:1px solid var(--line);border-radius:9px;padding:9px 12px;font-size:14px}
input[type=search]{min-width:240px}
.toggle{display:inline-flex;background:var(--panel);border:1px solid var(--line);border-radius:99px;padding:3px}
.toggle button{background:none;border:0;color:var(--mut);padding:7px 16px;border-radius:99px;cursor:pointer;font-size:13.5px;font-weight:600}
.toggle button.on{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0a0c11}
.hint{color:var(--mut);font-size:12.5px}
.cards{display:grid;gap:13px;margin-top:16px}
.card{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:16px;overflow:hidden}
.card summary{list-style:none;cursor:pointer;padding:15px 18px;display:grid;grid-template-columns:54px 1fr auto;gap:14px;align-items:center}
.card summary::-webkit-details-marker{display:none}
.rank{font:700 19px/1 ui-monospace,Menlo,monospace;color:#0a0c11;background:linear-gradient(135deg,var(--acc),var(--acc2));
 width:44px;height:44px;border-radius:11px;display:grid;place-items:center}
.t{font-weight:650;font-size:16.5px;letter-spacing:-.2px}
.meta{color:var(--mut);font-size:12.5px;margin-top:3px}
.score{text-align:right;white-space:nowrap}
.score b{font-size:19px;color:var(--acc)} .score small{display:block;color:var(--mut);font-size:11px}
.body{padding:2px 18px 20px;border-top:1px solid var(--line)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:14px}
@media(max-width:880px){.grid{grid-template-columns:1fr}.card summary{grid-template-columns:44px 1fr}.score{grid-column:2}}
h4{margin:14px 0 5px;font-size:11.5px;letter-spacing:1px;text-transform:uppercase;color:var(--acc)}
h4.b{color:var(--blue)} h4.g{color:var(--acc2)}
p,ul{margin:0 0 10px;color:#cdd5e4;font-size:14px}
ul{padding-left:18px}
.bars{display:grid;gap:5px;margin:12px 0}
.bar{display:grid;grid-template-columns:150px 1fr 46px;gap:8px;align-items:center;font-size:11.5px;color:var(--mut)}
.track{height:7px;background:#0d1119;border-radius:99px;overflow:hidden}
.fill{height:100%;background:linear-gradient(90deg,var(--acc),var(--acc2))}
.warn{border-left:3px solid var(--warn);background:#2a2213;padding:10px 12px;border-radius:0 8px 8px 0;font-size:13.5px;color:#f6e2b8;margin-bottom:10px}
.bad{border-left:3px solid var(--bad);background:#2b1616;padding:10px 12px;border-radius:0 8px 8px 0;font-size:13.5px;color:#f8caca;margin-bottom:10px}
.pill{display:inline-block;background:#0d1119;border:1px solid var(--line);border-radius:99px;padding:3px 10px;font-size:11.5px;color:var(--mut);margin:0 6px 6px 0}
.note{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px;color:#cdd5e4;font-size:13.5px;margin-top:24px}
.note b{color:var(--txt)}
footer{color:var(--mut);font-size:12px;margin-top:28px;border-top:1px solid var(--line);padding-top:15px}
</style></head><body><div class="wrap">
<h1>Top 20 low-ticket digital products <span>India first, then global</span></h1>
<p class="sub">Ideas ranked for the Indian market first (price in ₹, UPI checkout, Hinglish hooks, WhatsApp funnel) with the foreign-market version of each idea alongside it. Every card explains what's inside the product, who buys it, what the money proof is, how crowded it is, how to validate it yourself, and how the offer ladder makes a low ticket profitable.</p>
<div class="stats">
  <div class="stat"><b>₹45-400</b><small>India Meta CPM</small></div>
  <div class="stat"><b>₹3-25</b><small>India CPC</small></div>
  <div class="stat"><b>₹199-999</b><small>India price sweet spot</small></div>
  <div class="stat"><b>9x</b><small>cheaper than US inventory</small></div>
  <div class="stat"><b>85-95%</b><small>gross margin</small></div>
</div>
<div class="controls">
  <div class="toggle"><button id="bIN" class="on">India</button><button id="bGL">Global</button></div>
  <input type="search" id="q" placeholder="Search idea, buyer, product, hook…"/>
  <select id="cat"><option value="">All categories</option></select>
  <select id="sort">
    <option value="score">Sort: overall score</option>
    <option value="demand">Sort: demand</option>
    <option value="price_fit">Sort: price fit</option>
    <option value="ig_fit">Sort: Instagram fit</option>
    <option value="proof">Sort: money proof</option>
    <option value="comp">Sort: least saturated</option>
    <option value="payment">Sort: payment fit</option>
    <option value="ladder">Sort: ladder depth</option>
  </select>
  <span class="hint" id="count"></span>
</div>
<div class="cards" id="cards"></div>
<div class="note">
<b>Read the numbers honestly.</b> Scores are a structured judgement, not a measurement — the evidence behind them is marketplace and creator reporting, which is directional. Every card lists the exact searches to run yourself, because competition in this space changes monthly.
Weighting — India: demand 20 · price fit 15 · Instagram fit 15 · money proof 12 · payment 10 · ladder 10 · policy 8 · competition 7 · evergreen 3.
Global: demand 20 · Meta-fit 18 · money proof 15 · ladder 12 · margin 10 · speed 8 · policy 7 · competition 6 · evergreen 4.
</div>
<footer>Himanshu Bairwa · compiled October 2026 · <code>IDEAS_DEEP_DIVE.md</code> has the full written version, <code>INDIA_PLAYBOOK.md</code> the ₹ economics and checkout stack, <code>SCORING_METHOD.md</code> the rubric.</footer>
</div>
<script>
const DATA = __DATA__;
const IF = __IF__;
const GF = __GF__;
let MODE = 'in';
const cards=document.getElementById('cards'), q=document.getElementById('q'), cat=document.getElementById('cat'),
      sort=document.getElementById('sort'), count=document.getElementById('count'),
      bIN=document.getElementById('bIN'), bGL=document.getElementById('bGL');
const cats=[...new Set(DATA.map(d=>d.cat))].sort();
cats.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;cat.appendChild(o);});
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
function render(){
  const term=q.value.trim().toLowerCase(), c=cat.value, s=sort.value, isIN = MODE==='in';
  const F = isIN?IF:GF;
  let rows=DATA.filter(d=>(!c||d.cat===c)&&(!term||(d.name+' '+d.cat+' '+d.bi+' '+d.bg+' '+d.inside.join(' ')+' '+d.why+' '+d.tw+' '+d.hi.join(' ')+' '+d.hg.join(' ')+' '+d.wi+' '+d.wg).toLowerCase().includes(term)));
  rows=rows.slice().sort((a,b)=>{
    if(s==='score') return isIN ? b.it-a.it : b.gt-a.gt;
    const ka='i_'+s, kb='g_'+s, k = isIN?ka:kb;
    const av=isIN?a.isc[s]:a.gsc[s], bv=isIN?b.isc[s]:b.gsc[s];
    return (bv-av) || (isIN ? b.it-a.it : b.gt-a.gt);
  });
  count.textContent=rows.length+' of '+DATA.length+' shown · sorted for '+(isIN?'India':'global');
  cards.innerHTML=rows.map(d=>{
    const score=isIN?d.it:d.gt, other=isIN?d.gt:d.it, rk=isIN?d.ir:d.gr, ork=isIN?d.gr:d.ir;
    const price=isIN?d.pi:d.pg, aov=isIN?d.ai:d.ag;
    const buyers=isIN?d.bi:d.bg, hooks=isIN?d.hi:d.hg, ladder=isIN?d.li:d.lg;
    return `<details class="card">
      <summary>
        <div class="rank">${rk}</div>
        <div><div class="t">${esc(d.name)}</div>
          <div class="meta">${esc(d.cat)} · ${esc(price)} · target AOV ${esc(aov)} · ${isIN?'global':'India'} rank #${ork}</div></div>
        <div class="score"><b>${score.toFixed(2)}</b><small>${isIN?'India score':'global score'} / 10</small></div>
      </summary>
      <div class="body">
        <div class="bars">${F.map(f=>{
          const v = isIN ? d.isc[f[0]] : d.gsc[f[0]];
          return `<div class="bar"><span>${f[2]} (${Math.round(f[1]*100)}%)</span>
            <span class="track"><span class="fill" style="width:${v*10}%"></span></span><span>${v}</span></div>`;
        }).join('')}</div>
        <div class="grid">
          <div>
            <h4>What's inside (the product you'd build)</h4><ul>${d.inside.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
            <h4>Who buys it — ${isIN?'India':'foreign'}</h4><p>${esc(buyers)}</p>
            <h4>Why it works on Meta</h4><p>${esc(d.why)}</p>
            <h4>The India twist</h4><p>${esc(d.tw)}</p>
            <h4 class="g">Money proof — global</h4><p>${esc(d.pgr)}</p>
            <h4 class="g">Money proof — India</h4><p>${esc(d.pin)}</p>
          </div>
          <div>
            <h4 class="b">Competition — global</h4><p>${esc(d.cgr)}</p>
            <h4 class="b">Competition — India</h4><p>${esc(d.cin)}</p>
            <h4 class="b">How to validate it yourself</h4><ul>${d.verify.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
            <h4>Why it scored this way</h4><p>${esc(d.note)}</p>
            <h4>Offer ladder — ${isIN?'India (₹)':'foreign ($)'}</h4><p>${esc(ladder)}</p>
            <h4>Ad hooks — ${isIN?'India (Hinglish)':'foreign (English)'}</h4><ul>${hooks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
            <div class="${isIN?'bad':'warn'}">${esc(isIN?d.wi:d.wg)}</div>
          </div>
        </div>
      </div></details>`;}).join('');
}
bIN.onclick=()=>{MODE='in';bIN.classList.add('on');bGL.classList.remove('on');render();};
bGL.onclick=()=>{MODE='gl';bGL.classList.add('on');bIN.classList.remove('on');render();};
q.addEventListener('input',render);cat.addEventListener('change',render);sort.addEventListener('change',render);
render();
</script></body></html>"""

HTML = (HTML.replace("__DATA__", payload)
            .replace("__IF__", json.dumps([[k, w, l] for k, w, l in I_FACTORS]))
            .replace("__GF__", json.dumps([[k, w, l] for k, w, l in G_FACTORS])))
with open(os.path.join(HERE, "dashboard.html"), "w", encoding="utf-8") as f:
    f.write(HTML)
print("wrote dashboard.html")
