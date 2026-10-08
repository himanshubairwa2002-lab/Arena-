import { gateCse } from '@/data/weightage'
import { aggregate, heatStep, maxCellValue } from '@/lib/heat'

/**
 * The above-the-fold product visual: a compact, static render of the real GATE
 * CSE matrix, ranked by fifteen-year mean with the skip line drawn in. Server
 * rendered, no client JavaScript, no interactivity — the interactive version is
 * further down the page. A data company whose first screen has no data on it is
 * making an argument it has not shown.
 *
 * Everything (labels included) lives inside one SVG so a single uniform scale
 * applies: an HTML label column next to a scaled SVG drifts out of alignment as
 * soon as the container is narrower than the viewBox.
 */

const YEARS = 12
const TOP_N = 6

const W = 480
const LABEL_W = 116
const MEAN_W = 58
const ROW_H = 21
const HEADER_H = 18
const GAP = 2.5

const agg = aggregate(gateCse)
const order = new Map(agg.map((a, i) => [a.id, i]))
const rows = [...gateCse.subjects].sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99))

const years = gateCse.years.slice(-YEARS)
const offset = gateCse.years.length - YEARS
const max = maxCellValue(gateCse, 'marks')
const maxMean = agg[0].mean

const GRID_W = W - LABEL_W - MEAN_W
const COL_W = GRID_W / YEARS
const H = HEADER_H + rows.length * ROW_H + 2

/** Computed, not asserted: the split either side of the line actually drawn. */
const topShare = agg.slice(0, TOP_N).reduce((t, a) => t + a.share, 0)
const restShare = agg.slice(TOP_N).reduce((t, a) => t + a.share, 0)
const restCount = agg.length - TOP_N
const SKIP_Y = HEADER_H + TOP_N * ROW_H - GAP / 4

export function HeroChart() {
  return (
    <figure className="relative m-0 overflow-hidden rounded-xl border border-line bg-surface/80 p-4 backdrop-blur-sm sm:p-5">
      <div aria-hidden className="bg-graph-fine absolute inset-0 opacity-70" />

      <figcaption className="relative flex items-baseline justify-between gap-3">
        <span className="num text-[0.625rem] uppercase tracking-[0.1em] text-faint">
          GATE CSE &middot; marks per subject
        </span>
        <span className="num text-[0.625rem] text-faint">
          {years[0]}&ndash;{years[years.length - 1]}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative mt-3 block h-auto w-full"
        role="img"
        aria-label={`Heat map of GATE Computer Science papers from ${years[0]} to ${years[years.length - 1]}, twelve subjects ranked by their fifteen-year mean marks. The top ${TOP_N} subjects account for ${topShare.toFixed(0)} per cent of the paper. The remaining ${restCount} account for ${restShare.toFixed(0)} per cent between them. The full interactive version, with every branch and a text table, is further down this page.`}
      >
        {/* year axis, every third year so the labels never collide */}
        {years.map((y, c) =>
          c % 3 === 0 ? (
            <text
              key={`y-${y}`}
              x={LABEL_W + c * COL_W + COL_W / 2}
              y={11}
              textAnchor="middle"
              className="num"
              fontSize="9"
              fill="rgb(var(--c-faint))"
            >
              {String(y).slice(2)}
            </text>
          ) : null,
        )}
        <text
          x={W}
          y={11}
          textAnchor="end"
          className="num"
          fontSize="8"
          letterSpacing="0.06em"
          fill="rgb(var(--c-faint))"
        >
          MEAN
        </text>

        {rows.map((s, r) => {
          const a = agg.find((x) => x.id === s.id)
          const cy = HEADER_H + r * ROW_H
          const barW = a ? Math.max(3, (a.mean / maxMean) * (MEAN_W - 26)) : 0
          return (
            <g key={s.id}>
              <text
                x={LABEL_W - 8}
                y={cy + ROW_H / 2 + 3}
                textAnchor="end"
                fontSize="11.5"
                fill={r < TOP_N ? 'rgb(var(--c-fg))' : 'rgb(var(--c-faint))'}
              >
                {s.short}
              </text>

              {years.map((y, c) => {
                const v = s.marks[offset + c]
                return (
                  <rect
                    key={`${s.id}-${y}`}
                    x={LABEL_W + c * COL_W + GAP / 2}
                    y={cy + GAP / 2}
                    width={COL_W - GAP}
                    height={ROW_H - GAP}
                    rx={2}
                    fill={v === null ? 'rgb(var(--c-line))' : `rgb(var(--c-heat-${heatStep(v, max)}))`}
                    stroke="rgb(var(--c-line))"
                    strokeWidth={0.5}
                  />
                )
              })}

              {a ? (
                <>
                  <rect
                    x={W - MEAN_W + 4}
                    y={cy + GAP / 2 + 3.5}
                    width={barW}
                    height={ROW_H - GAP - 7}
                    rx={1.5}
                    fill={`rgb(var(--c-heat-${heatStep(a.mean, maxMean)}))`}
                  />
                  <text
                    x={W}
                    y={cy + ROW_H / 2 + 3}
                    textAnchor="end"
                    className="num"
                    fontSize="10"
                    fill={r < TOP_N ? 'rgb(var(--c-muted))' : 'rgb(var(--c-faint))'}
                  >
                    {a.mean.toFixed(0)}
                  </text>
                </>
              ) : null}
            </g>
          )
        })}

        {/* the skip line — drawn, then described in the caption below */}
        <line
          x1={0}
          x2={W}
          y1={SKIP_Y}
          y2={SKIP_Y}
          stroke="rgb(var(--c-accent))"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </svg>

      <div className="relative mt-3 flex items-start gap-2.5 border-t border-line pt-3">
        <span aria-hidden className="mt-[5px] h-px w-3 shrink-0 border-t border-dashed border-accent" />
        <p className="text-[0.75rem] leading-snug text-muted">
          Above the line: {TOP_N} subjects, <span className="num text-fg">{topShare.toFixed(1)}%</span>{' '}
          of the paper. Below it: {restCount} subjects worth{' '}
          <span className="num text-fg">{restShare.toFixed(1)}%</span> between them.
        </p>
      </div>
    </figure>
  )
}
