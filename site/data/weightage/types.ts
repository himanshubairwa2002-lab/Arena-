import type { SourceId } from '@/data/sources'

export type SubjectRow = {
  id: string
  /** Full subject name as it appears in the syllabus. */
  name: string
  /** Axis label for narrow screens. Keep under 14 characters. */
  short: string
  /**
   * Marks per year, index-aligned with `WeightageDataset.years`.
   * `null` means the published analysis did not list the subject that year
   * (usually because it had not yet been split out as its own row).
   */
  marks: (number | null)[]
  /** True when the row is computed by us rather than taken from the source. */
  derived?: boolean
  derivationNote?: string
}

export type WeightageDataset = {
  id: string
  examId: string
  /** e.g. "Computer Science & IT" */
  label: string
  /** e.g. "CSE" — used in the branch switcher */
  short: string
  /** Official GATE paper code, e.g. "CS" */
  paperCode: string
  years: number[]
  /** Marks on the full paper. GATE is always 100. */
  paperTotal: number
  sourceId: SourceId
  /** Shown verbatim under the chart. Be honest here. */
  methodologyNote: string
  subjects: SubjectRow[]
}

export type SubjectAggregate = {
  id: string
  name: string
  short: string
  /** Total marks across every year where the subject was listed. */
  total: number
  /** Number of years the subject was listed. */
  yearsCounted: number
  /** Mean marks per paper. */
  mean: number
  /** Share of the paper, as a percentage of the mean accounted total. */
  share: number
  min: number
  max: number
  /** Simple least-squares slope in marks/year across listed years. */
  trend: number
  derived?: boolean
}
