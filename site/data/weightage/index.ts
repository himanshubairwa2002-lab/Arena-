import { gateCse } from './gate-cse'
import { gateMe } from './gate-me'
import { gateEce } from './gate-ece'
import { gateCe } from './gate-ce'
import type { WeightageDataset } from './types'

export * from './types'

export const datasets: WeightageDataset[] = [gateCse, gateMe, gateEce, gateCe]

export const datasetsById: Record<string, WeightageDataset> = Object.fromEntries(
  datasets.map((d) => [d.id, d]),
)

export function datasetsForExam(examId: string): WeightageDataset[] {
  return datasets.filter((d) => d.examId === examId)
}

export { gateCse, gateMe, gateEce, gateCe }
