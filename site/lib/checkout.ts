/**
 * ============================================================================
 * THE ONLY PLACE PAYMENTS GET WIRED
 * ============================================================================
 *
 * Every "Buy", "Pre-order" and "Get" button on this site routes through
 * `initiateCheckout(productId)`. Payments are deliberately not integrated. When
 * Razorpay goes in, it goes in HERE and nowhere else — no component imports a
 * payment SDK, and no component knows an order id exists.
 *
 * To wire Razorpay:
 *   1. Add a POST /api/checkout route that creates a Razorpay order server-side
 *      (amount in paise, currency 'INR', receipt = productId + timestamp) using
 *      RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET from the environment.
 *   2. Load the Razorpay checkout script lazily inside `initiateCheckout`.
 *   3. Replace the `openCheckoutModal` call below with `rzp.open()`.
 *   4. Verify `razorpay_signature` server-side before releasing the download.
 *
 * Nothing else in the codebase changes.
 */

import { tiers } from '@/content/pricing'
import { exams } from '@/data/exams'

export type ProductId =
  | 'sample'
  | 'single-subject'
  | 'core-decode'
  | 'full-bundle'
  | 'bundle-mentorship'
  | `exam:${string}`

export type CheckoutIntent = {
  productId: ProductId
  /** Display name shown in the modal. */
  name: string
  /** Amount in rupees. 0 means this is a lead-capture flow, not a payment. */
  amount: number
  /** 'buy' | 'preorder' | 'waitlist' | 'lead' — drives the modal copy. */
  mode: CheckoutMode
}

export type CheckoutMode = 'buy' | 'preorder' | 'waitlist' | 'lead'

type Listener = (intent: CheckoutIntent) => void
const listeners = new Set<Listener>()

/** Subscribed by <CheckoutProvider>. Not for component use. */
export function onCheckout(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function resolve(productId: ProductId): CheckoutIntent {
  if (productId.startsWith('exam:')) {
    const slug = productId.slice('exam:'.length)
    const exam = exams.find((e) => e.slug === slug)
    if (exam) {
      const mode: CheckoutMode =
        exam.status === 'live' ? 'buy' : exam.status === 'preorder' ? 'preorder' : 'waitlist'
      return {
        productId,
        name: exam.product,
        amount: exam.price?.now ?? 0,
        mode,
      }
    }
  }

  const tier = tiers.find((t) => t.productId === productId)
  if (tier) {
    return {
      productId,
      name: tier.name,
      amount: tier.price,
      mode: tier.price === 0 ? 'lead' : 'buy',
    }
  }

  return { productId, name: 'Skiplist', amount: 0, mode: 'lead' }
}

/**
 * The single entry point for every purchase intent on the site.
 *
 * TODO: Razorpay order creation. Today this opens the "checkout coming soon"
 * modal and captures an email so the intent is not lost.
 */
export function initiateCheckout(productId: ProductId): void {
  const intent = resolve(productId)
  listeners.forEach((l) => l(intent))

  // TODO: Razorpay order creation
  // const order = await fetch('/api/checkout', {
  //   method: 'POST',
  //   headers: { 'content-type': 'application/json' },
  //   body: JSON.stringify({ productId, amount: intent.amount * 100 }),
  // }).then((r) => r.json())
  // const rzp = new window.Razorpay({
  //   key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //   order_id: order.id,
  //   amount: order.amount,
  //   currency: 'INR',
  //   name: 'Skiplist',
  //   description: intent.name,
  //   handler: (res) => verifyAndRelease(res),
  //   theme: { color: '#4D7AFF' },
  // })
  // rzp.open()
}

export const checkoutCopy: Record<CheckoutMode, { title: string; body: string; button: string }> = {
  buy: {
    title: 'Checkout is not live yet',
    body: 'Payments go live with the first GATE 2027 release. Leave an email or a WhatsApp number and you get the download link and the launch price the day it opens.',
    button: 'Hold my price',
  },
  preorder: {
    title: 'Pre-order list',
    body: 'Nothing is charged today. We record your price and email you on the day the pack ships, which is when payment happens.',
    button: 'Add me to the pre-order list',
  },
  waitlist: {
    title: 'Join the list',
    body: 'One email when the pack launches, with the launch price locked. No drip sequence, no reminders, no second list.',
    button: 'Join the list',
  },
  lead: {
    title: 'Where should the file go?',
    body: 'One email with the weightage map and the 12-page sample attached. That is the whole sequence.',
    button: 'Send it',
  },
}
