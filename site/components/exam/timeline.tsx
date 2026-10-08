import { Check, Circle, Dot } from 'lucide-react'
import type { Milestone } from '@/data/exams'
import { formatDate } from '@/lib/dates'

/**
 * Milestones are marked done against the real clock, not a hardcoded index.
 * Unconfirmed dates render their note instead of a fake date.
 */
export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const now = Date.now()

  return (
    <ol className="relative space-y-0">
      {milestones.map((m, i) => {
        const past = m.date ? new Date(m.date).getTime() < now : false
        const isLast = i === milestones.length - 1
        return (
          <li key={m.label} className="relative flex gap-4 pb-5 last:pb-0">
            {!isLast ? (
              <span
                aria-hidden
                className="absolute left-[7px] top-5 h-full w-px bg-line"
              />
            ) : null}
            <span className="relative mt-1 shrink-0">
              {past ? (
                <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-heat-6">
                  <Check className="h-2.5 w-2.5 text-canvas" strokeWidth={3} aria-hidden />
                </span>
              ) : m.confirmed ? (
                <Circle
                  className="h-[15px] w-[15px] text-line-strong"
                  strokeWidth={2}
                  fill="rgb(var(--c-canvas))"
                  aria-hidden
                />
              ) : (
                <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-dashed border-line-strong bg-canvas">
                  <Dot className="h-3 w-3 text-faint" aria-hidden />
                </span>
              )}
            </span>
            <div className="min-w-0 flex-1 pb-0">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <p className={`text-small ${past ? 'text-muted' : 'text-fg'}`}>{m.label}</p>
                <p className="num text-[0.75rem] text-faint">
                  {m.date ? formatDate(m.date) : m.note}
                  {m.date && m.note ? ` ${m.note}` : ''}
                </p>
              </div>
              {!m.confirmed ? (
                <p className="num mt-0.5 text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                  Not confirmed by the authority
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
