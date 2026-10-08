'use client'

import * as React from 'react'
import { Download, Info } from 'lucide-react'
import type { WeightageDataset } from '@/data/weightage/types'
import { cellValue, heatStep, maxCellValue, metricLabels, type HeatMetric } from '@/lib/heat'
import { sources } from '@/data/sources'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { HeatGrid, type Cursor } from './heat-grid'
import { HeatLegend } from './heat-legend'
import { HeatTable } from './heat-table'
import { downloadChartPng } from './download-chart'

export function WeightageHeatmap({
  datasets,
  initialId,
  datasetId,
  onDatasetChange,
  showDownload = true,
  compactControls = false,
}: {
  datasets: WeightageDataset[]
  initialId?: string
  /** Controlled mode: pass both to let a parent own the branch selection. */
  datasetId?: string
  onDatasetChange?: (id: string) => void
  showDownload?: boolean
  compactControls?: boolean
}) {
  const [internalId, setInternalId] = React.useState(initialId ?? datasets[0].id)
  const dsId = datasetId ?? internalId
  const setDsId = React.useCallback(
    (id: string) => {
      setInternalId(id)
      onDatasetChange?.(id)
    },
    [onDatasetChange],
  )
  const [metric, setMetric] = React.useState<HeatMetric>('marks')
  const [cursor, setCursor] = React.useState<Cursor>(null)
  const [animate, setAnimate] = React.useState(true)

  const ds = React.useMemo(
    () => datasets.find((d) => d.id === dsId) ?? datasets[0],
    [datasets, dsId],
  )
  const max = React.useMemo(() => maxCellValue(ds, metric), [ds, metric])

  // Let the stagger play once, then hand opacity back to the hover logic.
  React.useEffect(() => {
    setAnimate(true)
    const t = window.setTimeout(() => setAnimate(false), 900)
    return () => window.clearTimeout(t)
  }, [dsId])

  const hovered = React.useMemo(() => {
    if (!cursor) return null
    const subject = ds.subjects[cursor.row]
    const year = ds.years[cursor.col]
    if (!subject || year === undefined) return null
    const v = cellValue(ds, subject, cursor.col, metric)
    return { subject, year, value: v }
  }, [cursor, ds, metric])

  return (
    <div className="flex flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {datasets.length > 1 ? (
          <div
            role="group"
            aria-label="Branch"
            className="flex rounded-md border border-line bg-surface p-0.5"
          >
            {datasets.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={d.id === ds.id}
                onClick={() => {
                  setDsId(d.id)
                  setCursor(null)
                }}
                className={cn(
                  'num rounded-[5px] px-2.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.06em] transition-colors duration-150',
                  d.id === ds.id
                    ? 'bg-raised text-fg shadow-ring'
                    : 'text-faint hover:text-muted',
                )}
              >
                {d.short}
              </button>
            ))}
          </div>
        ) : null}

        <div
          role="group"
          aria-label="Metric"
          className="flex rounded-md border border-line bg-surface p-0.5"
        >
          {(['marks', 'share'] as HeatMetric[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={m === metric}
              onClick={() => setMetric(m)}
              className={cn(
                'rounded-[5px] px-2.5 py-1.5 text-[0.75rem] transition-colors duration-150',
                m === metric ? 'bg-raised text-fg shadow-ring' : 'text-faint hover:text-muted',
              )}
            >
              {metricLabels[m].label}
            </button>
          ))}
        </div>

        {showDownload ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => downloadChartPng(ds, metric)}
            className="ml-auto"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Download this chart</span>
            <span className="sm:hidden">PNG</span>
          </Button>
        ) : null}
      </div>

      {/* Chart */}
      <div className="relative">
        <HeatGrid ds={ds} metric={metric} cursor={cursor} onCursor={setCursor} animate={animate} />

        {/* Readout. Fixed height so hovering never shifts the layout. */}
        <div
          aria-live="polite"
          className="mt-3 flex min-h-[2.75rem] items-center gap-3 rounded-md border border-line bg-surface px-3 py-2"
        >
          {hovered ? (
            <>
              <span
                className="h-6 w-1 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    hovered.value === null
                      ? 'rgb(var(--c-line-strong))'
                      : `rgb(var(--c-heat-${heatStep(hovered.value, max)}))`,
                }}
              />
              <span className="min-w-0 truncate text-[0.8125rem] text-fg">{hovered.subject.name}</span>
              <span className="num ml-auto shrink-0 text-[0.8125rem] text-muted">
                {hovered.year}
              </span>
              <span className="num shrink-0 text-[0.9375rem] font-medium text-fg">
                {hovered.value === null
                  ? 'not listed'
                  : metric === 'marks'
                    ? `${hovered.value} marks`
                    : `${hovered.value.toFixed(1)}%`}
              </span>
            </>
          ) : (
            <span className="text-[0.8125rem] text-faint">
              <span className="hidden sm:inline">Hover a cell for the exact figure.</span>
              <span className="sm:hidden">Tap a cell for the exact figure.</span>{' '}
              {metricLabels[metric].help}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <HeatLegend metric={metric} max={max} />
        <p className="num text-[0.6875rem] text-faint">
          {ds.subjects.length} subjects &middot; {ds.years.length} papers &middot; {ds.paperCode}
        </p>
      </div>

      {!compactControls ? (
        <details className="group rounded-lg border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-small text-muted transition-colors hover:text-fg">
            <Info className="h-3.5 w-3.5" aria-hidden />
            View the same data as a table, and the method behind it
          </summary>
          <div className="border-t border-line px-4 py-4">
            <HeatTable ds={ds} metric={metric} />
            <p className="mt-4 max-w-prose text-[0.75rem] leading-relaxed text-faint">
              {ds.methodologyNote}{' '}
              <a
                href={sources[ds.sourceId].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {sources[ds.sourceId].publisher}
              </a>
              , retrieved {sources[ds.sourceId].retrieved}.
            </p>
          </div>
        </details>
      ) : null}
    </div>
  )
}
