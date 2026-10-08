import Link from 'next/link'
import { ArrowUpRight, Database, FileDown, GitCommitVertical, ScanSearch } from 'lucide-react'
import { trust } from '@/content/copy'
import { datasets, gateCse } from '@/data/weightage'
import { sources } from '@/data/sources'
import { exams } from '@/data/exams'
import { noTestimonialsCopy, testimonials } from '@/data/testimonials'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { RankedYieldPreview } from '@/components/previews'
import { CaptureForm } from '@/components/forms/capture-form'

function Testimonials() {
  const real = testimonials.filter((t) => t.verified && !t.id.startsWith('example'))
  if (real.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line-strong bg-surface p-6">
        <p className="num text-[0.625rem] uppercase tracking-[0.1em] text-faint">
          Testimonials &middot; intentionally empty
        </p>
        <h3 className="mt-3 text-h3 text-pretty">{noTestimonialsCopy.heading}</h3>
        <p className="mt-2 max-w-prose text-body leading-relaxed text-muted text-pretty">
          {noTestimonialsCopy.body}
        </p>
        <p className="mt-3 max-w-prose text-body leading-relaxed text-muted text-pretty">
          {noTestimonialsCopy.promise}
        </p>
      </div>
    )
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {real.map((t) => (
        <li key={t.id} className="card p-5">
          <blockquote className="text-body leading-relaxed text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
          <p className="num mt-3 text-[0.75rem] text-faint">
            {t.name} &middot; {t.context}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function Proof() {
  const totalMarks = gateCse.subjects.reduce(
    (sum, s) => sum + s.marks.reduce<number>((a, m) => a + (m ?? 0), 0),
    0,
  )
  const gate = exams[0]

  const pillars = [
    {
      icon: Database,
      head: 'Sample size, stated',
      body: `${datasets.length} branches \u00D7 ${gateCse.years.length} years = ${datasets.length * gateCse.years.length} papers of published mark distribution. ${totalMarks.toLocaleString('en-IN')} marks accounted for in CS alone.`,
    },
    {
      icon: ScanSearch,
      head: 'Sources, named',
      body: `Exam dates from ${sources.gateSchedule.publisher}. Candidate figures from the ${sources.gateStats2026.label}. Weightage from ${sources.aceWeightage.publisher}. Every one is linked.`,
    },
    {
      icon: GitCommitVertical,
      head: 'Changelog, public',
      body: `Edition ${gate.editions[0].version} shipped on 7 Oct 2026. Every later edition, including corrections, gets a dated entry you can read before you buy.`,
    },
    {
      icon: FileDown,
      head: 'Sample, complete',
      body: 'Twelve pages with the full weightage matrix and the whole 7-day calendar. Not a teaser with the useful part removed.',
    },
  ]

  return (
    <Section id="trust" aria-labelledby="trust-heading" className="border-t border-line">
      <Container>
        <Reveal>
          <p className="eyebrow">{trust.eyebrow}</p>
          <h2 id="trust-heading" className="mt-3 max-w-[24ch] text-h1 text-balance">
            {trust.heading}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lead text-muted text-pretty">{trust.sub}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-8">
          <Reveal>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p.head} className="bg-surface p-5">
                  <p.icon className="h-4 w-4 text-heat-5" aria-hidden />
                  <h3 className="mt-3 text-[0.9375rem] font-medium text-fg">{p.head}</h3>
                  <p className="num mt-1.5 text-[0.75rem] leading-relaxed text-muted text-pretty">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <Testimonials />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-5">
              <p className="eyebrow">Inside the free sample</p>
              <h3 className="mt-2.5 text-h3">GATE CSE, ranked by 15-year mean</h3>
              <div className="mt-4">
                <RankedYieldPreview limit={7} />
              </div>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-faint">
                Mean marks per paper, {gateCse.years[0]}&ndash;
                {gateCse.years[gateCse.years.length - 1]}. The sample has all{' '}
                {gateCse.subjects.length} rows, the skip tier, and the calendar.
              </p>
              <div className="mt-5 border-t border-line pt-5">
                <CaptureForm
                  source="proof:sample"
                  buttonLabel="Send the sample"
                  stacked
                  note="One email with the 12-page PDF. Nothing else."
                />
              </div>
              <Link
                href="/how-it-works"
                className="group mt-4 inline-flex items-center gap-1.5 text-small text-accent transition-colors hover:text-accent-hover"
              >
                Read how the tagging works
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
