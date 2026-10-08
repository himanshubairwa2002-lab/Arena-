import { Check, Minus } from 'lucide-react'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'

type Row = { capability: string; us: boolean; pdfs: boolean; course: boolean; note: string }

const rows: Row[] = [
  {
    capability: 'Tells you what to skip',
    us: true,
    pdfs: false,
    course: false,
    note: 'A syllabus and a question bank both assume you will do everything.',
  },
  {
    capability: 'Shows the mark distribution per year',
    us: true,
    pdfs: false,
    course: true,
    note: 'Most free PDFs give one averaged number with no year column.',
  },
  {
    capability: 'Names its source for every figure',
    us: true,
    pdfs: false,
    course: false,
    note: 'Forwarded PDFs rarely say who counted, or when.',
  },
  {
    capability: 'Costs less than one month of coaching',
    us: true,
    pdfs: true,
    course: false,
    note: 'Our top single-exam pack is a fraction of a typical course fee.',
  },
  {
    capability: 'Finishes in a weekend',
    us: true,
    pdfs: true,
    course: false,
    note: 'A 180-hour video course is not a revision strategy in October.',
  },
  {
    capability: 'Published changelog and corrections',
    us: true,
    pdfs: false,
    course: false,
    note: 'When we get something wrong we date the fix in public.',
  },
  {
    capability: 'Teaches the subject from scratch',
    us: false,
    pdfs: false,
    course: true,
    note: 'We are not a course. If you have not studied it, this will not teach it.',
  },
]

const cols = [
  { key: 'us' as const, label: 'Skiplist', strong: true },
  { key: 'pdfs' as const, label: 'Free PDFs', strong: false },
  { key: 'course' as const, label: 'Full course', strong: false },
]

function Mark({ on, strong }: { on: boolean; strong: boolean }) {
  return on ? (
    <>
      <Check
        className={strong ? 'mx-auto h-4 w-4 text-heat-6' : 'mx-auto h-4 w-4 text-muted'}
        aria-hidden
      />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-4 w-4 text-line-strong" aria-hidden />
      <span className="sr-only">No</span>
    </>
  )
}

export function ComparisonBand() {
  return (
    <Section aria-labelledby="compare-heading" className="border-t border-line bg-surface/40" tight>
      <Container>
        <Reveal>
          <p className="eyebrow">Where this fits</p>
          <h2 id="compare-heading" className="mt-3 max-w-[24ch] text-h1 text-balance">
            This replaces a folder, not a teacher.
          </h2>
          <p className="mt-4 max-w-[58ch] text-lead text-muted text-pretty">
            We are not competing with your coaching class. We are competing with the folder of
            forwarded PDFs you have never opened. Here is the honest version, including the row
            where we lose.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-9 overflow-x-auto rounded-xl border border-line bg-canvas">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Capability comparison between Skiplist, free forwarded PDFs and a full coaching
                course
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="eyebrow px-5 py-3 font-medium">
                    Capability
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`w-[104px] px-3 py-3 text-center text-[0.75rem] font-medium ${
                        c.strong ? 'text-fg' : 'text-muted'
                      }`}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.capability} className="border-b border-line/60 last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-normal">
                      <span className="block text-[0.875rem] text-fg">{r.capability}</span>
                      <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-faint">
                        {r.note}
                      </span>
                    </th>
                    {cols.map((c) => (
                      <td key={c.key} className="px-3 py-3.5 text-center align-top">
                        <Mark on={r[c.key]} strong={c.strong} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
