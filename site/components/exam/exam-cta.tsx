'use client'

import { ArrowRight } from 'lucide-react'
import type { Exam } from '@/data/exams'
import { Button } from '@/components/ui/button'
import { initiateCheckout } from '@/lib/checkout'
import { inr } from '@/lib/utils'

export function ExamCta({ exam, size = 'md' }: { exam: Exam; size?: 'md' | 'lg' }) {
  return (
    <div className="flex flex-col gap-2">
      {exam.price ? (
        <p className="flex items-baseline gap-2">
          <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-fg">
            {inr(exam.price.now)}
          </span>
          <span className="num text-[0.8125rem] text-faint line-through">{inr(exam.price.mrp)}</span>
        </p>
      ) : null}
      <Button size={size} className="w-full" onClick={() => initiateCheckout(`exam:${exam.slug}`)}>
        {exam.cta.primary}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Button>
      <p className="num text-center text-[0.625rem] leading-relaxed text-faint">{exam.priceNote}</p>
    </div>
  )
}
