import * as React from 'react'
import { cn } from '@/lib/utils'

type Tone = 'live' | 'preorder' | 'waitlist' | 'neutral' | 'accent'

const tones: Record<Tone, string> = {
  live: 'border-heat-6/40 bg-heat-6/10 text-heat-6',
  preorder: 'border-heat-4/40 bg-heat-4/10 text-heat-4',
  waitlist: 'border-line-strong bg-raised text-muted',
  neutral: 'border-line bg-raised text-muted',
  accent: 'border-accent/40 bg-accent/10 text-accent',
}

export function Badge({
  tone = 'neutral',
  className,
  children,
  dot,
}: {
  tone?: Tone
  className?: string
  children: React.ReactNode
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'num inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.08em]',
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {children}
    </span>
  )
}
