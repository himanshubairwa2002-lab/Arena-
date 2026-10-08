import type { Metadata } from 'next'
import { refundPolicy } from '@/content/legal'
import { pageMeta } from '@/lib/seo'
import { breadcrumbLd } from '@/lib/jsonld'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = pageMeta({
  title: 'Refund policy',
  description: 'Seven days from download, and reading the whole pack does not void it.',
  path: '/refund-policy',
  og: { heading: 'Refund policy', kicker: 'Skiplist' },
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
              { name: 'Refund policy', path: '/refund-policy' },
            ]),
          ),
        }}
      />
      <LegalPage doc={refundPolicy} />
    </>
  )
}
