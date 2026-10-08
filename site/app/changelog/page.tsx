import type { Metadata } from 'next'
import { changelog, kindCopy } from '@/data/changelog'
import { examsBySlug } from '@/data/exams'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'
import { formatLongDate } from '@/lib/dates'
import { Badge } from '@/components/ui/badge'
import { Container, Section } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = pageMeta({
  title: 'Changelog \u2014 every edition and every correction, dated',
  description:
    'What shipped, what is planned, and what we got wrong. Corrections are never edited away.',
  path: '/changelog',
  og: {
    heading: 'Every edition, and every correction.',
    kicker: 'Public changelog',
  },
})

const sorted = [...changelog].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export default function ChangelogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Changelog', path: '/changelog' },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Public changelog"
        heading="Every edition. Every correction. Both dated."
        sub="Updates are free for your exam cycle, so this page is also the honest version of what you are buying: a document that changes, with a record of how it changed. Corrections stay on the page. We do not quietly edit a mistake away and move on."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ]}
      />

      <Section tight>
        <Container>
          <ol className="relative border-l border-line pl-6 sm:pl-8">
            {sorted.map((e, i) => {
              const exam = e.exam === 'all' ? null : examsBySlug[e.exam]
              return (
                <Reveal key={`${e.exam}-${e.version}-${e.kind}-${i}`} as="li" delay={i * 0.03} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[29px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-canvas sm:-left-[37px] ${
                      e.kind === 'shipped'
                        ? 'bg-heat-6'
                        : e.kind === 'correction'
                          ? 'bg-accent'
                          : 'bg-line-strong'
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge tone={kindCopy[e.kind].tone}>{kindCopy[e.kind].label}</Badge>
                    <span className="num text-[0.8125rem] font-medium text-fg">{e.version}</span>
                    {exam ? (
                      <span className="num text-[0.6875rem] text-faint">{exam.exam}</span>
                    ) : null}
                    <time
                      dateTime={e.date}
                      className="num ml-auto text-[0.75rem] text-faint"
                    >
                      {formatLongDate(e.date)}
                    </time>
                  </div>

                  <h2 className="mt-3 text-h3 text-pretty">{e.title}</h2>

                  <ul className="mt-3 space-y-2">
                    {e.items.map((it) => (
                      <li key={it} className="flex gap-3 text-body leading-relaxed text-muted text-pretty">
                        <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" />
                        <span className="min-w-0">{it}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </ol>

          <Reveal className="mt-4">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="eyebrow">How to read this page</p>
              <ul className="mt-3 space-y-2 text-small leading-relaxed text-muted">
                <li>
                  <span className="num text-heat-6">Shipped</span> means the file is downloadable
                  today.
                </li>
                <li>
                  <span className="num text-faint">Planned</span> means we intend to do it and have
                  put a date against it. A planned entry that slips gets a new dated entry
                  explaining why, not a silent date change.
                </li>
                <li>
                  <span className="num text-accent">Correction</span> means we published something
                  wrong or incomplete. It stays here permanently.
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
