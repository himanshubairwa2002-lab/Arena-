import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd, faqLd } from '@/lib/jsonld'
import { faqById, type Faq } from '@/content/faq'
import { tiers } from '@/content/pricing'
import { inr } from '@/lib/utils'
import { Container, Section, SectionHead } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { PricingTable } from '@/components/home/pricing-table'
import { FaqSection } from '@/components/home/faq-section'
import { Reveal } from '@/components/motion/reveal'

const pricingFaqIds = ['refund', 'updates', 'branch', 'devices', 'preorder-charge', 'print', 'support']

export const metadata: Metadata = pageMeta({
  title: 'Pricing \u2014 five tiers, from \u20B90 to \u20B94,999',
  description:
    'Free sample, single subject \u20B9299, Core Decode \u20B9599, full bundle \u20B91,299, bundle with mentorship \u20B94,999. GST included, instant download, seven-day refund.',
  path: '/pricing',
  og: {
    heading: 'Five tiers. One of them is free.',
    kicker: 'Pricing',
    stat: '\u20B9599',
    statLabel: 'Core Decode, GST included',
  },
})

const honesty = [
  {
    h: 'Who should buy nothing',
    b: 'If you have not finished a first pass of the syllabus, a weightage matrix will not help you. It tells you where to concentrate revision. It cannot revise something you have never read. Come back in six weeks.',
  },
  {
    h: 'Who should buy the \u20B9299 tier',
    b: 'You are strong everywhere except one subject and you know which one. Buy that subject, skip the rest of the pack, spend the saved money on test series.',
  },
  {
    h: 'Who should buy the \u20B9599 tier',
    b: 'You are sitting one paper, you want the full matrix, the calendars and the trap analysis, and you want it this week. This is the one we recommend and the only one we highlight.',
  },
  {
    h: 'Who should buy the \u20B94,999 tier',
    b: 'You are a repeat attempter and the thing that went wrong last time was execution, not knowledge. The mentorship hours exist to make the calendar actually happen. If you are a first-timer, do not buy this.',
  },
]

export default function PricingPage() {
  const faqs = pricingFaqIds.map((id) => faqById[id]).filter((f): f is Faq => Boolean(f))
  const core = tiers.find((t) => t.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqLd(faqs),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Pricing', path: '/pricing' },
            ]),
          ]),
        }}
      />

      <PageHeader
        eyebrow="Pricing · GST included · instant download"
        heading="Five tiers. One of them is free and it is not a trap."
        sub={`The whole ladder is on this page with no "contact us" step and no price that appears only after you give us a phone number. The one we recommend is ${core ? inr(core.price) : '\u20B9599'}.`}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ]}
      />

      <PricingTable standalone />

      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <SectionHead
            eyebrow="Buying advice, against our own interest"
            heading="Two of these four paragraphs tell you to spend less."
            sub="A price table that only argues upward is a price table written by someone who has never had to answer for it."
          />
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {honesty.map((x, i) => (
              <Reveal key={x.h} delay={i * 0.04} className="bg-canvas p-5 sm:p-6">
                <h3 className="text-h3 text-pretty">{x.h}</h3>
                <p className="mt-2.5 text-body leading-relaxed text-muted text-pretty">{x.b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tight className="border-t border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Refunds</p>
              <h2 className="mt-3 text-h1 text-balance">Seven days, after you have read it.</h2>
              <div className="prose-skiplist mt-5 max-w-prose">
                <p>
                  A digital product with no refund is a dare. A digital product with a refund that
                  expires before you can read it is the same dare with extra steps.
                </p>
                <p>
                  Ours runs for seven days from the download, and reading the whole pack does not
                  void it. Email us, say it was not worth it, and the money goes back to the
                  original payment method. We do not ask for a reason and we do not route you
                  through a retention script.
                </p>
                <p>
                  Mentorship sessions already delivered are deducted at the standalone rate.
                  Everything else refunds in full. The complete policy is on the{' '}
                  <a href="/refund-policy">refund page</a>.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="eyebrow">Payment</p>
              <h2 className="mt-3 text-h1 text-balance">What happens at checkout, honestly.</h2>
              <div className="prose-skiplist mt-5 max-w-prose">
                <p>
                  Payments are not live yet. Clicking a buy button opens a dialog that says exactly
                  that and offers to take your email so we can tell you the day it opens. Nothing
                  is charged, no card form appears, and no payment provider is loaded in your
                  browser.
                </p>
                <p>
                  When it does go live it will be UPI, cards and netbanking through an Indian
                  gateway, with the GST-inclusive price shown before you commit. Downloads are
                  instant and nothing ships.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection
        ids={pricingFaqIds}
        heading="Money questions."
        eyebrow="Pricing FAQ"
        sub="Refunds, updates, device limits and what a pre-order actually commits you to."
      />
    </>
  )
}
