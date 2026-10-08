import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * ============================================================================
 * EMAIL / WHATSAPP CAPTURE — THE ONLY PLACE A PROVIDER GETS WIRED
 * ============================================================================
 *
 * Today this validates, logs, and returns success. Every form on the site posts
 * here. To plug in a real provider (Resend audience, Brevo, Mailchimp, Loops,
 * a Google Sheet, whatever), replace the `persist()` body below. Nothing else
 * in the codebase needs to change.
 */

const IN_PHONE = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/

export const subscribeSchema = z
  .object({
    /** Either an email or an Indian mobile number. The form uses one field. */
    contact: z
      .string({ required_error: 'Enter an email or a WhatsApp number' })
      .trim()
      .min(3, 'Enter an email or a WhatsApp number')
      .max(120, 'That is too long to be either'),
    /** Where the capture came from, so we can see which section converts. */
    source: z.string().trim().max(64).default('unknown'),
    /** Product the user was looking at, when relevant. */
    productId: z.string().trim().max(64).optional(),
    examSlug: z.string().trim().max(64).optional(),
    /**
     * Honeypot. Real users never fill this. Deliberately NOT validated here —
     * a 422 that only fires on this field tells a bot exactly which input to
     * leave alone. It is checked after parsing and answered with a fake 200.
     */
    website: z.string().max(200).optional(),
  })
  .transform((v) => {
    const isEmail = z.string().email().safeParse(v.contact).success
    const digits = v.contact.replace(/[\s-]/g, '')
    const isPhone = IN_PHONE.test(digits)
    return { ...v, channel: isEmail ? ('email' as const) : isPhone ? ('whatsapp' as const) : ('invalid' as const) }
  })
  .refine((v) => v.channel !== 'invalid', {
    message: 'That does not look like an email or an Indian mobile number',
    path: ['contact'],
  })

export type SubscribePayload = z.infer<typeof subscribeSchema>

async function persist(payload: SubscribePayload): Promise<void> {
  // TODO: swap for a real provider. For example:
  //   await resend.contacts.create({
  //     email: payload.contact,
  //     audienceId: process.env.RESEND_AUDIENCE_ID!,
  //   })
  // Keep the shape below stable — the client only checks `ok`.
  console.info('[subscribe]', {
    channel: payload.channel,
    source: payload.source,
    productId: payload.productId ?? null,
    examSlug: payload.examSlug ?? null,
    at: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request' }, { status: 400 })
  }

  const parsed = subscribeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Check that field' },
      { status: 422 },
    )
  }

  // Honeypot filled means a bot. Answer exactly like a success and store
  // nothing, so the caller cannot distinguish a drop from a save.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, channel: parsed.data.channel })
  }

  await persist(parsed.data)

  return NextResponse.json({ ok: true, channel: parsed.data.channel })
}
