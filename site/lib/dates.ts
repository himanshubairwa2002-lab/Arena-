/**
 * All countdowns and "days left" figures are computed from the real clock.
 * Nothing in this file may return a hardcoded number of days — the only urgency
 * on this site comes from the actual exam date.
 */

export const IST_OFFSET_MINUTES = 330

export type Remaining = {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  past: boolean
}

export function remainingUntil(iso: string, now: number = Date.now()): Remaining {
  const target = new Date(iso).getTime()
  const diff = target - now
  const past = diff <= 0
  const abs = Math.abs(diff)
  return {
    total: diff,
    days: Math.floor(abs / 86_400_000),
    hours: Math.floor((abs % 86_400_000) / 3_600_000),
    minutes: Math.floor((abs % 3_600_000) / 60_000),
    seconds: Math.floor((abs % 60_000) / 1000),
    past,
  }
}

export function daysUntil(iso: string, now: number = Date.now()): number {
  return remainingUntil(iso, now).days
}

export function weeksUntil(iso: string, now: number = Date.now()): number {
  return Math.max(0, Math.floor(daysUntil(iso, now) / 7))
}

const DATE_FMT = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

const LONG_FMT = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

/** "6 Feb 2027" */
export function formatDate(iso: string): string {
  return DATE_FMT.format(new Date(iso))
}

/** "Saturday, 6 February 2027" */
export function formatLongDate(iso: string): string {
  return LONG_FMT.format(new Date(iso))
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

/** ISO date for today in IST, used for changelog "as of" labels. */
export function todayIso(now: number = Date.now()): string {
  const d = new Date(now + IST_OFFSET_MINUTES * 60_000)
  return d.toISOString().slice(0, 10)
}
