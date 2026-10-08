import * as React from 'react'
import { LogoGlyph } from '@/components/site/logo'
import { cn } from '@/lib/utils'

/**
 * The paper-page chrome every preview sits inside: an A4-ish sheet with a running
 * header and a page number, so the mocks read as pages out of a real PDF rather
 * than as UI.
 */
export function PageFrame({
  title,
  pageNo,
  section,
  children,
  className,
}: {
  title: string
  pageNo: string
  section: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border border-line bg-canvas',
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <LogoGlyph className="h-3 w-3" />
        <span className="num text-[0.5625rem] uppercase tracking-[0.1em] text-faint">{section}</span>
        <span className="num ml-auto text-[0.5625rem] text-faint">{pageNo}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 py-3.5">
        <p className="mb-3 text-[0.8125rem] font-semibold tracking-[-0.015em] text-fg">{title}</p>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export function Rule() {
  return <div className="my-2 h-px w-full bg-line" />
}
