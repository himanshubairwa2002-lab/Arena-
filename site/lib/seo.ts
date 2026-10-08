import type { Metadata } from 'next'
import { site } from '@/content/site'

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url

type PageMetaInput = {
  title: string
  description: string
  path: string
  /** Extra querystring for the generated OG image. */
  og?: { heading: string; kicker?: string; stat?: string; statLabel?: string }
  noIndex?: boolean
}

export function ogImageUrl(og: NonNullable<PageMetaInput['og']>): string {
  const params = new URLSearchParams({ heading: og.heading })
  if (og.kicker) params.set('kicker', og.kicker)
  if (og.stat) params.set('stat', og.stat)
  if (og.statLabel) params.set('statLabel', og.statLabel)
  return `/api/og?${params.toString()}`
}

export function pageMeta({ title, description, path, og, noIndex }: PageMetaInput): Metadata {
  const url = `${baseUrl}${path}`
  const image = og ? ogImageUrl(og) : '/api/og'
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
