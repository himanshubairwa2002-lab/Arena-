'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

export const THEME_KEY = 'skiplist-theme'

/**
 * Inlined in <head> so the theme is applied before first paint — no flash, no
 * layout shift. Kept as a string constant so it stays in one place.
 *
 * Dark is the designed default and it wins unless the visitor has explicitly
 * chosen light with the toggle. We deliberately do NOT follow
 * `prefers-color-scheme` on first visit: the heat map is built around a dark
 * canvas, and most desktops report light simply because nobody changed the
 * default. Once someone chooses, the choice is remembered forever.
 */
export const themeScript = `(function(){try{var k='${THEME_KEY}';var s=localStorage.getItem(k);document.documentElement.setAttribute('data-theme',s==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ?? 'dark'
    setTheme(current)
    setMounted(true)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* private mode — theme just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Switch theme'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
    >
      {mounted && theme === 'light' ? (
        <Sun className="h-[15px] w-[15px]" aria-hidden />
      ) : (
        <Moon className="h-[15px] w-[15px]" aria-hidden />
      )}
    </button>
  )
}
