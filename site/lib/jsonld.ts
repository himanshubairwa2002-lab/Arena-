import { site } from '@/content/site'
import type { Exam } from '@/data/exams'
import type { Faq } from '@/content/faq'
import { baseUrl } from './seo'

type Json = Record<string, unknown>

export function organizationLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: baseUrl,
    email: site.email,
    description: site.description,
    foundingDate: String(site.foundedYear),
    areaServed: 'IN',
    sameAs: [site.telegram.href, site.instagram.href],
  }
}

export function websiteLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: baseUrl,
    inLanguage: 'en-IN',
  }
}

export function productLd(exam: Exam): Json {
  const availability =
    exam.status === 'live'
      ? 'https://schema.org/InStock'
      : exam.status === 'preorder'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/PreSale'

  const base: Json = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: exam.product,
    description: exam.pitch,
    url: `${baseUrl}/exams/${exam.slug}`,
    brand: { '@type': 'Brand', name: site.name },
    category: 'Educational study material',
  }

  if (exam.price) {
    base.offers = {
      '@type': 'Offer',
      price: exam.price.now,
      priceCurrency: 'INR',
      availability,
      url: `${baseUrl}/exams/${exam.slug}`,
      priceValidUntil: '2027-03-31',
      seller: { '@type': 'Organization', name: site.legalName },
    }
  }

  return base
}

export function courseLd(exam: Exam): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${exam.exam} previous-year question analysis`,
    description: exam.intro,
    url: `${baseUrl}/exams/${exam.slug}`,
    inLanguage: exam.slug === 'state-psc' ? ['hi-IN', 'en-IN'] : 'en-IN',
    provider: {
      '@type': 'Organization',
      name: site.legalName,
      url: baseUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P45D',
      name: `${exam.product} self-paced revision plan`,
    },
    offers: exam.price
      ? {
          '@type': 'Offer',
          price: exam.price.now,
          priceCurrency: 'INR',
          category: 'Paid',
        }
      : { '@type': 'Offer', price: 0, priceCurrency: 'INR', category: 'Free' },
  }
}

export function faqLd(faqs: Faq[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${baseUrl}${t.path}`,
    })),
  }
}
