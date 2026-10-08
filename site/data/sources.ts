/**
 * Every externally-sourced number rendered anywhere on this site is declared here.
 * If a figure is not in this file (or derived from `data/weightage/*`), it must not
 * appear in the UI. See DECISIONS.md for the full audit.
 */

export type Source = {
  id: string
  /** Short label shown inline next to a statistic. */
  label: string
  publisher: string
  url: string
  /** When we last verified the figure by hand. */
  retrieved: string
}

export const sources = {
  gateSchedule: {
    id: 'gateSchedule',
    label: 'GATE 2027 schedule, IIT Madras',
    publisher: 'IIT Madras / gate2027.iitm.ac.in',
    url: 'https://gate2027.iitm.ac.in/',
    retrieved: '2026-10-07',
  },
  gateStats2026: {
    id: 'gateStats2026',
    label: 'GATE 2026 Statistical Report, IIT Guwahati',
    publisher: 'IIT Guwahati',
    url: 'https://gate2026.iitg.ac.in/',
    retrieved: '2026-10-07',
  },
  aceWeightage: {
    id: 'aceWeightage',
    label: 'Published GATE paper analysis, 2012–2026',
    publisher: 'ACE Engineering Academy',
    url: 'https://www.aceenggacademy.com/gate-computer-science-engineering-syllabus/',
    retrieved: '2026-10-07',
  },
  ntaCuet2026: {
    id: 'ntaCuet2026',
    label: 'CUET UG 2026 registration statistics',
    publisher: 'National Testing Agency',
    url: 'https://cuet.nta.nic.in/',
    retrieved: '2026-10-07',
  },
  cuet2027Window: {
    id: 'cuet2027Window',
    label: 'CUET UG 2027 expected window',
    publisher: 'Projected from NTA 2023–2026 cycles — not yet notified',
    url: 'https://cuet.nta.nic.in/',
    retrieved: '2026-10-07',
  },
  uppsc2026: {
    id: 'uppsc2026',
    label: 'UPPSC PCS 2026 applications and prelims date',
    publisher: 'Uttar Pradesh Public Service Commission',
    url: 'https://uppsc.up.nic.in/',
    retrieved: '2026-10-07',
  },
  bpsc72: {
    id: 'bpsc72',
    label: 'BPSC 72nd CCE 2026 notification',
    publisher: 'Bihar Public Service Commission',
    url: 'https://bpsc.bihar.gov.in/',
    retrieved: '2026-10-07',
  },
} as const satisfies Record<string, Source>

export type SourceId = keyof typeof sources

/**
 * A number we show to a user, bound to the source that justifies it.
 * `approx` renders a leading "~" and means the real figure is at least this big.
 */
export type SourcedStat = {
  value: number
  display: string
  unit?: string
  label: string
  sourceId: SourceId
  approx?: boolean
  asOf?: string
}

export const stats = {
  gateRegistered2026: {
    value: 1011719,
    display: '10.1',
    unit: 'lakh',
    label: 'registered for GATE 2026',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateAppeared2026: {
    value: 797434,
    display: '7.97',
    unit: 'lakh',
    label: 'actually sat the paper',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateQualified2026: {
    value: 156318,
    display: '1.56',
    unit: 'lakh',
    label: 'qualified (19.6% of those who appeared)',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateCsRegistered2026: {
    value: 259922,
    display: '2,59,922',
    label: 'registered for the CS paper alone',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateCsAppeared2026: {
    value: 211020,
    display: '2,11,020',
    label: 'appeared for CS',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateCsCutoff2026: {
    value: 30,
    display: '30.0',
    unit: '/100',
    label: 'CS general-category qualifying mark',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateMeCutoff2026: {
    value: 25.2,
    display: '25.2',
    unit: '/100',
    label: 'ME general-category qualifying mark',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateEcCutoff2026: {
    value: 26.4,
    display: '26.4',
    unit: '/100',
    label: 'EC general-category qualifying mark',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  gateCeCutoff2026: {
    value: 28.7,
    display: '28.7',
    unit: '/100',
    label: 'CE general-category qualifying mark',
    sourceId: 'gateStats2026',
    asOf: 'GATE 2026',
  },
  cuetRegistered2026: {
    value: 1568866,
    display: '15.68',
    unit: 'lakh',
    label: 'registered for CUET UG 2026',
    sourceId: 'ntaCuet2026',
    asOf: 'CUET UG 2026',
  },
  cuetAppeared2026: {
    value: 1164098,
    display: '11.64',
    unit: 'lakh',
    label: 'appeared for CUET UG 2026',
    sourceId: 'ntaCuet2026',
    asOf: 'CUET UG 2026',
  },
  cuetSubjectCombos2026: {
    value: 12906,
    display: '12,906',
    label: 'distinct subject combinations sat in 2026',
    sourceId: 'ntaCuet2026',
    asOf: 'CUET UG 2026',
  },
  uppscApplicants2026: {
    value: 890000,
    display: '8.9',
    unit: 'lakh',
    label: 'applied for UPPSC PCS 2026',
    sourceId: 'uppsc2026',
    approx: true,
    asOf: 'UPPSC PCS 2026',
  },
  uppscVacancies2026: {
    value: 500,
    display: '500',
    label: 'advertised vacancies',
    sourceId: 'uppsc2026',
    asOf: 'UPPSC PCS 2026',
  },
  bpscVacancies72: {
    value: 1186,
    display: '1,186',
    label: 'vacancies in the BPSC 72nd CCE',
    sourceId: 'bpsc72',
    asOf: 'BPSC 72nd CCE',
  },
} as const satisfies Record<string, SourcedStat>

export type StatId = keyof typeof stats

export function sourceFor(stat: SourcedStat): Source {
  return sources[stat.sourceId]
}
