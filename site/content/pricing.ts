export type Tier = {
  id: string
  name: string
  price: number
  mrp: number | null
  tagline: string
  /** Short line under the price. */
  meta: string
  features: string[]
  cta: string
  /** Product id handed to initiateCheckout(). */
  productId: string
  featured?: boolean
  /** Free tier opens the lead-capture modal instead of checkout. */
  lead?: boolean
}

export const tiers: Tier[] = [
  {
    id: 'sample',
    name: 'Free sample',
    price: 0,
    mrp: null,
    tagline: 'Twelve pages, nothing held back.',
    meta: 'No card. Email or WhatsApp only.',
    features: [
      'Full 2012–2026 weightage matrix for one branch',
      'Ranked high-yield to safe-to-skip table',
      'Two sample micro-note pages, final layout',
      'The 7-day calendar in full',
    ],
    cta: 'Get the sample',
    productId: 'sample',
    lead: true,
  },
  {
    id: 'single',
    name: 'Single subject',
    price: 299,
    mrp: 599,
    tagline: 'One subject, done properly.',
    meta: 'For a specific weak subject.',
    features: [
      'Micro-topic weightage for one subject',
      'Repeat and recycle index for that subject',
      'Trap analysis and distractor patterns',
      'Formula / one-liner sheet, print-ready',
    ],
    cta: 'Buy single subject',
    productId: 'single-subject',
  },
  {
    id: 'core',
    name: 'Core Decode',
    price: 599,
    mrp: 1199,
    tagline: 'The whole paper, ranked and scheduled.',
    meta: 'One paper, one cycle. The pack we built first.',
    features: [
      'All nine components for one full paper',
      '2012–2026 matrix, ranked yield table, skip list',
      '45 / 30 / 15 / 7-day calendars with checkboxes',
      'Cut-off and normalisation trend chapter',
      'Free updates for the whole cycle',
    ],
    cta: 'Get Core Decode',
    productId: 'core-decode',
    featured: true,
  },
  {
    id: 'bundle',
    name: 'Full bundle',
    price: 1299,
    mrp: 2599,
    tagline: 'Two papers, or one paper and a backup exam.',
    meta: 'Cheaper than two Core Decodes.',
    features: [
      'Everything in Core Decode, for two papers',
      'Cross-paper overlap map so you study shared topics once',
      'Combined calendar across both papers',
      'Free updates for both, whole cycle',
    ],
    cta: 'Get the bundle',
    productId: 'full-bundle',
  },
  {
    id: 'mentorship',
    name: 'Bundle + mentorship',
    price: 4999,
    mrp: 7999,
    tagline: 'The bundle, plus someone who argues with your plan.',
    meta: 'Capped at a small cohort per cycle.',
    features: [
      'Everything in the full bundle',
      'Four 1:1 calls: plan, mid-point, mock review, final week',
      'Your calendar rebuilt around your actual free hours',
      'Direct line for the whole cycle',
    ],
    cta: 'Apply for mentorship',
    productId: 'bundle-mentorship',
  },
]

export type UpdatePlan = 'monthly' | 'annual'

export const updatePlans: Record<UpdatePlan, { label: string; price: number; per: string; note: string }> = {
  monthly: {
    label: 'Monthly',
    price: 49,
    per: '/month',
    note: 'Cancel any month. Nothing auto-renews without an email first.',
  },
  annual: {
    label: 'Annual',
    price: 399,
    per: '/year',
    note: 'Works out ₹189 cheaper than twelve months.',
  },
}

export const updateAddOn = {
  heading: 'Keep it updated after your cycle ends',
  body: 'Every paid pack already includes free updates for your exam cycle. This add-on is only for people sitting again next year: it keeps the matrix, the skip list and the calendars current for one more cycle. Nothing is locked behind it — if you let it lapse, the file you downloaded still works.',
} as const

export const pricingCopy = {
  eyebrow: 'Pricing',
  heading: 'Cut the syllabus with data, not vibes.',
  sub: 'Five options. The one we recommend is in the middle and costs less than two weeks of coaching.',
} as const
