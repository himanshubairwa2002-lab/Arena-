import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** ₹1,299 — Indian digit grouping, no decimals. */
export function inr(value: number): string {
  return `\u20B9${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

/** 15,68,866 — lakh/crore grouping without the currency symbol. */
export function indianNumber(value: number): string {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export function pct(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
