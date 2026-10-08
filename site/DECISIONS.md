# Decisions

Why this site looks and reads the way it does. Written for whoever maintains it next, and for
anyone who wants to argue with a specific choice rather than the whole thing.

---

## 1. The brand name

Three candidates were taken seriously. The constraint was that it had to sound like an
analytics product, not a coaching institute — so no *Academy*, *Classes*, *Institute*, *Guru*,
*Wallah*, *IAS*.

### Candidate A — **Skiplist** ← chosen

One word. It names the decision being sold rather than the subject matter: the product's
output is literally a list of things to skip. It is also a real data structure, which is a
quiet insider nod to the GATE CSE cohort that is the launch audience — they will notice, and
nobody else is harmed by it. It verbs well ("the skiplist for ME"), it is short enough to say
on a phone call, and `skiplist.in` reads as a tool rather than a tutorial.

The risk is that it sounds negative — "skip" is what a lazy student does. That turned out to
be an asset, not a liability: the entire positioning is permission to stop doing something,
and a name that flinches from that would undercut the pitch. The home page leans into it
rather than apologising for it.

The second risk is cross-exam fit. "Skip" sits awkwardly for CUET, where a Class 12 student
is not really choosing to abandon chapters. Handled in copy: the CUET page is framed as
"spend the last 60 days on the 20% that scores", which is the same arithmetic without telling
a seventeen-year-old to stop studying.

### Candidate B — **Paperlab**

Neutral, credible, cross-exam, and it ages well if the company ever moves beyond India or
beyond PYQ analysis. "Lab" signals method, which is the thing we most need to signal.

Rejected because it is off-wedge. It describes the *input* (papers) and the *process* (lab)
and says nothing about the *output* (a shorter syllabus). It would have needed the tagline to
do all the work, and a name that needs a tagline to make sense is a weaker name. It is also
generic enough that three other EdTech companies could plausibly already own it.

### Candidate C — **Weightage**

Enormous SEO advantage. "Weightage" is the exact word Indian aspirants type into search, every
day, in volume. Owning the category noun is the oldest trick there is.

Rejected on two grounds. It is effectively untrademarkable — it is a common descriptive term
in this market, so defending it would be impossible and competitors could use it freely in
their own copy. And it describes a feature rather than a stance; we would have spent years as
"the weightage people" while someone else took the interesting position. The SEO value is
recovered anyway: the free tool at `/free/weightage-map` targets exactly those queries.

---

## 2. The taglines

Eight were written. The winner is the hero line; the other seven are reused as section
headers, so the page carries one continuous argument instead of eight disconnected claims.
They live in `content/copy.ts → taglines`.

| #     | Line                                                    | Used as            |
| ----- | ------------------------------------------------------- | ------------------ |
| **1** | **Know what to skip.**                                  | **Hero headline**  |
| 2     | Stop studying everything.                               | Problem section    |
| 3     | The syllabus is a list. We built the skip list.         | Heat-map section   |
| 4     | Fifteen years of papers. One revision plan.             | Pack contents      |
| 5     | Study the 20%. Walk in like you studied all of it.      | How it works       |
| 6     | Every topic costs you a week. Only some pay you back.   | Product cards      |
| 7     | The syllabus is a promise. The papers are the evidence. | Trust section      |
| 8     | Cut the syllabus with data, not vibes.                  | Pricing            |

**Why #1 won.** The brief required the hero to lead with *skip*, and this is the shortest
construction that does it without sounding like advice from someone who did not study. It is
four words, it is a complete thought, and it implies the product category without naming it —
you cannot know what to skip without analysis, so the claim smuggles in the method. It also
pairs with the brand name without being a restatement of it.

Runner-up was #5, which is the most seductive line of the eight because it describes the
feeling the customer actually wants. It was rejected as a headline for being a near-promise.
"Walk in like you studied all of it" edges toward guaranteeing an outcome, and the house rule
is that we never do that. It survives as a section header where the surrounding context makes
it clearly a description of strategy rather than a pledge.

#3 is the sharpest line but depends on the reader already knowing what a skip list is. Fine
as a section header for a page the CSE cohort has already scrolled into; wrong as the first
thing a Civil aspirant reads.

---

## 3. Colour

### The accent

One accent, cobalt, used for CTAs and links only:

- Dark `rgb(77 122 255)` · Light `rgb(38 82 230)`

It sits **deliberately outside the heat ramp**. If the CTA colour appeared anywhere in the
data visualisation, a reader could not tell whether a bright cell meant "high marks" or "click
me". Keeping them disjoint means every cobalt pixel on the page is interactive and every warm
pixel is data. The accent appears nowhere in the heat map, the legend, the PNG export or the
OG image except as the one price figure.

### The heat scale

Seven steps, **magma-derived**, colour-blind safe, **never red→green**.

```
dark   #221049  #40147E  #6B1C80  #982D80  #C83E73  #ED6925  #FBA40A
light  #F6F1FC  #DECDF0  #C4A0DD  #AF6ABA  #9E3A85  #7C2260  #4A143E
```

Magma rather than viridis for one reason: viridis ends in yellow-green, and green carries
"correct / safe / go" in an exam context. A subject being high-weightage is not good news, it
is a workload. The magma ramp runs indigo → magenta → amber, which reads as intensity rather
than approval, and it has no green anywhere.

**Both ramps are monotonic in luminance**, which is the property that actually makes a
sequential scale accessible. Hue is unreliable — deuteranopia, protanopia and tritanopia each
collapse a different pair of hues, and a photocopier collapses all of them. Lightness survives
every one of those. The measured luminances are:

```
dark   0.012 → 0.031 → 0.055 → 0.101 → 0.170 → 0.282 → 0.471   (increasing)
light  0.895 → 0.655 → 0.421 → 0.230 → 0.120 → 0.063 → 0.023   (decreasing)
```

The light ramp runs the *opposite* direction from the dark one, which was a late correction
and is worth explaining. The first attempt simply inverted the low end and kept the amber high
end, producing a U-shaped luminance curve — light at both ends, dark in the middle. That is a
broken sequential scale: it is ambiguous in greyscale and it fails for every form of CVD,
because two different values map to the same lightness.

Running light-mode luminance strictly downward fixes that and has a second benefit. On white
paper the high-value cells become the heaviest ink on the page, so the subjects that matter
are the ones that dominate visually. The inverse would have shouted the subjects the reader is
meant to skip. The legend states the direction explicitly in both themes, and the chart's
`aria-label` describes the scale rather than asserting "brighter is higher".

It also fixed a real bug. In the first light ramp, `heat-6` was amber, which scored **1.94:1**
against a white page — and `heat-6` is used for check marks, step numbers and the "live" badge.
Those were all failing WCAG AA in light mode. With the corrected ramp they score **14.14:1**.

### Contrast audit

Every text pairing in both themes was measured. Worst cases:

| Pairing                            | Dark  | Light |
| ---------------------------------- | ----- | ----- |
| `fg` on the worst background       | 16.88 | 18.07 |
| `muted` on the worst background    | 7.24  | 6.11  |
| `faint` on the worst background    | 4.62  | 4.60  |
| `accent` on the worst background   | 4.91  | 5.81  |
| `accent-fg` on `accent`            | 5.26  | 6.12  |
| Worst of 7 in-cell heat labels     | 4.78  | 4.61  |

All ≥ 4.5:1, so AA holds for normal text everywhere, including the smallest monospace labels.
`faint` originally sat at 4.39 (dark) and 3.65 (light) and was lifted to clear the bar — it is
used at 11–12px, which is below the large-text threshold, so 3:1 would not have been enough.

Every heat step has a paired `--c-heat-N-fg` token for in-cell text. In light mode the first
four steps take dark plum text and the last three take white; in dark mode it is the reverse
at the top end. The crossover point differs between themes because the ramps run opposite
directions.

One further fix: the palest light-theme steps are nearly white, so every cell carries a 0.5px
`--c-line` hairline and the legend has an inset ring. Without them the low end of the scale
disappeared against a white panel.

---

## 4. Type

- **Inter Tight** — UI and headings. A geometric grotesk with tight default tracking, which
  holds up at `clamp()` display sizes without needing per-size letter-spacing hacks. Headings
  run at −0.025em to −0.035em.
- **JetBrains Mono** — **every number, stat, date, price, countdown digit and data label.**
  Non-negotiable, and enforced with a `.num` utility rather than left to judgement. Tabular
  figures mean a ticking countdown does not reflow, a column of marks aligns on the decimal,
  and ₹1,299 next to ₹599 lines up. It also does the positioning work: monospace reads as
  *measured* rather than *designed*, which is the entire argument of the product.
- **Noto Sans Devanagari** — the Hindi note on the State PSC page. Loaded but not preloaded,
  since one page uses it.

All three are **self-hosted variable woff2** via `next/font/local`. Not a style preference:
the build environment cannot reach Google Fonts, so `next/font/google` would fail at build
time. Self-hosting also removes a third-party request from every page load, which helps the
Lighthouse target.

Scale is fluid `clamp()` throughout, min values tuned at 360px and max at 1280px, so there is
no breakpoint where type visibly jumps.

---

## 5. Layout and texture

- 1200px content max-width, 1280px for the wide variant used by the five-column pricing grid.
  The pricing **heading** stays at 1200 so it lines up with every other section heading in the
  scroll; only the grid itself widens.
- 104px desktop section padding (80px for the `tight` variant), on an 8px grid. Tailwind's
  default scale was extended with 13 / 18 / 22 / 26 / 30 / 34 rather than using arbitrary
  values, so the rhythm stays inspectable. This started at 136px, which is defensible per side
  but stacks into a 272px void between two adjoining sections — at 1440px that reads as a
  loading error, not as breathing room. 104px halves the dead space and took ~980px off the
  home page without crowding anything.
- Every responsive `grid-cols-[…]` declares a base `grid-cols-1`. Without it the implicit
  single column is `auto`, which resolves to max-content and silently pushes wide children past
  the viewport on mobile.
- **1px hairlines, not shadows.** Two shadow tokens exist and are used almost nowhere. Card
  separation comes from `--c-line` and a 1-step background shift. This is what makes the page
  read as an instrument rather than a landing page.
- Texture is three things, all subtle: a graph-paper grid at 3.2% (dark) / 4.5% (light), a
  radial accent glow behind the hero and final CTA, and a 2% SVG noise overlay. No gradient
  blobs, no illustrations, no stock photography.

---

## 6. Product and content decisions

### The metric toggle is Marks ↔ % of paper, not marks ↔ questions

The brief asked for a marks/questions toggle. Per-subject **question counts** are not published
consistently for 15 years × 4 branches — only mark totals are. Building a question-count axis
would have meant deriving it from marks by assuming a 1-mark/2-mark split per subject per year,
which is an invention. The toggle shows marks and share-of-paper instead, both of which are
computed from the same sourced figures. Share is the more useful second view anyway, because it
is comparable across years when a column total is not exactly 100.

### We never pad a column to 100

The GATE CS 2024 column sums to **98** in our source. Civil columns run 96–103. Mechanical
tables omit General Aptitude and Engineering Mathematics entirely. Three options existed:
silently scale, invent a balancing row, or show the real total.

We show the real total, compute percentages against it, print it under the grid, and devote a
section of `/how-it-works` to explaining it. Where General Aptitude is added to the Mechanical
and Civil datasets it uses the official invariant 15 marks and is labelled as derived. A
visible two-mark gap is more informative than an invisible fudge, and the whole brand rests on
being the people who show their working.

### `data/testimonials.ts` ships empty

Not hidden, not filled with plausible-looking quotes. The array is empty and the home page
renders a block explaining why, with the four conditions an entry must meet before it goes in.
A sceptical 22-year-old has seen enough fabricated five-star quotes to discount them entirely;
an empty testimonials section with an explanation is a stronger trust signal than a full one.

The same rule produced: no student photography, no purchase counters, no "47 people bought this
today", no expiring discount timers. The only clock on the site counts to a real exam date
published by a real conducting authority, and it is computed from the browser's current time.

### The free tool gives away the signature chart

The complete four-branch, fifteen-year heat map is free, with no email wall, and exports as a
branded PNG. The argument is in `/free/weightage-map`: the grid is the cheapest chapter to
produce and the most persuasive to show, and gating it would cost more in credibility than it
gains in addresses. The paid pack is the other eight chapters.

### GATE registration close date

The brief said 12 October 2026. Published sources say registration closed **27 September 2026**
(regular) and **5 October 2026** (with late fee). The site uses the sourced dates. Where a brief
and a conducting authority disagree, the authority wins.

### CUET and State PSC pages have no chart

Those matrices are genuinely still being tagged. Rather than show an illustrative or
placeholder chart, the pages say so in plain language and offer a notification signup. This is
the single most load-bearing decision on those two pages — a fake chart there would contradict
every other claim on the site.

### No guarantee language, anywhere

Not in copy, not in the FAQ, not in the legal pages. The "will this guarantee a rank" FAQ
answers "No" in the first word and then quotes the real ratio: 7,97,434 appeared for GATE 2026
and 1,56,318 qualified. Terms of use states it again.

### Copyright

Questions are referenced by year and number only. No question text, no option text, no NCERT
passages, no coaching-institute material. The `source` column in the published schema points at
a chapter, never a quotation. The nine pack previews are rendered from our own data.

---

## 7. Engineering decisions

### The heat map is a hybrid, not pure SVG

The brief asked for a custom SVG chart rather than a chart library. It is custom and there is
no chart library — but it is a **sticky HTML label column plus an SVG cell grid**, not one
`<svg>`.

The reason is the 360px requirement. The spec calls for horizontal scrolling with sticky axis
labels. `position: sticky` does not exist inside SVG; the alternatives are re-transforming a
`<g>` on every scroll frame, or rendering labels as `<text>` inside a scaled viewBox, which
distorts them. HTML labels stay crisp, wrap properly, inherit the font, and stick for free. The
cells stay SVG so 400+ rects cost a single paint.

Other things worth knowing:

- **One pointer handler** for the whole grid, hit-testing against geometry constants. No
  per-cell listeners.
- **In-cell numbers only when `colW >= 44`.** Below that the grid scrolls and values come from
  tap or hover.
- The entrance animation uses `fill-mode: backwards`, not `both` — with `both`, the final
  keyframe's opacity permanently overrode the hover-dim state. It also needs
  `transform-box: fill-box`, or rects scale from the SVG origin instead of their own centres.
- A `<details>` disclosure under every chart contains the full text table. It is in the DOM
  always, not injected on open.

### The hero carries a second, static copy of the chart

The first build put only type, a countdown and a stat row above the fold. For a brand whose
entire argument is "we read the papers and here is the distribution", a first screen with no
distribution on it is an assertion rather than a demonstration — and it left roughly 45% of a
1440px viewport empty.

`components/home/hero-chart.tsx` is a server component with no client JavaScript: the real GATE
CSE matrix, last 12 years, 12 subjects ranked by fifteen-year mean, with a mean bar column and
the skip line drawn between rank 6 and rank 7. Its caption computes its own numbers from
`aggregate()` rather than repeating a hardcoded figure — an early draft said "four subjects
below the line" while the chart plainly showed six, which is exactly the kind of error this
whole product claims to eliminate.

Labels live **inside** the SVG rather than in an adjacent HTML column. A scaled `viewBox` next
to unscaled HTML rows drifts apart as soon as the container is narrower than the viewBox; at
390px the bottom rows were a full row out of alignment. One element, one uniform scale.

### The PNG export is hand-drawn canvas, not a DOM screenshot

`download-chart.ts` draws the whole thing with Canvas 2D: graph-paper background, logo, title,
year axis, cells, a derived callout strip, the legend, a source footer and a URL. No
`html2canvas`, no `dom-to-image`.

Two reasons. The file travels on WhatsApp completely detached from the page, so it needs
furniture a screenshot would not have — the source line and the URL are the point. And it uses
a **hardcoded palette** rather than reading CSS variables, so the exported chart is byte-identical
for a light-mode user and a dark-mode user. A chart that looks different depending on who
exported it is not a citable artefact. The palette is duplicated in `download-chart.ts` and must
be updated by hand if the tokens change; this is called out in the README.

### Countdowns are computed, never stored

`lib/dates.ts` derives everything from `Date.now()` on each tick. Server-rendered markup emits
an em-dash placeholder and the real figure appears after mount, which avoids a hydration
mismatch and means a stale CDN copy can never show a wrong day count. Unconfirmed dates
(`confirmed: false`) render a visible caveat naming what has not been notified.

### `CountUp` renders the final value on the server

The first implementation initialised state at `0`, which meant a visitor with JavaScript
disabled or blocked saw "0 lakh sat GATE 2026". The component now server-renders the true value
and only drops to zero after mount, before animating back. A statistic that reads zero because
a script failed is worse than no animation.

### Scroll reveals are CSS + IntersectionObserver, not Framer Motion

The original `Reveal` wrapped Framer Motion's `whileInView`. Headless QA caught three problems
with it at once:

1. The server rendered `opacity: 0; transform: translateY(8px)` as inline style, so **every
   section of the page was invisible without JavaScript**.
2. `useReducedMotion()` returns `null` during SSR and a boolean on the client, so React logged a
   full hydration-mismatch error on `/` — a console error, which the brief forbids.
3. Largest Contentful Paint had to wait for hydration before the hero became visible, which
   puts the Lighthouse ≥95 target at risk for no design benefit.

`components/motion/reveal.tsx` now renders plain, visible markup on the server. After mount it
marks only the elements still **below** the fold as hidden, then flips them on an
IntersectionObserver. If the user prefers reduced motion, or `IntersectionObserver` is missing,
it never touches the DOM at all. The animation itself is a CSS keyframe reading `--reveal-y` and
`--reveal-delay`.

Framer Motion is still a dependency and still used where it earns its weight: the
`AnimatePresence` tab transition in `pack-contents` and the `useInView` trigger in `count-up`.
That tab panel sets `initial={false}` so its first render is server-safe, and reads the motion
preference through `<MotionConfig reducedMotion="user">` — a runtime media query — rather than a
hook whose server and client values disagree.

### One capture endpoint, one field

Every form posts `{ contact, source, productId?, examSlug?, website }` to `/api/subscribe`.
A single `contact` field is auto-classified as email or Indian mobile
(`/^(?:\+?91[-\s]?)?[6-9]\d{9}$/`) — asking an Indian user to choose between "email" and
"WhatsApp" before typing is a step that converts worse than guessing correctly.

The honeypot is deliberately **not** validated in the zod schema. Validating it there returned
a 422 whose message named the field, which tells a bot precisely which input to leave empty. It
is checked after parsing and answered with an indistinguishable `200`.

### One payment seam

`lib/checkout.ts` is the only file that knows a purchase exists. No component imports a payment
SDK; buy buttons call `initiateCheckout(productId)`, which resolves an intent and opens the
"coming soon" dialog. Swapping in Razorpay is one function body plus a server route, per the
README.

---

## 8. Every statistic on the site, with its source

No figure appears in the UI unless it is in `data/sources.ts` with a `sourceId`, or is computed
from `data/weightage/*`. The `<Stat>` component renders the citation link next to the number so
it cannot be separated from it.

### External figures

| Token                    | Value      | Claim                                        | Source                |
| ------------------------ | ---------- | -------------------------------------------- | --------------------- |
| `gateRegistered2026`     | 10.1 lakh  | registered for GATE 2026                      | IIT Guwahati          |
| `gateAppeared2026`       | 7.97 lakh  | actually sat the paper                        | IIT Guwahati          |
| `gateQualified2026`      | 1.56 lakh  | qualified (19.6% of those who appeared)       | IIT Guwahati          |
| `gateCsRegistered2026`   | 2,59,922   | registered for the CS paper alone             | IIT Guwahati          |
| `gateCsAppeared2026`     | 2,11,020   | appeared for CS                               | IIT Guwahati          |
| `gateCsCutoff2026`       | 30.0 /100  | CS general-category qualifying mark           | IIT Guwahati          |
| `gateCeCutoff2026`       | 28.7 /100  | CE general-category qualifying mark           | IIT Guwahati          |
| `gateEcCutoff2026`       | 26.4 /100  | EC general-category qualifying mark           | IIT Guwahati          |
| `gateMeCutoff2026`       | 25.2 /100  | ME general-category qualifying mark           | IIT Guwahati          |
| `cuetRegistered2026`     | 15.68 lakh | registered for CUET UG 2026                   | National Testing Agency |
| `cuetAppeared2026`       | 11.64 lakh | appeared for CUET UG 2026                     | National Testing Agency |
| `cuetSubjectCombos2026`  | 12,906     | distinct subject combinations sat in 2026     | National Testing Agency |
| `uppscApplicants2026`    | ~8.9 lakh  | applied for UPPSC PCS 2026                    | UPPSC                 |
| `uppscVacancies2026`     | 500        | advertised vacancies                          | UPPSC                 |
| `bpscVacancies72`        | 1,186      | vacancies in the BPSC 72nd CCE                | BPSC                  |

`uppscApplicants2026` is the only `approx: true` figure on the site. Reported numbers for the
2026 cycle cluster around 8.9–9 lakh; the stored value is **rounded down** and renders with a
leading `~`, per the house rule for uncertain figures.

### Sources

| Label                                      | Publisher                                 | URL                                             |
| ------------------------------------------ | ----------------------------------------- | ----------------------------------------------- |
| GATE 2027 schedule                         | IIT Madras                                | `gate2027.iitm.ac.in`                           |
| GATE 2026 Statistical Report               | IIT Guwahati                              | `gate2026.iitg.ac.in`                           |
| Published GATE paper analysis, 2012–2026   | ACE Engineering Academy                   | `aceenggacademy.com/gate-computer-science-engineering-syllabus/` |
| CUET UG 2026 registration statistics       | National Testing Agency                   | `cuet.nta.nic.in`                               |
| CUET UG 2027 expected window               | Projected from NTA 2023–2026 cycles — **not notified** | `cuet.nta.nic.in`                  |
| UPPSC PCS 2026 applications and prelims    | UPPSC                                     | `uppsc.up.nic.in`                               |
| BPSC 72nd CCE 2026 notification            | BPSC                                      | `bpsc.bihar.gov.in`                             |

**On the weightage source.** Indian exam-content sites publish mutually inconsistent weightage
tables — some count questions, some count marks, some split by shift, most do not say which.
ACE Engineering Academy's per-branch 2012–2026 **marks** tables were the only set internally
consistent across all four branches and all fifteen years, so they are used throughout and
labelled "based on published 2012–2026 paper analysis" wherever they appear. Their known gaps
(CS 2024 = 98, Civil 96–103, Mechanical omitting GA and Maths) are disclosed rather than
patched.

**On the CUET 2027 countdown.** NTA has not notified 2027 dates. The clock counts to 11 May
2027 — the date the 2026 window opened — with `confirmed: false`, which renders a caveat saying
exactly that. It will be repointed the day the bulletin lands.

### Derived figures

Computed at build time from `data/weightage/*` by `lib/heat.ts`. Reproducible from the repo;
nothing here is quoted from an outside source.

| Branch | Rows | Top 3  | Top 4  | Top 5  | Top 6  | Highest three                                     | Lowest three                                      |
| ------ | ---- | ------ | ------ | ------ | ------ | ------------------------------------------------- | ------------------------------------------------- |
| CSE    | 12   | 41.1%  | 49.4%  | 57.5%  | 65.4%  | Discrete+Maths 16.3, Aptitude 14.9, COA 9.8       | Compilers 4.7, Data Struct. 4.5, Digital Logic 4.3 |
| ME     | 10   | 54.3%  | 62.8%  | 70.6%  | 78.1%  | Maths+Apt. 29.0, Manufacturing 15.6, Thermal 9.7  | Industrial 6.1, Machine Design 4.7, Eng. Mech 4.1  |
| ECE    | 10   | 38.3%  | 48.6%  | 58.1%  | 66.9%  | Aptitude 15.0, EDC+VLSI 11.8, Eng. Maths 11.5     | Digital+MP 8.4, Networks 8.2, Control 8.0          |
| CE     | 14   | 41.0%  | 51.3%  | 60.5%  | 68.4%  | Aptitude 15.0, Geotech 13.9, Eng. Maths 11.9      | Constr. Mgmt 2.8, Steel 1.8, Irrigation 1.7        |

Values are mean marks per paper, 2012–2026. ECE is the branch with the flattest distribution —
its top six still take 66.9%, but no single subject beyond Aptitude breaks 12, which is why its
page copy says the skip list is shorter there. The product does not pretend every branch has the
same amount of fat.

---

## 9. Known gaps

- `site.whatsapp.number` and `site.address` in `content/site.ts` are placeholders.
- `content/legal.ts` is written in plain language and is not a substitute for a lawyer reading it.
- The nine pack previews are rendered from real data but represent layouts, not a shipped PDF.
- CUET and State PSC weightage datasets do not exist yet; both pages say so.
- No analytics is installed. The privacy policy claims aggregate page counts and no cross-site
  tracking — whatever gets installed has to stay inside that claim.
