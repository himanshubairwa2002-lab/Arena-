'use client'

import * as React from 'react'
import { pad2, remainingUntil } from '@/lib/dates'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

const sizes: Record<Size, { num: string; unit: string; gap: string }> = {
  sm: { num: 'text-[1.125rem]', unit: 'text-[0.5625rem]', gap: 'gap-2.5' },
  md: { num: 'text-[1.625rem] sm:text-[2rem]', unit: 'text-[0.625rem]', gap: 'gap-3 sm:gap-4' },
  lg: { num: 'text-[2rem] sm:text-[2.75rem]', unit: 'text-[0.6875rem]', gap: 'gap-4 sm:gap-6' },
}

/**
 * Computed from the real clock on every tick. There is no hardcoded day count
 * anywhere in this codebase — if the exam passes, the component says so.
 */
export function Countdown({
  target,
  label,
  size = 'md',
  className,
  showSeconds = true,
}: {
  target: string
  label?: string
  size?: Size
  className?: string
  showSeconds?: boolean
}) {
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const r = remainingUntil(target, now ?? Date.now())
  const s = sizes[size]

  const units: { v: string; u: string }[] = [
    { v: String(r.days), u: 'days' },
    { v: pad2(r.hours), u: 'hrs' },
    { v: pad2(r.minutes), u: 'min' },
    ...(showSeconds ? [{ v: pad2(r.seconds), u: 'sec' }] : []),
  ]

  const readable = `${r.days} days, ${r.hours} hours and ${r.minutes} minutes ${r.past ? 'since' : 'until'} ${label ?? 'the exam'}`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <p className="eyebrow">
          {r.past ? 'Since' : 'Until'} {label}
        </p>
      ) : null}
      <div className={cn('flex items-end', s.gap)} role="timer" aria-live="off">
        <span className="sr-only">{readable}</span>
        {units.map((unit, i) => (
          <React.Fragment key={unit.u}>
            {i > 0 ? (
              <span aria-hidden className={cn('num pb-1 text-line-strong', s.num)}>
                :
              </span>
            ) : null}
            <span aria-hidden className="flex flex-col items-start">
              <span
                className={cn(
                  'num font-medium leading-none tracking-[-0.04em] text-fg',
                  s.num,
                  now === null && 'opacity-40',
                )}
              >
                {now === null ? '\u2013\u2013' : unit.v}
              </span>
              <span className={cn('num mt-1.5 uppercase tracking-[0.1em] text-faint', s.unit)}>
                {unit.u}
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/** Inline "17 weeks left" style figure, also computed live. */
export function WeeksLeft({ target, className }: { target: string; className?: string }) {
  const [now, setNow] = React.useState<number | null>(null)
  React.useEffect(() => setNow(Date.now()), [])
  const r = remainingUntil(target, now ?? Date.now())
  const weeks = Math.max(0, Math.floor(r.days / 7))
  return (
    <span className={cn('num', className)} suppressHydrationWarning>
      {now === null ? '\u2013\u2013' : weeks}
    </span>
  )
}
