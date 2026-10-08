import { problem } from '@/content/copy'
import { exams } from '@/data/exams'
import { gateCse } from '@/data/weightage'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { WeeksLeft } from '@/components/site/countdown'

export function Problem() {
  const gate = exams[0]
  const subjectCount = gateCse.subjects.length

  return (
    <Section aria-labelledby="problem-heading" className="border-t border-line bg-surface/40" tight>
      <Container>
        <Reveal>
          <p className="eyebrow">{problem.eyebrow}</p>
          <h2 id="problem-heading" className="mt-3 max-w-[18ch] text-h1 text-balance">
            {problem.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-lead text-muted text-pretty">{problem.sub}</p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {problem.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06} className="bg-canvas p-6 sm:p-7">
              <p className="num text-[2.75rem] font-medium leading-none tracking-[-0.05em] text-fg">
                {card.stat === null ? (
                  <WeeksLeft target={gate.countdown.date} />
                ) : card.stat === '12' ? (
                  subjectCount
                ) : (
                  card.stat
                )}
              </p>
              <p className="num mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-faint">
                {card.unit}
              </p>
              <h3 className="mt-5 text-[0.9375rem] font-medium leading-snug text-fg text-pretty">
                {card.title}
              </h3>
              <p className="mt-2 text-body leading-relaxed text-muted text-pretty">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
