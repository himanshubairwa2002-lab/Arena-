'use client'

import * as React from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { packComponents } from '@/content/pack'
import { taglines } from '@/content/copy'
import { previewMap } from '@/components/previews'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function PackContents() {
  const [activeId, setActiveId] = React.useState(packComponents[0].id)
  const active = packComponents.find((c) => c.id === activeId) ?? packComponents[0]
  const Preview = previewMap[active.preview]

  return (
    <Section id="whats-inside" aria-labelledby="inside-heading" className="border-t border-line">
      <Container>
        <Reveal>
          <p className="eyebrow">What you actually get</p>
          <h2 id="inside-heading" className="mt-3 max-w-[22ch] text-h1 text-balance">
            {taglines.pack}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lead text-muted text-pretty">
            Nine components in one PDF. Click any of them to see the page it produces &mdash; these
            are the real layouts, rendered from the real data, not mockups of a file that does not
            exist.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
          <Reveal>
            <ul className="divide-y divide-line border-y border-line" role="tablist" aria-label="Pack components">
              {packComponents.map((c) => {
                const isActive = c.id === activeId
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      role="tab"
                      id={`pack-tab-${c.id}`}
                      aria-selected={isActive}
                      aria-controls="pack-preview"
                      onClick={() => setActiveId(c.id)}
                      onMouseEnter={() => setActiveId(c.id)}
                      onFocus={() => setActiveId(c.id)}
                      className={cn(
                        'group relative flex w-full items-start gap-4 py-3.5 pl-4 pr-3 text-left transition-colors duration-150',
                        isActive ? 'bg-raised' : 'hover:bg-raised/60',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-y-0 left-0 w-[2px] transition-colors duration-240',
                          isActive ? 'bg-heat-6' : 'bg-transparent',
                        )}
                      />
                      <span
                        className={cn(
                          'num mt-0.5 shrink-0 text-[0.6875rem] transition-colors duration-150',
                          isActive ? 'text-heat-6' : 'text-faint',
                        )}
                      >
                        {c.n}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block text-[0.9375rem] font-medium leading-snug transition-colors duration-150',
                            isActive ? 'text-fg' : 'text-muted group-hover:text-fg',
                          )}
                        >
                          {c.title}
                        </span>
                        <span className="mt-0.5 block text-small leading-relaxed text-faint">
                          {c.summary}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="pack-preview"
              role="tabpanel"
              aria-labelledby={`pack-tab-${active.id}`}
              className="lg:sticky lg:top-20"
            >
              <div className="relative h-[340px] overflow-hidden rounded-xl border border-line bg-surface p-3 sm:h-[400px]">
                <div aria-hidden className="bg-graph-fine absolute inset-0 opacity-60" />
                {/* `initial={false}` so the first panel is server-rendered at its
                    final state — no opacity:0 in the HTML, no hydration mismatch.
                    Only user-initiated tab switches animate. MotionConfig reads
                    the media query at runtime instead of a hook that disagrees
                    between server and client. */}
                <MotionConfig reducedMotion="user">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-full"
                    >
                      <Preview />
                    </motion.div>
                  </AnimatePresence>
                </MotionConfig>
              </div>
              <div className="mt-3 rounded-lg border border-line bg-surface px-4 py-3">
                <p className="num text-[0.6875rem] uppercase tracking-[0.08em] text-heat-6">
                  {active.spec}
                </p>
                <p className="mt-1.5 text-small leading-relaxed text-muted">{active.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
