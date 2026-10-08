export const site = {
  name: 'Skiplist',
  legalName: 'Skiplist Analytics',
  domain: 'skiplist.in',
  url: 'https://skiplist.in',
  description:
    'Fifteen years of previous-year papers, decoded into a weightage map and a revision plan. Know what to skip.',
  email: 'hello@skiplist.in',
  supportEmail: 'support@skiplist.in',
  whatsapp: {
    label: 'WhatsApp support',
    // Placeholder business number — swap in /content/site.ts before launch.
    number: '+91 00000 00000',
    href: 'https://wa.me/910000000000',
  },
  telegram: {
    label: 'Telegram community',
    href: 'https://t.me/skiplist',
    handle: '@skiplist',
  },
  instagram: {
    label: 'Instagram',
    href: 'https://instagram.com/skiplist',
    handle: '@skiplist',
  },
  foundedYear: 2026,
  /** Registered address. Placeholder — replace before launch. */
  address: 'Bengaluru, Karnataka, India',
  /** Support SLA quoted in the FAQ and on /about. Keep it true. */
  responseSla: 'one working day',
} as const

export type NavChild = { label: string; href: string; meta?: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export const primaryNav: NavItem[] = [
  {
    label: 'Exams',
    href: '/exams/gate-2027',
    children: [
      { label: 'GATE 2027', href: '/exams/gate-2027', meta: 'Live' },
      { label: 'CUET UG 2027', href: '/exams/cuet-ug-2027', meta: 'Pre-order' },
      { label: 'State PSC', href: '/exams/state-psc', meta: 'Waitlist' },
    ],
  },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Free tools', href: '/free/weightage-map' },
  { label: 'Pricing', href: '/pricing' },
]

export const footerNav: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Decode packs',
    links: [
      { label: 'GATE 2027', href: '/exams/gate-2027' },
      { label: 'CUET UG 2027', href: '/exams/cuet-ug-2027' },
      { label: 'State PSC 2027', href: '/exams/state-psc' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Free',
    links: [
      { label: 'Weightage heat map', href: '/free/weightage-map' },
      { label: 'Download chart as PNG', href: '/free/weightage-map#download' },
      { label: '12-page sample pack', href: '/free/weightage-map#sample' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Methodology', href: '/how-it-works' },
      { label: 'About', href: '/about' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Contact', href: `mailto:${site.email}` },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Refund policy', href: '/refund-policy' },
    ],
  },
]

/** Payment rails we intend to accept. Rendered as text marks, not logos. */
export const paymentRails = ['UPI', 'GPay', 'PhonePe', 'Paytm', 'Card', 'Netbanking'] as const

export const trustNotes = [
  'GST included in every price shown',
  'Instant download, nothing ships',
  'No hidden charges, no auto-renewal',
] as const
