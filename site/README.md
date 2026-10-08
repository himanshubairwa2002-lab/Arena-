# Skiplist

Marketing and sales site for **Skiplist** — previous-year-question analytics for Indian
competitive exams (GATE, CUET UG, State PSC).

The product is a downloadable "Decode" pack built on fifteen years of published paper analysis.
The wedge is subtraction: here is the 20% of the syllabus that produced most of the marks, and
here is what you can stop studying.

Next.js App Router · TypeScript (strict) · Tailwind · Framer Motion · zero chart libraries.

---

## Running it

```bash
cd site
npm install
npm run dev      # binds 0.0.0.0:3000
```

| Script              | Does                                              |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server on `0.0.0.0:3000`                      |
| `npm run build`     | Production build (also runs the TS check)         |
| `npm start`         | Serve the build on `0.0.0.0:3000`                 |
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run lint`      | `next lint`                                       |

One optional environment variable:

```bash
NEXT_PUBLIC_SITE_URL=https://skiplist.in   # defaults to site.url in content/site.ts
```

It is used for canonicals, OG URLs, `sitemap.xml` and `robots.txt`. Set it per environment so
preview deploys do not advertise production canonicals.

---

## Where everything lives

```
site/
├── app/
│   ├── layout.tsx                 fonts, theme script, nav, footer, checkout dialog
│   ├── page.tsx                   home (12 sections)
│   ├── exams/[slug]/page.tsx      one template, three exams, driven by data/exams.ts
│   ├── free/weightage-map/        the lead magnet — full interactive heat map
│   ├── how-it-works/              methodology + the published data schema
│   ├── pricing/ about/ changelog/
│   ├── terms/ privacy/ refund-policy/
│   ├── not-found.tsx              custom 404
│   ├── sitemap.ts robots.ts
│   └── api/
│       ├── subscribe/route.ts     ← email / WhatsApp capture  (provider seam)
│       └── og/route.tsx           dynamic OG images via next/og
│
├── content/      ALL user-facing copy. No prose in components.
│   ├── site.ts         brand constants, nav, footer, payment rails
│   ├── copy.ts         taglines, hero, problem, how-it-works, trust, final CTA, 404
│   ├── pack.ts         the 9 pack components
│   ├── pricing.ts      5 tiers + update subscription
│   ├── faq.ts          17 FAQs, indexed by id
│   ├── methodology.ts  schema columns, 6 method steps, the honesty block
│   └── legal.ts        terms / privacy / refund, as structured blocks
│
├── data/         TYPED FACTS. Everything numeric traces back to here.
│   ├── sources.ts      every external source + every sourced statistic
│   ├── exams.ts        3 exams: dates, milestones, prices, coverage, editions
│   ├── changelog.ts    public changelog incl. corrections
│   ├── testimonials.ts intentionally empty — see below
│   └── weightage/      the heat-map datasets (gate-cse / me / ece / ce)
│
├── lib/
│   ├── heat.ts         aggregation, heat steps, auto-derived callouts
│   ├── checkout.ts     ← payment seam (Razorpay goes here)
│   ├── dates.ts        runtime countdowns, IST-aware
│   ├── seo.ts  jsonld.ts  utils.ts
│
└── components/
    ├── heatmap/        the signature chart (see "The heat map" below)
    ├── previews/       the nine in-browser previews of real pack pages
    ├── home/ exam/ site/ forms/ checkout/ ui/ motion/
```

---

## Editing exam data

**Everything about an exam lives in one object in `data/exams.ts`.** The page at
`/exams/<slug>` is generated from it — there is no per-exam JSX.

```ts
{
  slug: 'gate-2027',
  product: 'GATE 2027 Decode',
  status: 'live',            // 'live' | 'preorder' | 'waitlist'  → drives badges + CTA wording
  countdown: {
    date: '2027-02-06T09:30:00+05:30',
    label: 'GATE 2027, day one',
    confirmed: true,         // false renders the caveat and marks the clock projected
    caveat: '…',
  },
  milestones: [ … ],         // date: null + note: '…' when the authority has not published one
  datasetIds: ['gate-cse'],  // empty → page shows an honest "not published yet" block, no fake chart
  price: { now: 599, mrp: 1199 } | null,
  faqIds: ['not-notes', …],  // ids from content/faq.ts
  statIds: [ … ],            // ids from data/sources.ts
  sourceIds: [ … ],          // rendered as the citation list at the foot of the page
}
```

Adding a fourth exam is: add the object, add any new FAQ ids, add any new sources. The route,
the sitemap entry, the JSON-LD and the nav dropdown pick it up. Nav labels live in
`content/site.ts → primaryNav`.

### Adding or correcting weightage data

Each branch is one file in `data/weightage/` shaped like:

```ts
export const gateCse: WeightageDataset = {
  id: 'gate-cse',
  label: 'Computer Science & IT (CS)',
  short: 'CSE',
  paperCode: 'CS',
  years: [2012, …, 2026],
  sourceId: 'aceWeightage',
  subjects: [
    { id: 'discrete-maths', name: 'Discrete & Engineering Maths', short: 'Discrete+Maths',
      marks: [21, 18, …] },   // one entry per year, `null` where the source has no figure
  ],
}
```

Rules, in order of importance:

1. **`marks.length` must equal `years.length`.** Use `null`, never `0`, for "not published".
2. **Never pad a column to make it sum to 100.** The UI computes percentages from the real
   column total and prints that total under the grid. The GATE CS 2024 column genuinely sums
   to 98 in our source, and the site says so out loud on `/how-it-works`.
3. **Any derived row must be labelled.** The Mechanical and Civil source tables omit General
   Aptitude; where we add it at the official invariant 15 marks, it is marked derived.
4. Register the source in `data/sources.ts` and point `sourceId` at it.

Then add the dataset to the array in `data/weightage/index.ts`. Every consumer — the home
section, the free tool, the exam pages, the PNG export, the OG image — reads from that array.

### Adding a statistic to the page

Don't hardcode it. Add it to `stats` in `data/sources.ts` with a `sourceId`, then render it
with `<Stat>` or `<StatGrid>` from `components/site/source-note.tsx`, which welds the citation
to the number. If a figure is uncertain, set `approx: true` and round **down** — it renders a
leading `~`.

### Changelog

`data/changelog.ts`. Entries are `shipped`, `planned`, or `correction`. Corrections are never
deleted; a fix is a new entry under the old one.

---

## Plugging in a payment provider (Razorpay)

**There is exactly one seam: `lib/checkout.ts`.** No component imports a payment SDK, and
nothing else needs to change.

```ts
// lib/checkout.ts
export function initiateCheckout(productId: ProductId) {
  const intent = resolve(productId)       // { productId, name, amount, mode }
  // TODO: Razorpay order creation
  emit(intent)                            // currently: opens the "coming soon" modal
}
```

To go live:

1. Add a server route (`app/api/checkout/route.ts`) that creates a Razorpay order from
   `intent.amount` using `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`. Never create orders
   client-side and never trust an amount from the browser — re-derive it from
   `content/pricing.ts` on the server using `productId`.
2. In `initiateCheckout`, `POST` to that route, then open Razorpay Checkout with the returned
   `order_id`.
3. Add a webhook route to verify `razorpay_signature` and release the download link.
4. Delete the `emit(intent)` call and the `CheckoutProvider` modal — or keep the provider and
   have it render a real receipt state.

The amounts are already correct and GST-inclusive. `Tier.productId` values are
`sample | single-subject | core-decode | full-bundle | bundle-mentorship`; exam CTAs pass
`exam:${slug}`. `resolve()` maps both to a single `CheckoutIntent`.

## Plugging in an email provider

**One seam: the `persist()` function in `app/api/subscribe/route.ts`.**

Every form on the site — hero, proof section, lead-magnet band, final CTA, exam pages, the
checkout modal — posts the same payload to `POST /api/subscribe`:

```jsonc
// request
{ "contact": "…", "source": "final-cta", "productId": "core-decode", "examSlug": "gate-2027", "website": "" }
// response
{ "ok": true, "channel": "email" | "whatsapp" }
```

One field, auto-classified: anything matching `/^(?:\+?91[-\s]?)?[6-9]\d{9}$/` is treated as a
WhatsApp number, anything that parses as an email is an email, everything else gets a 422 with
a readable message. `website` is a honeypot; a filled honeypot gets a fake `200` and is never
stored, so a bot cannot tell it was dropped.

Replace the body of `persist()`:

```ts
async function persist(payload: SubscribePayload) {
  await resend.contacts.create({
    email: payload.contact,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  })
}
```

Keep the response shape — `components/forms/capture-form.tsx` branches on `ok` and `channel`
to pick its success copy.

---

## The heat map

`components/heatmap/`. No chart library, and no DOM-screenshot library either.

| File                     | Does                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `weightage-heatmap.tsx`  | Orchestrator: branch switcher, metric toggle, `aria-live` readout, legend, disclosure |
| `heat-grid.tsx`          | Sticky HTML label column + one `<svg>` of `<rect>`s                     |
| `heat-table.tsx`         | The accessible text-table fallback, always in the DOM                   |
| `heat-callouts.tsx`      | Four cards derived from `lib/heat.ts`, never hand-written               |
| `heat-legend.tsx`        | Seven-step scale with Low → High labels                                 |
| `download-chart.ts`      | Hand-drawn canvas 2D export, 2400px branded PNG                         |
| `heatmap-with-callouts.tsx` | Keeps the callouts in sync with the selected branch                  |

Things worth knowing before you change it:

- **It is a hybrid, on purpose.** Labels are HTML (so `position: sticky` and real text wrapping
  work at 360px); cells are SVG (so 400+ rects cost one paint). A pure-SVG chart cannot do
  sticky axis labels on a phone without distorting text.
- **One pointer handler for the whole grid.** `onPointerMove` hit-tests against geometry
  constants. There are no per-cell event handlers.
- **In-cell numbers only render when `colW >= 44`.** Below that the grid scrolls horizontally
  and values come from tap/hover.
- **The entrance animation uses `fill-mode: backwards`**, not `both`, so the permanent fill does
  not clobber the hover-dim opacity. `transform-box: fill-box` is required or rects scale from
  the SVG origin.
- **The PNG export has its own hardcoded palette** (`EXPORT` in `download-chart.ts`). That is
  deliberate: the file travels on WhatsApp detached from the page, so it must look identical for
  every reader regardless of their theme. If you change the tokens in `globals.css`, change that
  palette too.

### The colour scale

Seven steps, magma-derived, **colour-blind safe, never red→green**, defined only in
`app/globals.css`.

Both themes are monotonic in luminance, which is what makes the scale survive greyscale,
printing and every form of CVD — the ordering is carried by lightness, not hue.

- **Dark:** deep indigo → magenta → amber. Luminance *increases* with value.
- **Light:** pale lavender → deep plum. Luminance *decreases* with value, so high-value cells
  are the heaviest ink on a white page.

Every in-cell label has a matching `--c-heat-N-fg` token; all fourteen combinations clear WCAG
AA (worst case 4.61:1). The accent (cobalt) sits deliberately outside the ramp and is used for
CTAs only.

---

## Things that are intentional, not unfinished

- **`data/testimonials.ts` is an empty array.** The home page renders a block explaining why
  instead of hiding the section. Add entries only when they are real, named, and consented to;
  `EXAMPLE_SHAPE` in that file shows the format and the four rules.
- **There is no payment integration.** Buy buttons open a dialog that says so and offer email
  capture.
- **The CUET and State PSC pages have no chart.** Those matrices are not built, so the pages say
  that rather than showing an illustrative one.
- **No countdown is hardcoded.** `lib/dates.ts` computes everything from the real clock at
  runtime; `confirmed: false` dates render a caveat.
- **`site.whatsapp.number` is a placeholder** (`+91 00000 00000`), as is `site.address`. Replace
  both in `content/site.ts` before launch.
- **Scroll reveals are CSS, not Framer Motion.** `components/motion/reveal.tsx` server-renders
  visible content and only animates what is below the fold after mount, so the page is fully
  readable with JavaScript disabled. Do not swap it back to `whileInView` — see `DECISIONS.md`
  §7 for the three bugs that caused.
- **No tier is labelled "most bought" or "most popular".** The site launched this month and
  says so, so it cannot claim purchase volume. Core Decode is marked `Recommended`, which is an
  opinion we are entitled to have.
- **Every responsive `grid-cols-[…]` also declares a base `grid-cols-1`.** Dropping it makes
  the implicit column `auto`, which resolves to max-content and pushes wide children off-screen
  on mobile. Keep it when adding new grids.

## Before launch

1. Replace the WhatsApp number and registered address in `content/site.ts`.
2. Set `NEXT_PUBLIC_SITE_URL`.
3. Wire `persist()` and `initiateCheckout()`.
4. Have a lawyer read `content/legal.ts`.
5. Re-verify every date in `data/exams.ts` against the conducting authority.

---

See **`DECISIONS.md`** for the brand name shortlist, the taglines, the colour and type
rationale, and a source for every statistic on the site.
