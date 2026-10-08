import type { SourceId } from './sources'

export type ExamStatus = 'live' | 'preorder' | 'waitlist'

export type Milestone = {
  label: string
  /** ISO date, or null when the authority has not published one. */
  date: string | null
  /** Shown instead of a date when `date` is null. */
  note?: string
  confirmed: boolean
}

export type CountdownTarget = {
  /** ISO date the clock counts to. */
  date: string
  /** e.g. "GATE 2027, day one". */
  label: string
  /** True only when the conducting authority has published this exact date. */
  confirmed: boolean
  /** Rendered under the clock when `confirmed` is false. */
  caveat?: string
}

export type SyllabusCoverageRow = {
  area: string
  covered: 'full' | 'high-yield' | 'skip'
  note: string
}

export type Edition = {
  version: string
  date: string
  status: 'shipped' | 'in-progress' | 'planned'
  items: string[]
}

export type Exam = {
  slug: string
  /** Short product name, e.g. "GATE 2027 Decode". */
  product: string
  /** Exam name on its own, e.g. "GATE 2027". */
  exam: string
  authority: string
  officialUrl: string
  status: ExamStatus
  statusLabel: string
  /** One-line positioning used on cards and in the hero. */
  pitch: string
  /** Longer hero paragraph on the product page. */
  intro: string
  audience: string
  examWindow: string
  countdown: CountdownTarget
  milestones: Milestone[]
  /** Dataset ids from data/weightage. Empty when we have no published matrix yet. */
  datasetIds: string[]
  /** Shown when datasetIds is empty. */
  dataStatus?: string
  price: { now: number; mrp: number } | null
  priceNote: string
  cta: { primary: string; secondary: string }
  /** Four bullets for the product card. */
  highlights: string[]
  syllabusCoverage: SyllabusCoverageRow[]
  editions: Edition[]
  faqIds: string[]
  statIds: string[]
  sourceIds: SourceId[]
  /** Set on the State PSC page. */
  hindiNote?: { hi: string; en: string }
}

export const exams: Exam[] = [
  {
    slug: 'gate-2027',
    product: 'GATE 2027 Decode',
    exam: 'GATE 2027',
    authority: 'IIT Madras',
    officialUrl: 'https://gate2027.iitm.ac.in/',
    status: 'live',
    statusLabel: 'Live now',
    pitch: 'Branch-wise weightage for CSE, ME, ECE and CE, built on 2012–2026 papers.',
    intro:
      'Registration closed on 5 October 2026. Nobody new is joining the queue and nobody is leaving it. From here it is fifteen weeks of revision against a syllabus that has not moved in a decade — which is exactly the kind of problem that a fifteen-year mark distribution solves.',
    audience: 'Final-year engineering students and working graduates, 21–26',
    examWindow: '6, 7, 13, 14, 20 and 21 February 2027',
    countdown: {
      date: '2027-02-06T09:30:00+05:30',
      label: 'GATE 2027, day one',
      confirmed: true,
    },
    milestones: [
      { label: 'Notification released', date: '2026-07-20', confirmed: true },
      { label: 'Registration closed (regular)', date: '2026-09-27', confirmed: true },
      { label: 'Registration closed (with late fee)', date: '2026-10-05', confirmed: true },
      { label: 'Application correction window', date: '2026-10-14', confirmed: true, note: 'to 21 Oct 2026' },
      { label: 'City intimation slip', date: '2027-01-04', confirmed: true },
      { label: 'Admit card', date: null, note: 'January 2027', confirmed: false },
      { label: 'Exam days', date: '2027-02-06', confirmed: true, note: '6, 7, 13, 14, 20, 21 Feb' },
      { label: 'Result', date: '2027-03-19', confirmed: true },
    ],
    datasetIds: ['gate-cse', 'gate-me', 'gate-ece', 'gate-ce'],
    price: { now: 599, mrp: 1199 },
    priceNote: 'One branch, one cycle. GST included.',
    cta: { primary: 'Get GATE 2027 Decode', secondary: 'See the free weightage map' },
    highlights: [
      '2012–2026 weightage matrix for your branch',
      'Ranked high-yield to safe-to-skip table',
      '45 / 30 / 15 / 7-day revision calendars',
      'Free update for the full 2027 cycle',
    ],
    syllabusCoverage: [
      { area: 'General Aptitude', covered: 'full', note: 'Fixed 15 marks every year. Fully covered — it is the cheapest block on the paper.' },
      { area: 'Engineering & Discrete Mathematics', covered: 'full', note: 'Highest single-subject mean in CS. Full coverage with worked PYQ patterns.' },
      { area: 'Core branch subjects (top 6)', covered: 'full', note: 'Micro-notes, trap analysis, source mapping, repeat index.' },
      { area: 'Mid-weight subjects', covered: 'high-yield', note: 'Only the micro-topics that have appeared. Theory you have never been asked is cut.' },
      { area: 'Tail subjects', covered: 'high-yield', note: 'Formula sheet and PYQ set only. We tell you to stop there.' },
      { area: 'Topics with zero appearances since 2012', covered: 'skip', note: 'Listed by name so you can cross them out, then ignored.' },
    ],
    editions: [
      {
        version: '2027.1',
        date: '2026-10-07',
        status: 'shipped',
        items: [
          'Weightage matrix extended to the 2026 paper for CSE, ME, ECE and CE',
          'Ranked yield table regenerated from the 15-year mean',
          'Revision calendars re-sequenced against the 6 Feb 2027 date',
        ],
      },
      {
        version: '2027.2',
        date: '2026-11-15',
        status: 'planned',
        items: [
          'Micro-topic ontology published for CSE (target: ~420 leaf topics)',
          'Repeat and recycle index for 2012–2026',
          'Trap analysis chapter for the four core subjects',
        ],
      },
      {
        version: '2027.3',
        date: '2027-01-10',
        status: 'planned',
        items: [
          'Cut-off and normalisation trend chapter refreshed with GATE 2026 official figures',
          'Seven-day calendar re-timed to the admit-card session split',
        ],
      },
    ],
    faqIds: ['not-notes', 'typed', 'updates', 'print', 'refund', 'telegram-pdfs', 'guarantee', 'branch', 'devices', 'support'],
    statIds: ['gateRegistered2026', 'gateAppeared2026', 'gateQualified2026', 'gateCsAppeared2026'],
    sourceIds: ['gateSchedule', 'gateStats2026', 'aceWeightage'],
  },
  {
    slug: 'cuet-ug-2027',
    product: 'CUET UG 2027 Decode',
    exam: 'CUET UG 2027',
    authority: 'National Testing Agency',
    officialUrl: 'https://cuet.nta.nic.in/',
    status: 'preorder',
    statusLabel: 'Pre-order',
    pitch: 'Domain-subject weightage, not the General Test. Chapter-level, NCERT-mapped.',
    intro:
      'CUET is marked per subject, which means a weak chapter in one domain paper can cost a seat that an extra hour would have saved. We build the chapter-level distribution for the domain subjects — Physics, Chemistry, Maths, Biology, Accountancy, Economics, Political Science, History — so the last sixty days go to the chapters that are actually asked.',
    audience: 'Class 12 students and the parent paying for the pack',
    examWindow: 'Expected May–June 2027',
    countdown: {
      date: '2027-05-11T09:00:00+05:30',
      label: 'Projected CUET UG 2027 window',
      confirmed: false,
      caveat:
        'NTA has not notified 2027 dates. This clock counts to 11 May, the date the 2026 window opened. We will repoint it the day the bulletin lands.',
    },
    milestones: [
      { label: 'Information bulletin', date: null, note: 'Expected January 2027', confirmed: false },
      { label: 'Registration opens', date: null, note: 'Expected January 2027', confirmed: false },
      { label: 'Registration closes', date: null, note: 'Expected February 2027', confirmed: false },
      { label: 'Exam window', date: null, note: 'Expected May–June 2027', confirmed: false },
      { label: 'Result', date: null, note: 'Expected June–July 2027', confirmed: false },
    ],
    datasetIds: [],
    dataStatus:
      'The CUET domain-subject matrix is being built from the 2022–2026 papers and is not published yet. Pre-order holders get it the day it ships; everyone else sees it when the pack goes live.',
    price: { now: 499, mrp: 999 },
    priceNote: 'Pre-order. Charged only when the pack ships. GST included.',
    cta: { primary: 'Pre-order CUET UG Decode', secondary: 'Tell me when it ships' },
    highlights: [
      'Chapter-level weightage per domain subject',
      'NCERT line-level source mapping',
      '60 / 30 / 15-day calendars timed to the May window',
      'Charged only when the pack ships',
    ],
    syllabusCoverage: [
      { area: 'Domain subjects (up to 5)', covered: 'full', note: 'Chapter-level distribution from the 2022–2026 papers.' },
      { area: 'NCERT Class 12 chapters', covered: 'full', note: 'Mapped line-by-line to the questions that came from them.' },
      { area: 'NCERT Class 11 carry-over', covered: 'high-yield', note: 'Only chapters that have actually been examined in a domain paper.' },
      { area: 'General Aptitude Test', covered: 'skip', note: 'Out of scope. It is a different paper with a different logic and we are not going to half-build it.' },
      { area: 'Language papers', covered: 'skip', note: 'Out of scope for this edition.' },
    ],
    editions: [
      {
        version: '2027.0',
        date: '2026-10-07',
        status: 'in-progress',
        items: [
          'Chapter ontology drafted for Physics, Chemistry and Mathematics',
          '2022–2026 domain papers collected and being tagged',
        ],
      },
      {
        version: '2027.1',
        date: '2027-01-20',
        status: 'planned',
        items: [
          'Full chapter-level matrix for the eight highest-registration domain subjects',
          'Calendars anchored to the notified exam window',
        ],
      },
    ],
    faqIds: ['not-notes', 'preorder-charge', 'cuet-subjects', 'parents', 'updates', 'print', 'refund', 'guarantee', 'devices', 'support'],
    statIds: ['cuetRegistered2026', 'cuetAppeared2026', 'cuetSubjectCombos2026'],
    sourceIds: ['ntaCuet2026', 'cuet2027Window'],
  },
  {
    slug: 'state-psc',
    product: 'State PSC Decode',
    exam: 'UPPSC PCS & BPSC CCE',
    authority: 'UPPSC, Patna / BPSC',
    officialUrl: 'https://uppsc.up.nic.in/',
    status: 'waitlist',
    statusLabel: 'Coming soon',
    pitch: 'State-GS decode for UPPSC PCS and BPSC CCE. Hindi and English, same pack.',
    intro:
      'State GS is where the national-level prep books stop being useful. UP and Bihar papers lean hard on state history, state geography, state schemes and state polity, and the mark distribution of those sections looks nothing like the UPSC distribution people copy. That gap is the whole product.',
    audience: 'Graduates aged 22–32, Hindi-first, repeat attempters',
    examWindow: 'UPPSC PCS 2027 and BPSC 73rd CCE — not yet notified',
    countdown: {
      date: '2026-12-06T09:30:00+05:30',
      label: 'UPPSC PCS 2026 prelims',
      confirmed: true,
      caveat:
        'This is the next confirmed date on the state calendar, not our launch date. UPPSC PCS 2027 and BPSC 73rd CCE have not been notified.',
    },
    milestones: [
      { label: 'UPPSC PCS 2026 prelims', date: '2026-12-06', confirmed: true },
      { label: 'BPSC 72nd CCE prelims', date: '2026-10-25', confirmed: false, note: 'Revised, tentative' },
      { label: 'UPPSC PCS 2027 notification', date: null, note: 'Not notified', confirmed: false },
      { label: 'BPSC 73rd CCE notification', date: null, note: 'Expected mid-2027', confirmed: false },
    ],
    datasetIds: [],
    dataStatus:
      'The State-GS matrix is not published. We are tagging UPPSC PCS and BPSC CCE prelims papers into a state-specific ontology and will not put a chart on this page until it is finished.',
    price: null,
    priceNote: 'Not on sale yet. Join the list and you get the launch price.',
    cta: { primary: 'Join the State PSC list', secondary: 'Read the methodology' },
    highlights: [
      'UP-specific and Bihar-specific GS sections',
      'Hindi and English in the same pack',
      'Prelims-first, Mains sequenced after',
      'Launch price locked for everyone on the list',
    ],
    syllabusCoverage: [
      { area: 'State GS (UP / Bihar)', covered: 'full', note: 'The section national books skip. This is the point of the pack.' },
      { area: 'General Studies Paper I', covered: 'full', note: 'Prelims distribution across history, polity, geography, economy, environment.' },
      { area: 'CSAT / Paper II', covered: 'high-yield', note: 'Qualifying paper. Enough to clear 33%, no more.' },
      { area: 'Optional subjects', covered: 'skip', note: 'Out of scope. Too fragmented to do well.' },
    ],
    editions: [
      {
        version: '0.1',
        date: '2026-10-07',
        status: 'in-progress',
        items: [
          'State-GS micro-topic ontology drafted for UP',
          'UPPSC prelims papers 2016–2026 collected',
        ],
      },
    ],
    faqIds: ['not-notes', 'hindi', 'psc-launch', 'updates', 'print', 'refund', 'guarantee', 'telegram-pdfs', 'devices', 'support'],
    statIds: ['uppscApplicants2026', 'uppscVacancies2026', 'bpscVacancies72'],
    sourceIds: ['uppsc2026', 'bpsc72'],
    hindiNote: {
      hi: 'पूरा पैक हिंदी और अंग्रेज़ी दोनों में आएगा — एक ही फ़ाइल, दोनों भाषाएँ। अनुवाद नहीं, दोनों भाषाओं में अलग से लिखा गया।',
      en: 'The pack ships in Hindi and English in one file. Written in both, not machine-translated from one.',
    },
  },
]

export const examsBySlug: Record<string, Exam> = Object.fromEntries(
  exams.map((e) => [e.slug, e]),
)

export const primaryExam = exams[0]
