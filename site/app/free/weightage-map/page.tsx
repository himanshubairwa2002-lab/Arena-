import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Download, Share2 } from 'lucide-react'
import { datasets, gateCse } from '@/data/weightage'
import { aggregate } from '@/lib/heat'
import { faqById, type Faq } from '@/content/faq'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd, faqLd } from '@/lib/jsonld'
import { Container, Section, SectionHead } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { SourceList } from '@/components/site/source-note'
import { HeatmapWithCallouts } from '@/components/heatmap/heatmap-with-callouts'
import { CaptureForm } from '@/components/forms/capture-form'
import { FaqSection } from '@/components/home/faq-section'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'

const freeFaqIds = ['free-catch', 'telegram-pdfs', 'data-source', 'not-notes', 'updates']

export const metadata: Metadata = pageMeta({
  title: 'Free GATE weightage heat map \u2014 CSE, ME, ECE, CE, 2012\u20132026',
  description:
    'Fifteen years of GATE papers as an interactive heat map. Marks per subject per year for four branches. Free, no sign-up, download as PNG.',
  path: '/free/weightage-map',
  og: {
    heading: 'Fifteen years of GATE, as one grid',
    kicker: 'Free tool',
    stat: '15',
    statLabel: 'years \u00D7 4 branches',
  },
})

const agg = aggregate(gateCse)
const top6 = agg.slice(0, 6).reduce((t, a) => t + a.share, 0)

export default function FreeWeightageMapPage() {
  const faqs = freeFaqIds.map((id) => faqById[id]).filter((f): f is Faq => Boolean(f))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqLd(faqs),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Free tools', path: '/free/weightage-map' },
              { name: 'Weightage heat map', path: '/free/weightage-map' },
            ]),
          ]),
        }}
      />

      <PageHeader
        eyebrow="Free tool · no sign-up, no email wall"
        heading="Fifteen years of GATE, as one grid."
        sub={`Marks per subject per year for CSE, ME, ECE and CE, ${gateCse.years[0]} to ${gateCse.years[gateCse.years.length - 1]}. The stronger the cell, the more marks. Switch the metric to see each subject as a share of the paper. Export it and send it to whoever needs to see it.`}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Free weightage map', path: '/free/weightage-map' },
        ]}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { k: 'Branches', v: String(datasets.length) },
            { k: 'Years', v: String(gateCse.years.length) },
            { k: 'Top 6 subjects, CS', v: `${top6.toFixed(1)}% of the paper` },
            { k: 'Price', v: '\u20B90' },
          ].map((x) => (
            <div key={x.k}>
              <p className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">{x.k}</p>
              <p className="num mt-1 text-[0.9375rem] text-fg">{x.v}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <Section id="download" tight>
        <Container wide>
          <Reveal>
            <HeatmapWithCallouts datasets={datasets} initialId="gate-cse" />
          </Reveal>

          <Reveal delay={0.06} className="mt-6">
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[
                {
                  icon: Download,
                  h: 'Download this chart',
                  b: 'The button above the grid exports a branded PNG at 2400px, with the source line and the derived callout baked in. It is readable on a phone screen.',
                },
                {
                  icon: Share2,
                  h: 'Send it to your group',
                  b: 'No watermark games, no "shared via" junk. One honest credit line and a URL so whoever gets it can check our working.',
                },
                {
                  icon: ArrowRight,
                  h: 'Then read the table',
                  b: 'Open the text table under the grid. Same numbers, screen-reader friendly, sortable by eye. The chart is not the only way in.',
                },
              ].map((c) => (
                <div key={c.h} className="bg-surface p-5">
                  <c.icon className="h-4 w-4 text-heat-5" aria-hidden />
                  <h2 className="mt-3 text-[0.9375rem] font-medium text-fg">{c.h}</h2>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted text-pretty">
                    {c.b}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="The obvious question"
                heading="Why give away the thing the product is named after?"
              />
              <div className="prose-skiplist mt-6 max-w-prose">
                <p>
                  Because the grid is the argument, not the product. Looking at it for thirty
                  seconds tells you that six subjects carry {top6.toFixed(0)}% of a GATE CS paper.
                  That is a genuinely useful fact and it costs us nothing to hand over.
                </p>
                <p>
                  What it does not tell you is which micro-topics inside those six subjects have
                  actually been asked, which 2024 question was a reworded 2018 question, which
                  distractor pattern has eaten four years of candidates, or what to do on each of
                  the next 45 days. That is the pack. It is eight more chapters of work and it is
                  the part we charge for.
                </p>
                <p>
                  If the free chart is all you needed, take it and go. That is a fine outcome. We
                  would rather be the site that gave you the useful chart than the site that put a
                  form in front of it.
                </p>
              </div>
              <ButtonLink href="/how-it-works" variant="ghost" className="mt-6">
                How the tagging actually works
              </ButtonLink>
            </div>

            <Reveal delay={0.06}>
              <div id="sample" className="card scroll-mt-24 p-5 lg:sticky lg:top-20">
                <p className="eyebrow">If you want the rest</p>
                <h2 className="mt-2.5 text-h3">
                  The 12-page sample has the ranked table and the 7-day calendar.
                </h2>
                <p className="mt-2.5 text-small leading-relaxed text-muted">
                  Same data, plus the skip tiers and one full revision week. No card, no trial, no
                  drip sequence.
                </p>
                <div className="mt-5">
                  <CaptureForm
                    source="free-tool:sample"
                    productId="sample"
                    buttonLabel="Send the 12-page sample"
                    stacked
                    note="One email. Unsubscribe link in it. We do not sell lists."
                  />
                </div>
                <Link
                  href="/pricing"
                  className="num mt-4 inline-block text-[0.75rem] text-accent transition-colors hover:text-accent-hover"
                >
                  Or see the five price tiers &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection
        ids={freeFaqIds}
        heading="About this tool."
        eyebrow="Free tool FAQ"
        sub="Five questions people actually ask about a chart somebody put on the internet for free."
      />

      <Section tight className="border-t border-line">
        <Container>
          <SourceList ids={['aceWeightage', 'gateStats2026', 'gateSchedule']} />
        </Container>
      </Section>
    </>
  )
}
