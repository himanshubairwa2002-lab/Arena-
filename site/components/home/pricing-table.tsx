'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { pricingCopy, tiers, updateAddOn, updatePlans, type UpdatePlan } from '@/content/pricing'
import { paymentRails, trustNotes } from '@/content/site'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { initiateCheckout, type ProductId } from '@/lib/checkout'
import { cn, inr } from '@/lib/utils'

export function PricingTable({ standalone = false }: { standalone?: boolean }) {
  const [plan, setPlan] = React.useState<UpdatePlan>('annual')
  const addOn = updatePlans[plan]

  return (
    <Section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={cn(!standalone && 'border-t border-line')}
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">{pricingCopy.eyebrow}</p>
              <h2 id="pricing-heading" className="mt-3 max-w-[22ch] text-h1 text-balance">
                {pricingCopy.heading}
              </h2>
              <p className="mt-4 max-w-[54ch] text-lead text-muted text-pretty">{pricingCopy.sub}</p>
            </div>

            <div className="shrink-0">
              <p className="eyebrow mb-2">Update subscription</p>
              <div
                role="group"
                aria-label="Update subscription billing period"
                className="flex rounded-md border border-line bg-surface p-0.5"
              >
                {(Object.keys(updatePlans) as UpdatePlan[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={p === plan}
                    onClick={() => setPlan(p)}
                    className={cn(
                      'rounded-[5px] px-3 py-1.5 text-[0.8125rem] transition-colors duration-150',
                      p === plan ? 'bg-raised text-fg shadow-ring' : 'text-faint hover:text-muted',
                    )}
                  >
                    {updatePlans[p].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container wide>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.04} className="flex">
              <article
                className={cn(
                  'card card-hover flex w-full flex-col p-5',
                  tier.featured && 'border-line-strong bg-raised ring-1 ring-accent/25',
                )}
              >
                {tier.featured ? (
                  <Badge tone="accent" className="mb-3 self-start">
                    Recommended
                  </Badge>
                ) : null}
                <h3 className="text-[0.9375rem] font-medium text-fg">{tier.name}</h3>
                <p className="mt-1 text-small leading-snug text-muted text-pretty">{tier.tagline}</p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="num text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-fg">
                    {tier.price === 0 ? inr(0) : inr(tier.price)}
                  </span>
                  {tier.mrp ? (
                    <span className="num text-[0.8125rem] text-faint line-through">
                      {inr(tier.mrp)}
                    </span>
                  ) : null}
                </div>
                <p className="num mt-1.5 text-[0.6875rem] text-faint">{tier.meta}</p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[0.8125rem] leading-relaxed text-muted">
                      <Check className="mt-[3px] h-3 w-3 shrink-0 text-heat-6" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.price > 0 ? (
                  <p className="num mt-4 rounded border border-line bg-canvas px-2.5 py-2 text-[0.6875rem] leading-relaxed text-faint">
                    + {inr(addOn.price)}
                    {addOn.per} to keep it updated after this cycle. Optional.
                  </p>
                ) : null}

                <div className="mt-auto pt-5">
                  <Button
                    variant={tier.featured ? 'primary' : 'ghost'}
                    className="w-full"
                    onClick={() => initiateCheckout(tier.productId as ProductId)}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 rounded-xl border border-line bg-surface p-5 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h3 className="text-[0.9375rem] font-medium text-fg">{updateAddOn.heading}</h3>
              <p className="mt-1.5 max-w-prose text-small leading-relaxed text-muted text-pretty">
                {updateAddOn.body}
              </p>
              <p className="num mt-2 text-[0.6875rem] text-faint">{addOn.note}</p>
            </div>
            <div className="num shrink-0 text-left lg:text-right">
              <p className="text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-fg">
                {inr(addOn.price)}
                <span className="text-[0.8125rem] text-faint">{addOn.per}</span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="num flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.625rem] uppercase tracking-[0.08em] text-faint">
              {paymentRails.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-muted">
              {trustNotes.map((n) => (
                <li key={n} className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-heat-6" aria-hidden />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
