import { cn } from '@/lib/utils'

/**
 * Glyph: four heat-map cells stacked as a descending bar, the shape of a ranked
 * weightage column. The two hot cells are solid, the two cool cells are hairline
 * outlines — the brand argument in 20x20 pixels: keep the top, drop the bottom.
 */
export function LogoGlyph({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('h-5 w-5', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <rect x="0.5" y="0.5" width="19" height="4" rx="1" fill="rgb(var(--c-heat-6))" />
      <rect x="0.5" y="5.5" width="13.5" height="4" rx="1" fill="rgb(var(--c-heat-5))" />
      <rect
        x="1"
        y="11"
        width="8"
        height="3"
        rx="0.75"
        stroke="rgb(var(--c-heat-3))"
        strokeWidth="1"
      />
      <rect
        x="1"
        y="16"
        width="4.5"
        height="3"
        rx="0.75"
        stroke="rgb(var(--c-heat-2))"
        strokeWidth="1"
      />
    </svg>
  )
}

/** Wordmark: geometric grotesk, tight tracking, the "i" dot replaced by a hot cell. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoGlyph className="h-[18px] w-[18px] shrink-0" />
      {compact ? null : (
        <span className="relative text-[0.9375rem] font-semibold tracking-[-0.035em] text-fg">
          skiplist
          <span
            aria-hidden
            className="absolute -top-px left-[1.72em] h-[3px] w-[3px] rounded-[1px] bg-heat-6"
          />
        </span>
      )}
      <span className="sr-only">Skiplist</span>
    </span>
  )
}
