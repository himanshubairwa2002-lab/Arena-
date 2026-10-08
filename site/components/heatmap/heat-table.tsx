import type { WeightageDataset } from '@/data/weightage/types'
import { cellValue, columnTotal, metricLabels, type HeatMetric } from '@/lib/heat'

/**
 * The text-table fallback for the heat map. Always rendered (inside a <details>
 * on the chart, and standalone on /free/weightage-map) so the data is reachable
 * by keyboard and screen reader without touching the chart.
 */
export function HeatTable({ ds, metric }: { ds: WeightageDataset; metric: HeatMetric }) {
  const suffix = metricLabels[metric].suffix
  const fmt = (v: number | null) => (v === null ? '\u2014' : metric === 'marks' ? String(v) : v.toFixed(1))

  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          {ds.label} ({ds.paperCode}) {metricLabels[metric].label.toLowerCase()} by subject and year,{' '}
          {ds.years[0]} to {ds.years[ds.years.length - 1]}.
        </caption>
        <thead>
          <tr className="border-b border-line-strong">
            <th scope="col" className="sticky left-0 z-10 bg-canvas py-2 pr-4 text-small font-medium text-muted">
              Subject
            </th>
            {ds.years.map((y) => (
              <th key={y} scope="col" className="num px-1.5 py-2 text-right text-[0.6875rem] font-normal text-faint">
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ds.subjects.map((s) => (
            <tr key={s.id} className="border-b border-line last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-canvas py-2 pr-4 text-small font-normal text-fg"
              >
                {s.name}
                {s.derived ? <span className="ml-1.5 text-[0.625rem] text-faint">derived</span> : null}
              </th>
              {ds.years.map((y, i) => (
                <td key={y} className="num px-1.5 py-2 text-right text-small tabular-nums text-muted">
                  {fmt(cellValue(ds, s, i, metric))}
                  {metric === 'share' && cellValue(ds, s, i, metric) !== null ? suffix : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line-strong">
            <th scope="row" className="sticky left-0 z-10 bg-canvas py-2 pr-4 text-small font-medium text-muted">
              Marks accounted
            </th>
            {ds.years.map((y, i) => (
              <td key={y} className="num px-1.5 py-2 text-right text-small text-faint">
                {columnTotal(ds, i)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
