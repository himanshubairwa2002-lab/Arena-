'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'section' | 'li' | 'article' | 'ol' | 'ul'

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  /** Seconds, to match the rest of the motion system. */
  delay?: number
  /** Vertical offset in px. Keep small — content must never wait on motion. */
  y?: number
  as?: Tag
  /**
   * 'scroll' (default) animates when the element comes into view.
   * 'load' animates once on mount — use it only above the fold, where an
   * IntersectionObserver would fire immediately anyway.
   */
  mode?: 'scroll' | 'load'
}

/**
 * Scroll reveal, deliberately NOT implemented with a motion library.
 *
 * The previous Framer Motion version server-rendered `opacity: 0` inline, which
 * meant three bad things: the markup was invisible without JavaScript, the
 * largest contentful paint waited on hydration, and `useReducedMotion()`
 * returning null on the server produced a hydration mismatch on every section.
 *
 * This version renders plain, visible markup. After mount, JavaScript hides
 * only the elements that are still below the fold and then reveals them on
 * intersection. Anything already on screen is left alone, so the first paint is
 * never animated and never delayed. All of the actual motion lives in CSS, so
 * `prefers-reduced-motion` is honoured even if this component never runs.
 */
export function Reveal({
  delay = 0,
  y = 12,
  as = 'div',
  mode = 'scroll',
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const Comp = as as React.ElementType
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (mode === 'load') return
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    // Already visible at mount: leave it exactly as the server rendered it.
    if (el.getBoundingClientRect().top < window.innerHeight - 40) return

    el.dataset.reveal = 'hidden'
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.dataset.reveal = 'shown'
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mode])

  return (
    <Comp
      ref={ref}
      className={cn(mode === 'load' && 'reveal-load', className)}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-delay': `${Math.round(delay * 1000)}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Comp>
  )
}
