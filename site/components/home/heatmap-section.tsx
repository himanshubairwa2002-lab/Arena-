import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { taglines } from '@/content/copy'
import { datasets, gateCse } from '@/data/weightage'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { HeatmapWithCallouts } from '@/components/heatmap/heatmap-with-callouts'

export function HeatmapSection() {
  const years = `${gateCse.years[0]}\u2013${gateCse.years[gateCse.years.length - 1]}`

  return (
    <Section id="heatmap" aria-labelledby="heatmap-heading" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-graph-fine absolute inset-x-0 top-0 h-80 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <div className="grid gap-x-10 gap-y-4 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="eyebrow">The signature chart</p>
              <h2 id="heatmap-heading" className="mt-3 max-w-[22ch] text-h1 text-balance">
                {taglines.heatmap}
              </h2>
            </div>
            <Link
              href="/free/weightage-map"
              className="group inline-flex shrink-0 items-center gap-1.5 self-start text-small text-accent transition-colors hover:text-accent-hover lg:self-end lg:pb-1.5"
            >
              Open the full free tool
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            <p className="max-w-[58ch] text-lead text-muted text-pretty lg:col-span-2">
              Every GATE paper from {years}, four branches, every subject, every year. The stronger
              the cell, the more marks it carried. Switch branches, switch the metric, hover any
              cell. Then look at the bottom four rows and ask what they cost you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <HeatmapWithCallouts datasets={datasets} initialId="gate-cse" />
        </Reveal>
      </Container>
    </Section>
  )
}
