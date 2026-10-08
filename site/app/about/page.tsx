import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'
import { datasets, gateCse } from '@/data/weightage'
import { Container, Section, SectionHead } from '@/components/site/container'
import { PageHeader } from '@/components/site/page-header'
import { SourceList } from '@/components/site/source-note'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'

export const metadata: Metadata = pageMeta({
  title: 'About \u2014 why a weightage company exists',
  description:
    'Skiplist is a small team building previous-year-question analytics for Indian competitive exams. What we are, what we are not, and the rules we hold ourselves to.',
  path: '/about',
  og: {
    heading: 'We sell a decision, not a syllabus.',
    kicker: 'About Skiplist',
  },
})

const rules = [
  {
    n: '01',
    h: 'No number without a source',
    b: 'Every figure on this site is either linked to a published document or computed from the datasets in this repository. There is a sources block at the bottom of every data-heavy page. If you find a number that does not trace, that is a bug and we will fix it in the changelog.',
  },
  {
    n: '02',
    h: 'No testimonials until they are real',
    b: 'The testimonials file on this site is empty. It will stay empty until we have customers who finished a cycle and are willing to be named. Nobody needs another invented quote from a student who does not exist.',
  },
  {
    n: '03',
    h: 'No guarantee of selection, ever',
    b: 'We will never tell you a product guarantees a rank, a seat, or a post. Anybody who does is either lying or has not looked at the qualification ratios. We will tell you what the papers asked. What you do with it is yours.',
  },
  {
    n: '04',
    h: 'No fake scarcity',
    b: 'No countdown timer that resets when you reload. No "4 people are viewing this". No "price goes up at midnight". The only clock on this site counts to a real exam date published by a real conducting body.',
  },
  {
    n: '05',
    h: 'No copied material',
    b: 'We reference questions by year and number. We do not reproduce question papers, NCERT text, or any coaching institute\u2019s notes. The source column in our schema points at a chapter, never a quotation.',
  },
  {
    n: '06',
    h: 'Corrections stay on the record',
    b: 'When we get something wrong, the wrong version does not quietly disappear. It stays in the public changelog with the fix underneath it and a date on both.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow={`${site.legalName} \u00B7 India`}
        heading="We sell a decision, not a syllabus."
        sub="Skiplist is a small team that reads question papers for a living. We are not a coaching institute, we do not run classes, and we have no opinion on whether you should take a course. We have one opinion, and it is about where your next hundred hours should go."
        trail={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <Section tight>
        <Container>
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:gap-16">
            <div className="prose-skiplist max-w-prose">
              <h2>Where this came from</h2>
              <p>
                Every serious aspirant in India eventually acquires the same folder. Forty PDFs
                called something like <span className="num">GATE_CS_weightage_FINAL_v3.pdf</span>,
                forwarded through four WhatsApp groups, with no author, no year, no method and
                mutually contradictory numbers. Half of them count questions. Half count marks.
                None of them say which.
              </p>
              <p>
                The underlying question those files are trying to answer is a good one and it has
                an actual answer. Papers are public. Marks are printed on them. The distribution
                of marks across subjects is a measurable property of a decade and a half of
                documents, and it is remarkably stable. Somebody just has to sit down and count
                properly, write down how they counted, and publish the gaps.
              </p>
              <p>
                That is the entire company. {datasets.length} branches,{' '}
                {gateCse.years.length} years, one schema, published method.
              </p>

              <h2>What we are not</h2>
              <p>
                We are not a course. If you have not studied a subject, our pack will tell you that
                subject is worth nine marks a year and will not teach you a single one of them. We
                are not a test series. We are not a mentorship company, although four hours of it
                are attached to the top tier for people who have already failed once on execution
                rather than knowledge.
              </p>
              <p>
                We are also not neutral about the tail of the syllabus. The product has an opinion
                and the opinion is that most aspirants are spending real weeks on material that has
                produced under two marks a year for a decade. Disagreeing with that is reasonable.
                Disagreeing with it after looking at the grid is more interesting.
              </p>

              <h2>How we make money</h2>
              <p>
                One-time payments for downloadable packs, between &#8377;299 and &#8377;4,999, plus
                an optional update subscription after your exam cycle ends. No advertising, no
                selling of email lists, no affiliate links to coaching platforms, no commission on
                anything we recommend. We have not taken money from any coaching institute and the
                moment we do, it will say so on this page.
              </p>
            </div>

            <Reveal delay={0.06}>
              <div className="lg:sticky lg:top-20">
                <div className="card p-5">
                  <p className="eyebrow">Contact</p>
                  <ul className="mt-3 space-y-2.5">
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="num text-small text-fg underline underline-offset-4 decoration-line-strong hover:decoration-accent"
                      >
                        {site.email}
                      </a>
                      <p className="mt-0.5 text-[0.6875rem] text-faint">
                        Replies within one working day
                      </p>
                    </li>
                    <li>
                      <a
                        href={site.telegram.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="num text-small text-fg underline underline-offset-4 decoration-line-strong hover:decoration-accent"
                      >
                        {site.telegram.handle}
                      </a>
                      <p className="mt-0.5 text-[0.6875rem] text-faint">
                        Free charts, no selling in the channel
                      </p>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="num text-[0.6875rem] leading-relaxed text-faint">
                      {site.legalName}
                      <br />
                      {site.address}
                      <br />
                      GSTIN on invoice
                    </p>
                  </div>
                </div>
                <ButtonLink href="/how-it-works" variant="ghost" className="mt-4 w-full">
                  Read the methodology
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tight className="border-t border-line bg-surface/40">
        <Container>
          <SectionHead
            eyebrow="House rules"
            heading="Six things we will not do, written down so you can hold us to them."
          />
          <ol className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {rules.map((r, i) => (
              <Reveal key={r.n} as="li" delay={i * 0.03}>
                <div className="flex items-center gap-3">
                  <span className="num text-[0.6875rem] tracking-[0.1em] text-heat-6">{r.n}</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-3.5 text-h3 text-pretty">{r.h}</h3>
                <p className="mt-2 text-body leading-relaxed text-muted text-pretty">{r.b}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-prose text-small leading-relaxed text-faint">
              If we break one of these, the correction goes in the{' '}
              <Link href="/changelog" className="text-accent underline underline-offset-4">
                public changelog
              </Link>{' '}
              with a date, not into a quiet edit.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tight className="border-t border-line">
        <Container>
          <SourceList
            ids={['gateSchedule', 'gateStats2026', 'aceWeightage', 'ntaCuet2026', 'uppsc2026', 'bpsc72']}
            heading="Everything this site cites"
          />
        </Container>
      </Section>
    </>
  )
}
