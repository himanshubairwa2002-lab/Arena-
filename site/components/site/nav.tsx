'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { primaryNav } from '@/content/site'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { ButtonLink } from '@/components/ui/button'

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-240 ease-out',
        scrolled
          ? 'border-line bg-canvas/80 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-wide items-center gap-2 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="mr-2 shrink-0 rounded-sm" aria-label="Skiplist home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || (item.children?.some((c) => pathname === c.href) ?? false)
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-small transition-colors duration-150',
                      active ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }
            const open = openMenu === item.label
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(open ? null : item.label)}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-small transition-colors duration-150',
                    active || open ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform duration-150', open && 'rotate-180')}
                    aria-hidden
                  />
                </button>
                {open ? (
                  <div className="absolute left-0 top-full w-60 pt-2">
                    <ul className="overflow-hidden rounded-lg border border-line bg-surface p-1 shadow-lift">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-small text-muted transition-colors duration-150 hover:bg-raised hover:text-fg"
                          >
                            {child.label}
                            {child.meta ? (
                              <span className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                                {child.meta}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/free/weightage-map" size="sm" className="hidden sm:inline-flex">
            Get the free heat map
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto max-w-wide space-y-1 px-5 py-4 sm:px-6">
            {primaryNav.flatMap((item) =>
              item.children
                ? [
                    <li key={item.label} className="px-3 pb-1 pt-3">
                      <span className="eyebrow">{item.label}</span>
                    </li>,
                    ...item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="flex items-center justify-between rounded-md px-3 py-2.5 text-[0.9375rem] text-muted hover:bg-raised hover:text-fg"
                        >
                          {c.label}
                          {c.meta ? <span className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">{c.meta}</span> : null}
                        </Link>
                      </li>
                    )),
                  ]
                : [
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2.5 text-[0.9375rem] text-muted hover:bg-raised hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    </li>,
                  ],
            )}
            <li className="pt-2">
              <ButtonLink href="/free/weightage-map" size="md" className="w-full">
                Get the free heat map
              </ButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
