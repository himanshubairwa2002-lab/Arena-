'use client'

import { ArrowRight } from 'lucide-react'
import { hero } from '@/content/copy'
import { exams } from '@/data/exams'
import { stats } from '@/data/sources'
import { gateCse } from '@/data/weightage'
import { Button, ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/site/container'
import { Countdown } from '@/components/site/countdown'
import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/motion/reveal'
import { initiateCheckout } from '@/lib/checkout'
import { HeroChart } from './hero-chart'

const gate = exams[0]

const trustStrip = [
  {
    value: Number(stats.gateAppeared2026.display),
    decimals: 2,
    suffix: ' lakh',
    label: 'sat GATE 2026',
    sub: 'IIT Guwahati statistical report',
  },
  {
    value: gateCse.years.length,
    decimals: 0,
    suffix: ' years',
    label: 'of papers analysed',
    sub: `${gateCse.years[0]}\u2013${gateCse.years[gateCse.years.length - 1]}, four branches`,
  },
  {
    value: 3,
    decimals: 0,
    suffix: '',
    label: 'exams covered',
    sub: 'GATE, CUET UG, State PSC',
  },
  {
    value: 0,
    decimals: 0,
    suffix: ' min',
    label: 'to download',
    sub: 'PDF, instant, nothing ships',
  },
]

export function Hero() {
  return (
    <section className="glow-accent relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-graph absolute inset-0 [mask-image:radial-gradient(75%_65%_at_50%_0%,black,transparent)]"
      />
      <div aria-hidden className="noise" />

      <Container className="relative pb-14 pt-12 sm:pb-18 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
          {/* ------------------------------------------------------ copy */}
          <div>
            <Reveal mode="load" y={6}>
              <p className="eyebrow">{hero.eyebrow}</p>
            </Reveal>

            <Reveal mode="load" y={10} delay={0.04}>
              <h1 className="mt-4 max-w-[12ch] text-display-1 text-balance">{hero.headline}</h1>
            </Reveal>

            <Reveal mode="load" y={10} delay={0.08}>
              <p className="mt-5 max-w-[52ch] text-lead text-muted text-pretty">{hero.sub}</p>
            </Reveal>

            <Reveal mode="load" y={10} delay={0.12}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" onClick={() => initiateCheckout(`exam:${gate.slug}`)}>
                  {hero.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <ButtonLink href="/free/weightage-map" variant="ghost" size="lg">
                  {hero.secondaryCta}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal mode="load" y={10} delay={0.16}>
              <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-line pt-6">
                <Countdown target={gate.countdown.date} label={hero.countdownLabel} size="md" />
                <div className="pb-0.5">
                  <p className="num text-[0.75rem] text-muted">{gate.examWindow}</p>
                  <p className="num mt-1 text-[0.6875rem] text-faint">
                    Registration closed 5 Oct 2026 &middot; {gate.authority}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ----------------------------------------------------- visual */}
          <Reveal mode="load" y={14} delay={0.1} className="lg:justify-self-end lg:w-full">
            <HeroChart />
          </Reveal>
        </div>

        {/* -------------------------------------------------- trust strip */}
        <Reveal mode="load" y={10} delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
            {trustStrip.map((s) => (
              <div key={s.label} className="bg-canvas p-4">
                <dd className="num text-[1.375rem] font-medium leading-none tracking-[-0.04em] text-fg">
                  {s.value === 0 ? (
                    <>&lt;1 min</>
                  ) : (
                    <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  )}
                </dd>
                <dt className="mt-2 text-[0.8125rem] text-muted">{s.label}</dt>
                <p className="num mt-0.5 text-[0.6875rem] leading-tight text-faint">{s.sub}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
