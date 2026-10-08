'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { exams, type Exam } from '@/data/exams'
import { taglines } from '@/content/copy'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/site/container'
import { Reveal } from '@/components/motion/reveal'
import { WeeksLeft } from '@/components/site/countdown'
import { initiateCheckout } from '@/lib/checkout'
import { formatDate } from '@/lib/dates'
import { cn, inr } from '@/lib/utils'

const tone = { live: 'live', preorder: 'preorder', waitlist: 'waitlist' } as const

export function ProductCard({ exam, featured }: { exam: Exam; featured?: boolean }) {
  return (
    <article
      className={cn(
        'card card-hover relative flex flex-col p-5 sm:p-6',
        featured && 'border-line-strong bg-raised ring-1 ring-accent/20',
      )}
    >
      {featured ? (
        <span
          aria-hidden
          className="absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone={tone[exam.status]} dot={exam.status === 'live'}>
            {exam.statusLabel}
          </Badge>
          <h3 className="mt-3 text-h3">{exam.product}</h3>
        </div>
        {exam.price ? (
          <div className="shrink-0 text-right">
            <p className="num text-[1.375rem] font-medium leading-none tracking-[-0.03em] text-fg">
              {inr(exam.price.now)}
            </p>
            <p className="num mt-1 text-[0.75rem] text-faint line-through">{inr(exam.price.mrp)}</p>
          </div>
        ) : (
          <p className="num shrink-0 text-[0.75rem] text-faint">Not on sale</p>
        )}
      </div>

      <p className="mt-3 text-body leading-relaxed text-muted text-pretty">{exam.pitch}</p>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
        <div className="bg-surface px-3 py-2.5">
          <dt className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">Exam</dt>
          <dd className="num mt-1 text-[0.75rem] text-fg">
            {exam.countdown.confirmed ? formatDate(exam.countdown.date) : exam.examWindow}
          </dd>
        </div>
        <div className="bg-surface px-3 py-2.5">
          <dt className="num text-[0.625rem] uppercase tracking-[0.08em] text-faint">Weeks left</dt>
          <dd className="num mt-1 text-[0.75rem] text-fg">
            <WeeksLeft target={exam.countdown.date} />
            {exam.countdown.confirmed ? '' : ' (projected)'}
          </dd>
        </div>
      </dl>

      <ul className="mt-5 space-y-2">
        {exam.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-small leading-relaxed text-muted">
            <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-heat-6" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-2 pt-6">
        <Button
          variant={featured ? 'primary' : 'ghost'}
          onClick={() => initiateCheckout(`exam:${exam.slug}`)}
        >
          {exam.cta.primary}
          {featured ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
        </Button>
        <Link
          href={`/exams/${exam.slug}`}
          className="text-center text-small text-muted transition-colors hover:text-fg"
        >
          See what is in it
        </Link>
      </div>

      <p className="num mt-3 text-center text-[0.625rem] text-faint">{exam.priceNote}</p>
    </article>
  )
}

export function ProductCards() {
  return (
    <Section id="exams" aria-labelledby="exams-heading" className="border-t border-line bg-surface/40">
      <Container>
        <Reveal>
          <p className="eyebrow">Three exams</p>
          <h2 id="exams-heading" className="mt-3 max-w-[24ch] text-h1 text-balance">
            {taglines.products}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lead text-muted text-pretty">
            One pack per paper, priced for the person actually paying. GATE is live. The other two
            are honest about where they are.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {exams.map((exam, i) => (
            <Reveal key={exam.slug} delay={i * 0.06} className="flex">
              <div className="flex w-full">
                <ProductCard exam={exam} featured={exam.status === 'live'} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
