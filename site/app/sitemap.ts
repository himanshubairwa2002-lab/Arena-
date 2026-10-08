import type { MetadataRoute } from 'next'
import { exams } from '@/data/exams'
import { legalDocs } from '@/content/legal'
import { baseUrl } from '@/lib/seo'
import { todayIso } from '@/lib/dates'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = todayIso()

  const core: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/free/weightage-map`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/changelog`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const examPages: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${baseUrl}/exams/${e.slug}`,
    changeFrequency: 'weekly' as const,
    priority: e.status === 'live' ? 0.95 : 0.6,
  }))

  const legal: MetadataRoute.Sitemap = legalDocs.map((d) => ({
    url: `${baseUrl}/${d.slug}`,
    lastModified: d.updated,
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  }))

  return [...core, ...examPages, ...legal].map((e) => ({ lastModified: now, ...e }))
}
