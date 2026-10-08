'use client'

import * as React from 'react'
import type { WeightageDataset } from '@/data/weightage/types'
import { cellValue, heatStep, maxCellValue, metricLabels, type HeatMetric } from '@/lib/heat'
import { cn } from '@/lib/utils'

export const ROW_H = 30
export const ROW_H_SM = 34
export const MIN_COL_W = 38
export const LABEL_W = 136
export const LABEL_W_SM = 112
export const HEADER_H = 26

export type Cursor = { row: number; col: number } | null

/**
 * The grid itself: a sticky HTML label column beside a hand-rolled SVG of cells.
 * Row geometry is shared by both so they stay aligned at every breakpoint, and
 * the SVG keeps a single pointer handler rather than one per cell.
 */
export function HeatGrid({
  ds,
  metric,
  cursor,
  onCursor,
  animate,
}: {
  ds: WeightageDataset
  metric: HeatMetric
  cursor: Cursor
  onCursor: (c: Cursor) => void
  animate: boolean
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [colW, setColW] = React.useState(MIN_COL_W)
  const [compact, setCompact] = React.useState(false)

  const rows = ds.subjects.length
  const cols = ds.years.length
  const rowH = compact ? ROW_H_SM : ROW_H
  const labelW = compact ? LABEL_W_SM : LABEL_W
  const max = React.useMemo(() => maxCellValue(ds, metric), [ds, metric])

  React.useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const isCompact = window.innerWidth < 640
      setCompact(isCompact)
      const available = el.clientWidth - (isCompact ? LABEL_W_SM : LABEL_W)
      setColW(Math.max(MIN_COL_W, Math.floor(available / cols)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cols])

  const gridW = cols * colW
  const gridH = rows * rowH
  const gap = 2

  const hitTest = React.useCallback(
    (clientX: number, clientY: number, svg: SVGSVGElement) => {
      const box = svg.getBoundingClientRect()
      const x = clientX - box.left
      const y = clientY - box.top - HEADER_H
      if (y < 0) return null
      const col = Math.floor(x / colW)
      const row = Math.floor(y / rowH)
      if (col < 0 || col >= cols || row < 0 || row >= rows) return null
      return { row, col }
    },
    [colW, rowH, cols, rows],
  )

  const describe = React.useCallback(() => {
    const first = ds.years[0]
    const last = ds.years[ds.years.length - 1]
    return `Heat map of ${ds.label} (${ds.paperCode}) GATE papers. ${rows} subjects down, ${cols} years from ${first} to ${last} across. Each cell is shaded by ${metricLabels[metric].label.toLowerCase()}, on the seven-step scale described in the legend. The same data is available as a text table below the chart.`
  }, [ds, rows, cols, metric])

  return (
    <div
      ref={wrapRef}
      className="scrollbar-thin relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      onPointerLeave={() => onCursor(null)}
    >
      <div className="flex" style={{ width: labelW + gridW }}>
        {/* Sticky subject axis */}
        <div
          className="sticky left-0 z-20 shrink-0 bg-canvas"
          style={{ width: labelW, paddingTop: HEADER_H }}
        >
          {ds.subjects.map((s, r) => (
            <div
              key={s.id}
              className={cn(
                'flex items-center pr-3 text-[0.6875rem] leading-tight transition-colors duration-150 sm:text-[0.75rem]',
                cursor?.row === r ? 'text-fg' : 'text-muted',
              )}
              style={{ height: rowH }}
            >
              <span className="truncate" title={s.name}>
                {s.short}
              </span>
            </div>
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-r from-canvas to-transparent sm:hidden"
          />
        </div>

        {/* Cells */}
        <svg
          width={gridW}
          height={gridH + HEADER_H}
          viewBox={`0 0 ${gridW} ${gridH + HEADER_H}`}
          role="img"
          aria-label={describe()}
          className="block shrink-0 touch-pan-x"
          onPointerMove={(e) => onCursor(hitTest(e.clientX, e.clientY, e.currentTarget))}
          onPointerDown={(e) => onCursor(hitTest(e.clientX, e.clientY, e.currentTarget))}
        >
          <title>{`${ds.label} weightage, ${ds.years[0]}\u2013${ds.years[ds.years.length - 1]}`}</title>
          <desc>{describe()}</desc>

          {/* Year axis */}
          {ds.years.map((y, c) => (
            <text
              key={y}
              x={c * colW + colW / 2}
              y={16}
              textAnchor="middle"
              className={cn(
                'num select-none text-[9px] transition-colors duration-150',
                cursor?.col === c ? 'fill-fg' : 'fill-faint',
              )}
              style={{ fontSize: 9.5, fontFamily: 'var(--font-mono), monospace' }}
            >
              {compact ? `'${String(y).slice(2)}` : y}
            </text>
          ))}

          {ds.subjects.map((s, r) =>
            ds.years.map((y, c) => {
              const v = cellValue(ds, s, c, metric)
              const step = heatStep(v, max)
              const active = cursor?.row === r && cursor?.col === c
              const dim = cursor !== null && cursor.row !== r && cursor.col !== c
              return (
                <rect
                  key={`${s.id}-${y}`}
                  x={c * colW + gap / 2}
                  y={HEADER_H + r * rowH + gap / 2}
                  width={colW - gap}
                  height={rowH - gap}
                  rx={2.5}
                  fill={v === null ? 'rgb(var(--c-line))' : `rgb(var(--c-heat-${step}))`}
                  opacity={v === null ? 0.5 : dim ? 0.42 : 1}
                  // A hairline keeps the palest steps of the light-theme ramp
                  // visible against a white panel; the cursor cell overrides it.
                  stroke={active ? 'rgb(var(--c-fg))' : 'rgb(var(--c-line))'}
                  strokeWidth={active ? 1.5 : 0.5}
                  style={
                    animate
                      ? {
                          transformBox: 'fill-box',
                          transformOrigin: 'center',
                          animation: 'heat-in 360ms cubic-bezier(0.16,1,0.3,1) backwards',
                          animationDelay: `${c * 14 + r * 10}ms`,
                        }
                      : { transition: 'opacity 150ms ease-out' }
                  }
                />
              )
            }),
          )}

          {/* Value labels appear once cells are wide enough to hold them. */}
          {colW >= 44
            ? ds.subjects.map((s, r) =>
                ds.years.map((y, c) => {
                  const v = cellValue(ds, s, c, metric)
                  if (v === null) return null
                  const step = heatStep(v, max)
                  return (
                    <text
                      key={`t-${s.id}-${y}`}
                      x={c * colW + colW / 2}
                      y={HEADER_H + r * rowH + rowH / 2 + 3.2}
                      textAnchor="middle"
                      pointerEvents="none"
                      fill={`rgb(var(--c-heat-${step}-fg))`}
                      opacity={cursor !== null && cursor.row !== r && cursor.col !== c ? 0.45 : 0.92}
                      style={{ fontSize: 9.5, fontFamily: 'var(--font-mono), monospace' }}
                    >
                      {metric === 'marks' ? v : v.toFixed(0)}
                    </text>
                  )
                }),
              )
            : null}
        </svg>
      </div>

      <style>{`@keyframes heat-in{from{opacity:0;transform:scale(0.84)}to{transform:scale(1)}}`}</style>
    </div>
  )
}
