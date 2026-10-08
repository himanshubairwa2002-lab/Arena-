import * as React from 'react'
import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
  wide,
}: {
  className?: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        wide ? 'max-w-wide' : 'max-w-content',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Section({
  className,
  children,
  id,
  tight,
  as: Comp = 'section',
  'aria-labelledby': labelledBy,
}: {
  className?: string
  children: React.ReactNode
  id?: string
  tight?: boolean
  as?: 'section' | 'div'
  'aria-labelledby'?: string
}) {
  return (
    <Comp
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tight ? 'py-14 sm:py-18 lg:py-20' : 'py-16 sm:py-22 lg:py-26', className)}
    >
      {children}
    </Comp>
  )
}

export function SectionHead({
  eyebrow,
  heading,
  sub,
  id,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string
  heading: string
  sub?: string
  id?: string
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="max-w-[20ch] text-h1 text-balance">
        {heading}
      </h2>
      {sub ? (
        <p className={cn('max-w-[58ch] text-lead text-muted text-pretty', align === 'center' && 'mx-auto')}>
          {sub}
        </p>
      ) : null}
      {children}
    </div>
  )
}
