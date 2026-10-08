/**
 * The public changelog. Every edition, every correction, dated.
 *
 * Rules for this file:
 *  1. Nothing is added here that has not actually shipped, except entries
 *     explicitly marked `planned`.
 *  2. Corrections are never edited away. If we got something wrong, the wrong
 *     thing stays on the record with the fix underneath it.
 *  3. Dates are ISO. They render through lib/dates so the format is consistent.
 */

export type ChangeKind = 'shipped' | 'planned' | 'correction'

export type ChangeEntry = {
  version: string
  date: string
  kind: ChangeKind
  exam: 'gate-2027' | 'cuet-ug-2027' | 'state-psc' | 'all'
  title: string
  items: string[]
}

export const changelog: ChangeEntry[] = [
  {
    version: '2027.1',
    date: '2026-10-07',
    kind: 'shipped',
    exam: 'gate-2027',
    title: 'First GATE 2027 edition',
    items: [
      'Weightage matrix built for CS, ME, EC and CE across the 2012\u20132026 papers.',
      'Cut-off chapter built on the GATE 2026 statistical report released by IIT Guwahati on 25 September 2026.',
      'Revision calendars generated at 45, 30, 15 and 7 days, ordered by marks per hour.',
      'Exam-day schedule set to 6, 7, 13, 14, 20 and 21 February 2027 per the IIT Madras notification.',
    ],
  },
  {
    version: '2027.1',
    date: '2026-10-07',
    kind: 'correction',
    exam: 'gate-2027',
    title: 'Column total for CS 2024 does not reach 100',
    items: [
      'The published CS 2024 subject table we work from sums to 98 marks, not 100. We have not found a public breakdown for the missing 2 marks.',
      'We did not pad the gap. Percentages for 2024 are computed against the actual column total of 98, and the column total is printed under the matrix in both the PDF and the web tool.',
      'The ME and CE tables omit General Aptitude and, for ME, Engineering Mathematics. Those rows are added at the official 15-mark aptitude weighting and labelled as derived wherever they appear.',
    ],
  },
  {
    version: '2027.2',
    date: '2026-11-15',
    kind: 'planned',
    exam: 'gate-2027',
    title: 'Micro-topic ontology published',
    items: [
      'The full micro-topic tag list for CS goes public so you can audit how a question was classified.',
      'Repeat index extended with a third class for questions that reuse a 2012\u20132015 solution path under new numbers.',
    ],
  },
  {
    version: '2027.3',
    date: '2027-01-10',
    kind: 'planned',
    exam: 'gate-2027',
    title: 'Pre-exam refresh',
    items: [
      'Final calendar rebuild against the confirmed session dates once admit cards are out.',
      'Trap chapter updated with anything the 2026 paper introduced that we under-weighted.',
    ],
  },
  {
    version: '2027.0',
    date: '2026-10-07',
    kind: 'planned',
    exam: 'cuet-ug-2027',
    title: 'CUET UG 2027 build starts',
    items: [
      'Domain-subject weightage from the 2022\u20132026 papers, starting with the ten highest-registration subjects.',
      'Build is gated on NTA notifying the 2027 pattern. If the pattern changes materially, pre-orders are refunded rather than shipped late.',
    ],
  },
  {
    version: '2027.0',
    date: '2026-10-07',
    kind: 'planned',
    exam: 'state-psc',
    title: 'UPPSC and BPSC scoping',
    items: [
      'Prelims GS weightage for UPPSC PCS and BPSC CCE, split by the paper structure each commission actually uses.',
      'Hindi edition planned alongside English, not after it.',
    ],
  },
]

export const changelogByExam = (slug: ChangeEntry['exam']) =>
  changelog.filter((c) => c.exam === slug || c.exam === 'all')

export const kindCopy: Record<ChangeKind, { label: string; tone: 'live' | 'waitlist' | 'accent' }> = {
  shipped: { label: 'Shipped', tone: 'live' },
  planned: { label: 'Planned', tone: 'waitlist' },
  correction: { label: 'Correction', tone: 'accent' },
}
