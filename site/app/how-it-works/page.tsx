import type { Metadata } from 'next'
import { AlertTriangle } from 'lucide-react'
import { methodologyCopy, methodSteps, schemaColumns } from '@/content/methodology'
import { gateCse, datasets } from '@/data/weightage'
import { faqById, type Faq } from '@/content/faq'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd, faqLd } from '@/lib/jsonld'
import { Container, Section, SectionHead } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { SourceList } from '@/components/site/source-note'
import { HeatTable } from '@/components/heatmap/heat-table'
import { FaqSection } from '@/components/home/faq-section'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { columnTotal } from '@/lib/heat'

const methodFaqIds = ['data-source', 'not-notes', 'guarantee', 'updates', 'typed']

export const metadata: Metadata = pageMeta({
  title: 'Methodology \u2014 how fifteen years of papers become one ranked list',
  description:
    'The data schema, the tagging process, the inter-rater check, and the four things this method cannot do. Including the column that does not sum to 100.',
  path: '/how-it-works',
  og: {
    heading: 'Here is the schema. Check our working.',
    kicker: 'Methodology',
    stat: '11',
    statLabel: 'columns per tagged question',
  },
})

export default function HowItWorksPage() {
  const faqs = methodFaqIds.map((id) => faqById[id]).filter((f): f is Faq => Boolean(f))
  const badYear = gateCse.years.findIndex((y) => y === 2024)
  const badTotal = columnTotal(gateCse, badYear)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqLd(faqs),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'How it works', path: '/how-it-works' },
            ]),
          ]),
        }}
      />

      <PageHeader
        eyebrow={methodologyCopy.eyebrow}
        heading={methodologyCopy.heading}
        sub={methodologyCopy.sub}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ]}
      />

      {/* ------------------------------------------------------ the schema */}
      <Section tight>
        <Container>
          <SectionHead
            eyebrow="Step zero"
            heading="Every question becomes one row with eleven columns."
            sub="This is the actual schema. If a claim in the pack cannot be expressed as a query over this table, it does not go in the pack."
          />

          <Reveal className="mt-8">
            <div className="overflow-x-auto rounded-xl border border-line bg-canvas">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">
                  Data schema: one row per tagged question, eleven columns
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    {['Column', 'Type', 'Example', 'What it is for'].map((h) => (
                      <th key={h} scope="col" className="eyebrow px-4 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schemaColumns.map((c) => (
                    <tr key={c.name} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="num px-4 py-2.5 text-[0.8125rem] font-normal text-fg">
                        {c.name}
                      </th>
                      <td className="num px-4 py-2.5 text-[0.75rem] text-heat-5">{c.type}</td>
                      <td className="num px-4 py-2.5 text-[0.75rem] text-muted">{c.example}</td>
                      <td className="px-4 py-2.5 text-[0.8125rem] leading-relaxed text-muted">
                        {c.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-4">
            <p className="max-w-prose text-[0.75rem] leading-relaxed text-faint">
              We reference questions by year and number. We do not reproduce question text, option
              text, NCERT passages, or any coaching institute&rsquo;s material. The{' '}
              <span className="num text-muted">source</span> column points at a chapter, never a
              quotation.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------- the steps */}
      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <SectionHead eyebrow="The process" heading="Six steps, in order, including the boring ones." />
          <ol className="mt-9 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {methodSteps.map((s, i) => (
              <Reveal key={s.n} as="li" delay={i * 0.04}>
                <div className="flex items-center gap-3">
                  <span className="num text-[0.6875rem] tracking-[0.1em] text-heat-6">{s.n}</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-3.5 text-h3 text-pretty">{s.title}</h3>
                <p className="mt-2 text-body leading-relaxed text-muted text-pretty">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* -------------------------------------------------- the ugly column */}
      <Section tight className="border-t border-line">
        <Container>
          <Reveal>
            <div className="rounded-xl border border-heat-5/30 bg-heat-5/[0.06] p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-heat-5" aria-hidden />
                <div className="min-w-0">
                  <h2 className="text-h3">
                    The CS 2024 column sums to{' '}
                    <span className="num text-heat-5">{badTotal}</span>, not 100.
                  </h2>
                  <div className="prose-skiplist mt-3 max-w-prose">
                    <p>
                      Our source table for GATE CS 2024 accounts for {badTotal} of the paper&rsquo;s
                      100 marks. We have not found a public breakdown for the remaining{' '}
                      {100 - badTotal}. Three options were available: silently scale the column to
                      100, invent a row to absorb the difference, or show you the real total.
                    </p>
                    <p>
                      We show the real total. Percentages for that year are computed against{' '}
                      {badTotal}, not 100, and the column total is printed under the grid in the
                      web tool and in the PDF. The same rule applies to the Civil tables, which run
                      between 96 and 103 depending on the year, and to the Mechanical tables, where
                      the published analysis omits General Aptitude and Engineering Mathematics
                      entirely. Where we add an aptitude row we use the official invariant 15 marks
                      and label it as derived.
                    </p>
                    <p>
                      This is a small thing. It is also exactly the kind of small thing that tells
                      you whether a number on a sales page was computed or decorated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- the raw data */}
      <Section tight className="border-t border-line bg-surface/40">
        <Container wide>
          <SectionHead
            eyebrow="The output"
            heading="The GATE CSE matrix, as plain numbers."
            sub={`Exactly the table the heat map is drawn from — ${gateCse.subjects.length} subjects × ${gateCse.years.length} years, with the real column totals in the last row. The same table exists for all ${datasets.length} branches.`}
          />
          <Reveal className="mt-8">
            <HeatTable ds={gateCse} metric="marks" />
          </Reveal>
          <Reveal delay={0.06} className="mt-5">
            <ButtonLink href="/free/weightage-map" variant="ghost">
              Open the interactive version
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- what it can't */}
      <Section tight className="border-t border-line">
        <Container>
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Limits</p>
              <h2 className="mt-3 text-h1 text-balance">{methodologyCopy.honesty.heading}</h2>
              <p className="mt-4 max-w-[42ch] text-body leading-relaxed text-muted text-pretty">
                A method that cannot fail at anything is not a method, it is marketing. Here are
                the four failure modes we know about.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="divide-y divide-line border-y border-line">
                {methodologyCopy.honesty.points.map((p, i) => (
                  <li key={p} className="flex gap-4 py-4">
                    <span className="num shrink-0 text-[0.6875rem] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body leading-relaxed text-muted text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection
        ids={methodFaqIds}
        heading="Questions about the method."
        eyebrow="Methodology FAQ"
        sub="If you want to argue with the method, these are the right places to start."
      />

      <Section tight className="border-t border-line">
        <Container>
          <SourceList ids={['aceWeightage', 'gateStats2026', 'gateSchedule', 'ntaCuet2026']} />
        </Container>
      </Section>
    </>
  )
}
