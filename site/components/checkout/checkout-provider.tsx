'use client'

import * as React from 'react'
import { checkoutCopy, onCheckout, type CheckoutIntent } from '@/lib/checkout'
import { Dialog } from '@/components/ui/dialog'
import { CaptureForm } from '@/components/forms/capture-form'
import { inr } from '@/lib/utils'
import { paymentRails } from '@/content/site'

/**
 * Mounted once in the root layout. Listens for initiateCheckout() and opens the
 * stand-in modal. When Razorpay is wired in lib/checkout.ts this keeps working
 * for the pre-order and waitlist modes, which never go through a payment page.
 */
export function CheckoutProvider() {
  const [intent, setIntent] = React.useState<CheckoutIntent | null>(null)

  React.useEffect(() => onCheckout(setIntent), [])

  const copy = intent ? checkoutCopy[intent.mode] : null

  return (
    <Dialog open={intent !== null} onClose={() => setIntent(null)} title={copy?.title ?? ''}>
      {intent && copy ? (
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-4 rounded-md border border-line bg-raised px-3.5 py-3">
            <span className="text-small text-muted">{intent.name}</span>
            <span className="num text-[0.9375rem] font-medium text-fg">
              {intent.amount > 0 ? inr(intent.amount) : 'Free'}
            </span>
          </div>

          <p className="text-body text-muted">{copy.body}</p>

          <CaptureForm
            source={`checkout:${intent.mode}`}
            productId={intent.productId}
            buttonLabel={copy.button}
            stacked
            note="No spam, no drip sequence. One message, then nothing until there is something to say."
          />

          {intent.amount > 0 ? (
            <p className="num flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-3 text-[0.625rem] uppercase tracking-[0.08em] text-faint">
              {paymentRails.map((r) => (
                <span key={r}>{r}</span>
              ))}
              <span className="text-line-strong">&middot;</span>
              <span>GST included</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </Dialog>
  )
}
