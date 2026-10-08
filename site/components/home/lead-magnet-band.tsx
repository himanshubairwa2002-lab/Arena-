import { ArrowRight, Download } from 'lucide-react'
import { gateCse } from '@/data/weightage'
import { aggregate } from '@/lib/heat'
import { ButtonLink } from '@/components/ui/button'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'

const agg = aggregate(gateCse)
const top6 = agg.slice(0, 6).reduce((t, a) => t + a.share, 0)
const bottom4 = agg.slice(-4).reduce((t, a) => t + a.share, 0)

export function LeadMagnetBand() {
  return (
    <Section aria-labelledby="lead-heading" className="border-t border-line" tight>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
            <div aria-hidden className="bg-graph-fine absolute inset-0 opacity-70" />
            <div className="relative grid gap-8 p-6 sm:p-9 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
              <div>
                <p className="eyebrow">Free, no sign-up to view</p>
                <h2 id="lead-heading" className="mt-3 max-w-[20ch] text-h1 text-balance">
                  The whole heat map is free. Read it on the site.
                </h2>
                <p className="mt-4 max-w-[52ch] text-body leading-relaxed text-muted text-pretty">
                  Four branches, {gateCse.years.length} years, every subject. Export it as a PNG
                  and send it to your group. The paid pack is the other eight chapters &mdash; the
                  map is the part we give away.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/free/weightage-map">
                    Open the free tool
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </ButtonLink>
                  <ButtonLink href="/free/weightage-map#download" variant="ghost">
                    <Download className="h-4 w-4" aria-hidden />
                    Download as PNG
                  </ButtonLink>
                </div>
              </div>

              <dl className="grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:w-[280px]">
                <div className="bg-canvas p-4">
                  <dt className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                    Top 6 subjects
                  </dt>
                  <dd className="num mt-1.5 text-[1.5rem] font-medium leading-none text-heat-6">
                    {top6.toFixed(1)}%
                  </dd>
                </div>
                <div className="bg-canvas p-4">
                  <dt className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                    Bottom 4 subjects
                  </dt>
                  <dd className="num mt-1.5 text-[1.5rem] font-medium leading-none text-muted">
                    {bottom4.toFixed(1)}%
                  </dd>
                </div>
                <div className="col-span-2 bg-canvas p-4">
                  <dt className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                    GATE CSE, {gateCse.years[0]}&ndash;{gateCse.years[gateCse.years.length - 1]}
                  </dt>
                  <dd className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
                    Half the subject list is worth{' '}
                    <span className="num text-fg">{bottom4.toFixed(1)}</span> marks a paper between
                    them. Spend your October accordingly.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
