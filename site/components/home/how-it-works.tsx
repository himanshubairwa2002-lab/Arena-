import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { howItWorks } from '@/content/copy'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'

export function HowItWorks() {
  return (
    <Section aria-labelledby="how-heading" className="border-t border-line" tight>
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{howItWorks.eyebrow}</p>
              <h2 id="how-heading" className="mt-3 max-w-[22ch] text-h1 text-balance">
                {howItWorks.heading}
              </h2>
            </div>
            <Link
              href="/how-it-works"
              className="group inline-flex shrink-0 items-center gap-1.5 text-small text-accent transition-colors hover:text-accent-hover"
            >
              Read the full methodology
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </div>
          <p className="mt-4 max-w-[56ch] text-lead text-muted text-pretty">{howItWorks.sub}</p>
        </Reveal>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.n} as="li" delay={i * 0.06} className="relative">
              <div className="flex items-center gap-3">
                <span className="num text-[0.6875rem] tracking-[0.1em] text-heat-6">{step.n}</span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-4 text-h3">{step.title}</h3>
              <p className="mt-2 text-body leading-relaxed text-muted text-pretty">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
