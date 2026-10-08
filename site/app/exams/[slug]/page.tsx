import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { exams, examsBySlug } from '@/data/exams'
import { datasets } from '@/data/weightage'
import { stats, type StatId } from '@/data/sources'
import { faqById, type Faq } from '@/content/faq'
import { changelogByExam, kindCopy } from '@/data/changelog'
import { packComponents } from '@/content/pack'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd, courseLd, faqLd, productLd } from '@/lib/jsonld'
import { formatDate } from '@/lib/dates'
import { inr } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Container, Section, SectionHead } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { Countdown } from '@/components/site/countdown'
import { StatGrid, SourceList } from '@/components/site/source-note'
import { Timeline } from '@/components/exam/timeline'
import { CoverageTable } from '@/components/exam/coverage-table'
import { HeatmapWithCallouts } from '@/components/heatmap/heatmap-with-callouts'
import { FaqSection } from '@/components/home/faq-section'
import { CaptureForm } from '@/components/forms/capture-form'
import { ExamCta } from '@/components/exam/exam-cta'
import { Reveal } from '@/components/motion/reveal'

export function generateStaticParams() {
  return exams.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const exam = examsBySlug[slug]
  if (!exam) return {}
  return pageMeta({
    title: `${exam.product} \u2014 ${exam.pitch}`,
    description: exam.intro.slice(0, 180),
    path: `/exams/${exam.slug}`,
    og: {
      heading: exam.product,
      kicker: exam.statusLabel,
      stat: exam.price ? inr(exam.price.now) : 'Waitlist',
      statLabel: exam.examWindow,
    },
  })
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exam = examsBySlug[slug]
  if (!exam) notFound()

  const sets = datasets.filter((d) => exam.datasetIds.includes(d.id))
  const faqs = exam.faqIds.map((id) => faqById[id]).filter((f): f is Faq => Boolean(f))
  const entries = changelogByExam(exam.slug as 'gate-2027')
  const examStats = exam.statIds.map((id) => stats[id as StatId])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productLd(exam),
            courseLd(exam),
            faqLd(faqs),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Exams', path: '/#exams' },
              { name: exam.exam, path: `/exams/${exam.slug}` },
            ]),
          ]),
        }}
      />

      <PageHeader
        glow
        eyebrow={`${exam.authority} \u00B7 ${exam.audience}`}
        heading={exam.product}
        sub={exam.intro}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Exams', path: '/#exams' },
          { name: exam.exam, path: `/exams/${exam.slug}` },
        ]}
        aside={
          <div className="card p-5">
            <Badge tone={exam.status === 'live' ? 'live' : exam.status} dot={exam.status === 'live'}>
              {exam.statusLabel}
            </Badge>
            <div className="mt-4">
              <Countdown
                target={exam.countdown.date}
                label={exam.countdown.label}
                size="sm"
                showSeconds={false}
              />
            </div>
            {exam.countdown.caveat ? (
              <p className="mt-3 rounded border border-line bg-canvas px-3 py-2 text-[0.6875rem] leading-relaxed text-faint">
                {exam.countdown.caveat}
              </p>
            ) : null}
            <div className="mt-4 border-t border-line pt-4">
              <ExamCta exam={exam} />
            </div>
            <a
              href={exam.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="num mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] text-faint transition-colors hover:text-muted"
            >
              Official site
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
        }
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {exam.highlights.map((h) => (
            <li key={h} className="num text-[0.75rem] text-muted">
              <span className="mr-2 text-heat-5">&bull;</span>
              {h}
            </li>
          ))}
        </ul>
      </PageHeader>

      {/* --------------------------------------------------- the numbers */}
      <Section tight>
        <Container>
          <SectionHead
            eyebrow="The field you are in"
            heading="How many people are doing this with you."
            sub="Published figures from the conducting authority, linked. These are the only competition numbers we will ever show you, because they are the only ones that can be checked."
          />
          <Reveal className="mt-8">
            <StatGrid stats={examStats} cols={examStats.length === 4 ? 4 : 3} />
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- the heat map */}
      <Section id="weightage" className="border-t border-line bg-surface/40">
        <Container>
          <SectionHead
            eyebrow="The data"
            heading={
              sets.length > 0
                ? 'Your branch, every year, every subject.'
                : 'We have not published this matrix yet.'
            }
            sub={
              sets.length > 0
                ? 'Switch branches. The stronger the cell, the more marks that subject carried that year. The free tool on this site has the same data, so you can audit the product before you pay for it.'
                : exam.dataStatus
            }
          />
          <div className="mt-9">
            {sets.length > 0 ? (
              <HeatmapWithCallouts datasets={sets} initialId={sets[0].id} />
            ) : (
              <Reveal>
                <div className="rounded-xl border border-dashed border-line-strong bg-canvas p-6 sm:p-8">
                  <p className="num text-[0.625rem] uppercase tracking-[0.1em] text-faint">
                    No chart here on purpose
                  </p>
                  <p className="mt-3 max-w-prose text-body leading-relaxed text-muted text-pretty">
                    We could put a placeholder chart here. Plenty of sites do. The matrix for this
                    exam is genuinely still being tagged, and showing you an illustrative version
                    of a number we have not computed would be the exact thing this product exists
                    to argue against.
                  </p>
                  <div className="mt-6 max-w-md">
                    <CaptureForm
                      source={`exam:${exam.slug}:no-data`}
                      examSlug={exam.slug}
                      buttonLabel="Tell me when it is published"
                      note="One message when the matrix goes live. Nothing else."
                    />
                  </div>
                  <Link
                    href="/free/weightage-map"
                    className="mt-5 inline-flex items-center gap-1.5 text-small text-accent transition-colors hover:text-accent-hover"
                  >
                    Meanwhile, the GATE matrix is finished and free
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- coverage */}
      <Section tight className="border-t border-line">
        <Container>
          <SectionHead
            eyebrow="Coverage, including the gaps"
            heading="What is in the pack, and what we deliberately left out."
            sub="Every pack has a skipped row. If a product page never shows you one, the product has not made a decision."
          />
          <Reveal className="mt-8">
            <CoverageTable rows={exam.syllabusCoverage} />
          </Reveal>
          {exam.hindiNote ? (
            <Reveal className="mt-5">
              <div className="rounded-xl border border-line bg-surface p-5">
                <p className="eyebrow">भाषा / Language</p>
                <p className="hi mt-2.5 text-[0.9375rem] leading-relaxed text-fg">
                  {exam.hindiNote.hi}
                </p>
                <p className="mt-2 text-small leading-relaxed text-muted">{exam.hindiNote.en}</p>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      {/* --------------------------------------------------- timeline */}
      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Official calendar</p>
              <h2 className="mt-3 text-h1 text-balance">Dates we did not make up.</h2>
              <p className="mt-4 max-w-[48ch] text-body leading-relaxed text-muted text-pretty">
                Ticks are computed against today&rsquo;s date when the page loads. Anything the
                authority has not actually published is marked unconfirmed rather than guessed.
              </p>
              <div className="mt-7">
                <Timeline milestones={exam.milestones} />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="eyebrow">Edition history</p>
              <h2 className="mt-3 text-h1 text-balance">Every version, dated.</h2>
              <p className="mt-4 max-w-[48ch] text-body leading-relaxed text-muted text-pretty">
                Including the corrections. You can read the whole log before you decide whether we
                are worth {exam.price ? inr(exam.price.now) : 'your email address'}.
              </p>
              <ol className="mt-7 space-y-4">
                {entries.map((e) => (
                  <li key={`${e.version}-${e.kind}-${e.date}`} className="card p-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="num text-[0.8125rem] font-medium text-fg">{e.version}</span>
                      <Badge tone={kindCopy[e.kind].tone}>{kindCopy[e.kind].label}</Badge>
                      <span className="num ml-auto text-[0.6875rem] text-faint">
                        {formatDate(e.date)}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.875rem] text-fg">{e.title}</p>
                    <ul className="mt-2 space-y-1.5">
                      {e.items.map((it) => (
                        <li key={it} className="flex gap-2 text-[0.8125rem] leading-relaxed text-muted">
                          <span aria-hidden className="mt-[9px] h-px w-2 shrink-0 bg-line-strong" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
              <Link
                href="/changelog"
                className="mt-4 inline-flex items-center gap-1.5 text-small text-accent transition-colors hover:text-accent-hover"
              >
                Full public changelog
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- pack contents */}
      <Section tight className="border-t border-line">
        <Container>
          <SectionHead
            eyebrow="Nine components"
            heading="What arrives when you download it."
          />
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {packComponents.map((c) => (
              <li key={c.id} className="bg-surface p-5">
                <span className="num text-[0.6875rem] text-heat-6">{c.n}</span>
                <h3 className="mt-2 text-[0.9375rem] font-medium leading-snug text-fg">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted text-pretty">
                  {c.summary}
                </p>
                <p className="num mt-2.5 text-[0.625rem] uppercase tracking-[0.06em] text-faint">
                  {c.spec}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* --------------------------------------------------- buy */}
      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{exam.priceNote}</p>
            <h2 className="mt-4 text-display-2 text-balance">
              {exam.price
                ? `${inr(exam.price.now)} for the ${exam.exam} pack.`
                : 'Not on sale yet, and we are not pretending otherwise.'}
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-lead text-muted text-pretty">
              {exam.price
                ? 'Instant download. Nothing ships. Seven days to ask for your money back after you have read the whole thing.'
                : 'Join the list and you get the launch price and the first edition before it is public.'}
            </p>
            <div className="mx-auto mt-8 max-w-sm">
              <ExamCta exam={exam} size="lg" />
            </div>
            <div className="mx-auto mt-6 max-w-md">
              <CaptureForm
                source={`exam:${exam.slug}:footer`}
                examSlug={exam.slug}
                buttonLabel="Send the free sample"
                note="Twelve pages, the full weightage matrix, no card required."
              />
            </div>
            <ButtonLink href="/pricing" variant="ghost" className="mt-6">
              Compare all five tiers
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <FaqSection
        ids={exam.faqIds}
        heading={`${exam.exam}, the awkward questions.`}
        sub="Everything here is answered the way we would answer it on a call, including the places the product is weak."
      />

      <Section tight className="border-t border-line">
        <Container>
          <SourceList ids={exam.sourceIds} heading={`Sources for ${exam.exam}`} />
        </Container>
      </Section>
    </>
  )
}
