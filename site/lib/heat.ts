import type { SubjectAggregate, SubjectRow, WeightageDataset } from '@/data/weightage/types'

export const HEAT_STEPS = 7

/** Metric shown in the heat map. */
export type HeatMetric = 'marks' | 'share'

export const metricLabels: Record<HeatMetric, { label: string; suffix: string; help: string }> = {
  marks: {
    label: 'Marks',
    suffix: '',
    help: 'Marks that subject carried in that year\u2019s paper.',
  },
  share: {
    label: '% of paper',
    suffix: '%',
    help: 'That subject\u2019s marks as a share of all marks accounted for in that year.',
  },
}

/** Sum of every listed subject for one year index. */
export function columnTotal(ds: WeightageDataset, yearIndex: number): number {
  return ds.subjects.reduce((sum, s) => sum + (s.marks[yearIndex] ?? 0), 0)
}

export function cellValue(
  ds: WeightageDataset,
  subject: SubjectRow,
  yearIndex: number,
  metric: HeatMetric,
): number | null {
  const raw = subject.marks[yearIndex]
  if (raw === null || raw === undefined) return null
  if (metric === 'marks') return raw
  const total = columnTotal(ds, yearIndex)
  return total === 0 ? 0 : (raw / total) * 100
}

/** Largest cell value in the dataset for a metric — used to normalise the ramp. */
export function maxCellValue(ds: WeightageDataset, metric: HeatMetric): number {
  let max = 0
  ds.subjects.forEach((s) => {
    ds.years.forEach((_, i) => {
      const v = cellValue(ds, s, i, metric)
      if (v !== null && v > max) max = v
    })
  })
  return max
}

/** Map a value to one of HEAT_STEPS buckets. Uses a mild gamma so mid values separate. */
export function heatStep(value: number | null, max: number): number {
  if (value === null || max <= 0) return 0
  const t = Math.min(1, Math.max(0, value / max))
  const eased = Math.pow(t, 0.72)
  return Math.min(HEAT_STEPS - 1, Math.floor(eased * HEAT_STEPS))
}

export function heatBg(step: number): string {
  return `rgb(var(--c-heat-${step}))`
}

export function heatFg(step: number): string {
  return `rgb(var(--c-heat-${step}-fg))`
}

/** Least-squares slope in marks per year, ignoring null years. */
function slope(years: number[], marks: (number | null)[]): number {
  const pts = years
    .map((y, i) => ({ x: y, y: marks[i] }))
    .filter((p): p is { x: number; y: number } => p.y !== null && p.y !== undefined)
  const n = pts.length
  if (n < 3) return 0
  const mx = pts.reduce((a, p) => a + p.x, 0) / n
  const my = pts.reduce((a, p) => a + p.y, 0) / n
  const num = pts.reduce((a, p) => a + (p.x - mx) * (p.y - my), 0)
  const den = pts.reduce((a, p) => a + (p.x - mx) ** 2, 0)
  return den === 0 ? 0 : num / den
}

/** Per-subject aggregates across the whole dataset, sorted high yield first. */
export function aggregate(ds: WeightageDataset): SubjectAggregate[] {
  const meanPaperTotal =
    ds.years.reduce((sum, _, i) => sum + columnTotal(ds, i), 0) / ds.years.length

  const rows = ds.subjects.map((s) => {
    const listed = s.marks.filter((m): m is number => m !== null && m !== undefined)
    const total = listed.reduce((a, b) => a + b, 0)
    const yearsCounted = listed.length
    const mean = yearsCounted ? total / yearsCounted : 0
    return {
      id: s.id,
      name: s.name,
      short: s.short,
      total,
      yearsCounted,
      mean,
      share: meanPaperTotal ? (mean / meanPaperTotal) * 100 : 0,
      min: yearsCounted ? Math.min(...listed) : 0,
      max: yearsCounted ? Math.max(...listed) : 0,
      trend: slope(ds.years, s.marks),
      derived: s.derived,
    }
  })

  return rows.sort((a, b) => b.mean - a.mean)
}

export type HeatCallouts = {
  /** Smallest set of subjects whose combined mean share crosses 60%. */
  topCount: number
  topShare: number
  topNames: string[]
  /** Subjects in the bottom tail that together account for under ~10%. */
  tailCount: number
  tailShare: number
  tailNames: string[]
  /** Most-improved and most-declined subject by least-squares slope. */
  rising?: SubjectAggregate
  falling?: SubjectAggregate
  /** Mean marks accounted for per paper. */
  meanAccounted: number
}

export function callouts(ds: WeightageDataset): HeatCallouts {
  const agg = aggregate(ds)
  const meanAccounted =
    ds.years.reduce((sum, _, i) => sum + columnTotal(ds, i), 0) / ds.years.length

  let running = 0
  let topCount = 0
  for (const row of agg) {
    running += row.share
    topCount += 1
    if (running >= 60) break
  }
  const top = agg.slice(0, topCount)

  const tail: SubjectAggregate[] = []
  let tailShare = 0
  for (let i = agg.length - 1; i >= 0; i--) {
    const row = agg[i]
    if (tailShare + row.share > 10.5) break
    tail.unshift(row)
    tailShare += row.share
  }

  const byTrend = [...agg].sort((a, b) => b.trend - a.trend)

  return {
    topCount,
    topShare: top.reduce((a, b) => a + b.share, 0),
    topNames: top.map((t) => t.short),
    tailCount: tail.length,
    tailShare,
    tailNames: tail.map((t) => t.short),
    rising: byTrend[0],
    falling: byTrend[byTrend.length - 1],
    meanAccounted,
  }
}

/** "high yield -> safe to skip" tiers for the ranked table on /free/weightage-map. */
export type YieldTier = 'core' | 'strong' | 'moderate' | 'thin' | 'skippable'

export const tierCopy: Record<YieldTier, { label: string; advice: string }> = {
  core: { label: 'Core', advice: 'Non-negotiable. Three passes minimum.' },
  strong: { label: 'High yield', advice: 'Full coverage, then PYQs twice.' },
  moderate: { label: 'Moderate', advice: 'Standard topics only. Skip the exotic ones.' },
  thin: { label: 'Thin', advice: 'Formula sheet and PYQs. Do not read the textbook.' },
  skippable: { label: 'Safe to skip', advice: 'Drop it if you are short on weeks.' },
}

export function tierFor(share: number): YieldTier {
  if (share >= 12) return 'core'
  if (share >= 8) return 'strong'
  if (share >= 5) return 'moderate'
  if (share >= 2.5) return 'thin'
  return 'skippable'
}
