import type { Metadata } from 'next'
import { terms } from '@/content/legal'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = pageMeta({
  title: 'Terms of use',
  description: 'What you can do with a Skiplist pack, what we promise, and what we do not.',
  path: '/terms',
  og: { heading: 'Terms of use', kicker: 'Skiplist' },
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Terms of use', path: '/terms' },
            ]),
          ),
        }}
      />
      <LegalPage doc={terms} />
    </>
  )
}
