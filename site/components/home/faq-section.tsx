import { faqById, type Faq } from '@/content/faq'
import { site } from '@/content/site'
import { Accordion } from '@/components/ui/accordion'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'

export function FaqSection({
  ids,
  heading = 'Ten objections, answered straight.',
  eyebrow = 'FAQ',
  sub,
}: {
  ids: string[]
  heading?: string
  eyebrow?: string
  sub?: string
}) {
  const items = ids.map((id) => faqById[id]).filter((f): f is Faq => Boolean(f))

  return (
    <Section id="faq" aria-labelledby="faq-heading" className="border-t border-line" tight>
      <Container>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-20">
              <p className="eyebrow">{eyebrow}</p>
              <h2 id="faq-heading" className="mt-3 text-h1 text-balance">
                {heading}
              </h2>
              <p className="mt-4 max-w-[42ch] text-body leading-relaxed text-muted text-pretty">
                {sub ??
                  'If your objection is not here, it is probably a good one. Send it to us and it goes on the list.'}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="num mt-4 inline-block text-small text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:text-accent-hover"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
