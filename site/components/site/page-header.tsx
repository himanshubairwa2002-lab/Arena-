import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from './container'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[0.75rem] text-faint">
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight className="h-3 w-3 text-line-strong" aria-hidden /> : null}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-muted">
                {t.name}
              </span>
            ) : (
              <Link href={t.path} className="transition-colors hover:text-fg">
                {t.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHeader({
  eyebrow,
  heading,
  sub,
  trail,
  children,
  aside,
  glow = false,
}: {
  eyebrow: string
  heading: string
  sub?: string
  trail?: { name: string; path: string }[]
  children?: React.ReactNode
  aside?: React.ReactNode
  glow?: boolean
}) {
  return (
    <header
      className={cn(
        'relative overflow-hidden border-b border-line',
        glow && 'glow-accent',
      )}
    >
      <div
        aria-hidden
        className="bg-graph absolute inset-0 [mask-image:radial-gradient(70%_70%_at_30%_0%,black,transparent)]"
      />
      <Container className="relative pb-12 pt-10 sm:pb-16 sm:pt-12 lg:pb-18 lg:pt-14">
        {trail ? <Breadcrumbs trail={trail} /> : null}
        <div
          className={cn(
            'mt-6 gap-8',
            aside ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-end' : '',
          )}
        >
          <div>
            <Reveal y={8}>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
            <Reveal y={12} delay={0.04}>
              <h1 className="mt-3.5 max-w-[20ch] text-display-2 text-balance">{heading}</h1>
            </Reveal>
            {sub ? (
              <Reveal y={12} delay={0.08}>
                <p className="mt-5 max-w-[60ch] text-lead text-muted text-pretty">{sub}</p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal y={12} delay={0.12}>
                <div className="mt-7">{children}</div>
              </Reveal>
            ) : null}
          </div>
          {aside ? (
            <Reveal y={12} delay={0.1}>
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  )
}
