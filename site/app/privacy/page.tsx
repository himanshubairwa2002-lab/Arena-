import type { Metadata } from 'next'
import { privacy } from '@/content/legal'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = pageMeta({
  title: 'Privacy policy',
  description: 'We collect an email or mobile number and an order record. No ad pixels, no tracking, no selling of lists.',
  path: '/privacy',
  og: { heading: 'Privacy policy', kicker: 'Skiplist' },
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
              { name: 'Privacy policy', path: '/privacy' },
            ]),
          ),
        }}
      />
      <LegalPage doc={privacy} />
    </>
  )
}
