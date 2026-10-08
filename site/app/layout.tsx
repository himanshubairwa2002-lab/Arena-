import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { site } from '@/content/site'
import { baseUrl } from '@/lib/seo'
import { organizationLd, websiteLd } from '@/lib/jsonld'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { themeScript } from '@/components/site/theme-toggle'
import { CheckoutProvider } from '@/components/checkout/checkout-provider'

const sans = localFont({
  src: './fonts/InterTight-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

const mono = localFont({
  src: './fonts/JetBrainsMono-Variable.woff2',
  weight: '100 800',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})

const hindi = localFont({
  src: './fonts/NotoSansDevanagari-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-hi',
  display: 'swap',
  preload: false,
  fallback: ['Nirmala UI', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} \u2014 Know what to skip`,
    template: `%s \u00B7 ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  keywords: [
    'GATE 2027 weightage',
    'GATE CSE subject wise weightage',
    'previous year question analysis',
    'CUET UG 2027 chapter weightage',
    'UPPSC PCS PYQ analysis',
    'BPSC CCE previous year',
    'exam revision plan India',
  ],
  category: 'education',
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    url: baseUrl,
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07080B' },
    { media: '(prefers-color-scheme: light)', color: '#FDFDFE' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${hindi.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd(), websiteLd()]) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CheckoutProvider />
      </body>
    </html>
  )
}
