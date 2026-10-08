import { finalCta } from '@/content/copy'
import { exams } from '@/data/exams'
import { site } from '@/content/site'
import { Container, Section } from '@/components/site/container'
import { Countdown } from '@/components/site/countdown'
import { CaptureForm } from '@/components/forms/capture-form'
import { Reveal } from '@/components/motion/reveal'
import { formatLongDate } from '@/lib/dates'

export function FinalCta() {
  const gate = exams[0]

  return (
    <Section aria-labelledby="final-heading" className="glow-accent relative overflow-hidden border-t border-line" tight>
      <div
        aria-hidden
        className="bg-graph absolute inset-0 [mask-image:radial-gradient(60%_70%_at_50%_100%,black,transparent)]"
      />
      <div aria-hidden className="noise" />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{formatLongDate(gate.countdown.date)}</p>
            <h2 id="final-heading" className="mt-4 text-display-2 text-balance">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-lead text-muted text-pretty">
              {finalCta.sub}
            </p>

            <div className="mt-8 flex justify-center">
              <Countdown target={gate.countdown.date} size="md" />
            </div>

            <div className="mx-auto mt-8 max-w-md">
              <CaptureForm
                source="final-cta"
                examSlug={gate.slug}
                buttonLabel={finalCta.button}
                note={finalCta.reassurance}
              />
            </div>

            <p className="mt-6 text-[0.75rem] text-faint">
              Prefer to ask first?{' '}
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 decoration-accent/40"
              >
                WhatsApp us
              </a>{' '}
              or join{' '}
              <a
                href={site.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 decoration-accent/40"
              >
                the Telegram
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
