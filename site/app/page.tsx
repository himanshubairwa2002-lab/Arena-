import type { Metadata } from 'next'
import { homeFaqIds, faqById } from '@/content/faq'
import { pageMeta } from '@/lib/seo'
import { faqLd, productLd, breadcrumbLd } from '@/lib/jsonld'
import { primaryExam } from '@/data/exams'
import { Hero } from '@/components/home/hero'
import { Problem } from '@/components/home/problem'
import { HeatmapSection } from '@/components/home/heatmap-section'
import { PackContents } from '@/components/home/pack-contents'
import { HowItWorks } from '@/components/home/how-it-works'
import { ProductCards } from '@/components/home/product-cards'
import { Proof } from '@/components/home/proof'
import { PricingTable } from '@/components/home/pricing-table'
import { FaqSection } from '@/components/home/faq-section'
import { FinalCta } from '@/components/home/final-cta'
import { LeadMagnetBand } from '@/components/home/lead-magnet-band'
import { ComparisonBand } from '@/components/home/comparison-band'

export const metadata: Metadata = pageMeta({
  title: 'Know what to skip \u2014 PYQ weightage analytics for GATE, CUET UG and State PSC',
  description:
    'Fifteen years of GATE papers, scored by subject. Find the 20% of the syllabus that carries most of the marks, and delete the rest. Free weightage heat map, no sign-up.',
  path: '/',
})

const faqs = homeFaqIds.map((id) => faqById[id]).filter(Boolean)

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productLd(primaryExam),
            faqLd(faqs),
            breadcrumbLd([{ name: 'Home', path: '/' }]),
          ]),
        }}
      />
      <Hero />
      <Problem />
      <HeatmapSection />
      <PackContents />
      <HowItWorks />
      <ComparisonBand />
      <ProductCards />
      <Proof />
      <PricingTable />
      <LeadMagnetBand />
      <FaqSection ids={homeFaqIds} />
      <FinalCta />
    </>
  )
}
