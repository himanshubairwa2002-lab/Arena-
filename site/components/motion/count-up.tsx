'use client'

import * as React from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Ticks a number up once when it scrolls into view.
 *
 * The server and the first client render both emit the *final* value, so the
 * number is correct with JavaScript disabled, correct under reduced motion, and
 * correct in the accessibility tree. Only after mount does it drop to zero and
 * animate back up. A stat that reads "0" because a script failed is worse than
 * no animation at all.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 900,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  // null means "show the real value" — the SSR and pre-hydration state.
  const [display, setDisplay] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (reduce) return
    setDisplay(0)
  }, [reduce])

  React.useEffect(() => {
    if (reduce || !inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setDisplay(value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(null)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduce])

  const fmt = (n: number) =>
    n.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  const shown = display === null ? value : display

  return (
    <span ref={ref} className={className}>
      <span aria-hidden suppressHydrationWarning>
        {prefix}
        {fmt(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </span>
  )
}
