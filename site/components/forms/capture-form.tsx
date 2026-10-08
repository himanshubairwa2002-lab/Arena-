'use client'

import * as React from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type State = 'idle' | 'loading' | 'done' | 'error'

export function CaptureForm({
  source,
  productId,
  examSlug,
  buttonLabel = 'Send it',
  placeholder = 'you@college.edu or 9XXXXXXXXX',
  note,
  className,
  stacked = false,
}: {
  source: string
  productId?: string
  examSlug?: string
  buttonLabel?: string
  placeholder?: string
  note?: string
  className?: string
  stacked?: boolean
}) {
  const [state, setState] = React.useState<State>('idle')
  const [message, setMessage] = React.useState('')
  const id = React.useId()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contact: String(data.get('contact') ?? ''),
          website: String(data.get('website') ?? ''),
          source,
          productId,
          examSlug,
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string; channel?: string }
      if (!res.ok || !json.ok) {
        setState('error')
        setMessage(json.error ?? 'Something broke on our side. Try again.')
        return
      }
      setState('done')
      setMessage(
        json.channel === 'whatsapp'
          ? 'Saved. We will message that number on WhatsApp, once.'
          : 'Saved. Check that inbox, including spam.',
      )
      form.reset()
    } catch {
      setState('error')
      setMessage('Network error. Try again in a moment.')
    }
  }

  if (state === 'done') {
    return (
      <div
        className={cn(
          'flex items-start gap-2.5 rounded-md border border-heat-6/30 bg-heat-6/[0.07] px-3.5 py-3',
          className,
        )}
        role="status"
      >
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-heat-6" aria-hidden />
        <p className="text-small text-fg">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn('w-full', className)} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address or WhatsApp number
      </label>
      <div className={cn('flex gap-2', stacked ? 'flex-col' : 'flex-col sm:flex-row')}>
        <input
          id={id}
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          aria-describedby={message ? `${id}-msg` : undefined}
          aria-invalid={state === 'error'}
          className="h-11 min-w-0 flex-1 sm:min-w-[17rem] rounded-md border border-line bg-canvas px-3.5 text-[0.9375rem] text-fg placeholder:text-faint focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
        {/* Honeypot. Zero-sized and removed from the a11y tree and the tab order,
            so only a form-filling bot can reach it. The API answers a filled
            honeypot with a normal 200 and stores nothing. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none h-0 w-0 border-0 p-0 opacity-0"
        />
        <Button type="submit" size="lg" disabled={state === 'loading'} className="h-11 shrink-0">
          {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {state === 'loading' ? 'Sending' : buttonLabel}
        </Button>
      </div>
      {message && state === 'error' ? (
        <p id={`${id}-msg`} role="alert" className="mt-2 text-small text-heat-5">
          {message}
        </p>
      ) : null}
      {note ? <p className="mt-2 text-[0.75rem] text-faint">{note}</p> : null}
    </form>
  )
}
