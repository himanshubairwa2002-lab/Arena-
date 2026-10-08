import { site } from './site'

export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'ul'; items: string[] }

export type LegalDoc = {
  slug: string
  title: string
  eyebrow: string
  intro: string
  updated: string
  blocks: LegalBlock[]
}

/**
 * Plain-language legal copy. Short sentences, no defined-term soup. These are
 * real policies for a digital-goods business in India, not boilerplate pasted
 * from a US SaaS template — but they are not legal advice and should be read by
 * a lawyer before the business takes its first rupee.
 */

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms of use',
  eyebrow: 'Legal',
  intro:
    'What you can do with a Skiplist pack, what we promise, and what we do not. Written to be read, not to be survived.',
  updated: '2026-10-07',
  blocks: [
    { kind: 'h', text: 'Who we are' },
    {
      kind: 'p',
      text: `${site.legalName} operates ${site.domain} and sells downloadable analysis packs for Indian competitive examinations. We are not affiliated with IIT Madras, the Indian Institute of Technology system, the National Testing Agency, UPPSC, BPSC or any other conducting authority. Exam names, dates and paper codes are referenced for identification only.`,
    },

    { kind: 'h', text: 'What you are buying' },
    {
      kind: 'p',
      text: 'A licence to use a digital document for your own exam preparation. You may download it to as many of your own devices as you like, print it for yourself, annotate it, and keep it after your exam cycle ends. You do not get ownership of the underlying analysis, the datasets, or the right to resell.',
    },
    {
      kind: 'p',
      text: 'You may not upload a pack to a file-sharing site, post it in a public group, sell it, bundle it into a course, or use it as teaching material in a paid class without a written licence from us. If you are an institution and want one, write to us; the answer is usually yes and the price is reasonable.',
    },

    { kind: 'h', text: 'What we promise' },
    {
      kind: 'ul',
      items: [
        'Every figure in a pack is either traceable to a published source we name, or computed from datasets we describe in our methodology.',
        'Where a source is internally inconsistent, we show the inconsistency rather than smoothing it.',
        'Free updates for your exam cycle, each one logged in the public changelog with a date.',
        'A working download link. If it breaks, email us and we will reissue it.',
      ],
    },

    { kind: 'h', text: 'What we do not promise' },
    {
      kind: 'p',
      text: 'We do not promise a rank, a score, a seat, a post, an interview call, or admission anywhere. No analysis of past papers can promise those things, and anyone who tells you otherwise is selling something worse than we are. Weightage is a description of what has already happened. It is not a prediction of a specific future paper.',
    },
    {
      kind: 'p',
      text: 'We do not promise that a conducting body will keep its pattern. When a pattern changes mid-cycle we re-run the analysis and reissue the pack, but we cannot stop the change from happening.',
    },

    { kind: 'h', text: 'Accuracy and corrections' },
    {
      kind: 'p',
      text: 'We tag thousands of questions by hand and we will get some of them wrong. When we find an error, or you tell us about one, we fix it, reissue the pack, and record the correction in the public changelog. The erroneous version stays on the record. If an error is material to the value of the pack, the refund window reopens for seven days from the date of the correction.',
    },

    { kind: 'h', text: 'Payment' },
    {
      kind: 'p',
      text: 'Prices on the site are in Indian rupees and include GST. A tax invoice is issued to the email address used at checkout. Payments are processed by a third-party payment gateway; we never see or store your card details. At the time of writing, online payment is not yet enabled and no charge can be made.',
    },

    { kind: 'h', text: 'Liability' },
    {
      kind: 'p',
      text: 'Our total liability to you for anything arising out of a pack is limited to the amount you paid for it. We are not liable for exam outcomes, lost study time, or any indirect or consequential loss. Nothing here limits liability that cannot be limited under Indian law.',
    },

    { kind: 'h', text: 'Changes to these terms' },
    {
      kind: 'p',
      text: 'If we change these terms we update the date at the top of this page and note it in the changelog. Changes are not retrospective: the terms that applied when you bought are the terms that apply to your purchase.',
    },

    { kind: 'h', text: 'Governing law' },
    {
      kind: 'p',
      text: 'These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at Bengaluru, Karnataka.',
    },

    { kind: 'h', text: 'Contact' },
    { kind: 'p', text: `Write to ${site.email}. We reply within ${site.responseSla}.` },
  ],
}

export const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy policy',
  eyebrow: 'Legal',
  intro:
    'What we collect, which is very little, and what we do with it, which is almost nothing. No trackers, no ad pixels, no selling of lists.',
  updated: '2026-10-07',
  blocks: [
    { kind: 'h', text: 'The short version' },
    {
      kind: 'p',
      text: 'We collect an email address or mobile number when you choose to give us one, and the order details when you buy something. We do not run advertising pixels, we do not sell or rent contact details to anyone, and we do not build behavioural profiles. There is no third-party analytics script on this site that follows you around the internet.',
    },

    { kind: 'h', text: 'What we collect' },
    {
      kind: 'ul',
      items: [
        'Contact details you type into a form: either an email address or an Indian mobile number, plus which form you used so we know what you asked for.',
        'Purchase records: what you bought, when, and the amount. Card details never reach us — the payment gateway handles those.',
        'Aggregate, non-identifying page counts, used to see which pages are read. No cross-site tracking.',
        'Emails you send us, kept so we can answer them and find them later.',
      ],
    },

    { kind: 'h', text: 'What we use it for' },
    {
      kind: 'ul',
      items: [
        'Sending you the thing you asked for: a sample pack, a launch notification, a download link, an invoice.',
        'Telling you when the pack you own has been updated, during your exam cycle.',
        'Answering your support messages.',
      ],
    },
    {
      kind: 'p',
      text: 'We do not send unrelated marketing to people who only asked for the free sample. Every email has a one-click unsubscribe and unsubscribing does not affect a purchase you have made.',
    },

    { kind: 'h', text: 'Who else sees it' },
    {
      kind: 'p',
      text: 'Only the service providers we need to operate: an email delivery provider, a payment gateway, and our hosting provider. Each sees only what it needs. We have no advertising partners and no data brokers. We will never sell a list.',
    },

    { kind: 'h', text: 'How long we keep it' },
    {
      kind: 'p',
      text: 'Purchase and invoice records are kept for as long as Indian tax law requires. Marketing contacts are deleted within thirty days of an unsubscribe, or on request. Support emails are kept for two years.',
    },

    { kind: 'h', text: 'Your rights' },
    {
      kind: 'p',
      text: `Write to ${site.email} and you can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. We will do it within thirty days and we will not ask you why. Deleting your contact details does not delete your invoice records, which we are legally required to keep.`,
    },

    { kind: 'h', text: 'Children' },
    {
      kind: 'p',
      text: 'CUET candidates are often under eighteen. We do not knowingly collect more than a contact address from anyone, and if you are under eighteen you should have a parent or guardian make the purchase. If a parent asks us to delete a minor\u2019s contact details, we do it immediately.',
    },

    { kind: 'h', text: 'Cookies' },
    {
      kind: 'p',
      text: 'This site stores one item in your browser: the light or dark theme you chose. It is kept locally, it is not sent to us, and it is not used to identify you. There are no advertising or tracking cookies.',
    },

    { kind: 'h', text: 'Changes' },
    {
      kind: 'p',
      text: 'If this policy changes materially we will email everyone on our list rather than quietly updating the page. The date at the top always reflects the current version.',
    },
  ],
}

export const refundPolicy: LegalDoc = {
  slug: 'refund-policy',
  title: 'Refund policy',
  eyebrow: 'Legal',
  intro:
    'Seven days from download, and reading the whole pack does not void it. The conditions are short enough to read in full.',
  updated: '2026-10-07',
  blocks: [
    { kind: 'h', text: 'The rule' },
    {
      kind: 'p',
      text: 'If you bought a pack and it was not worth the money, email us within seven days of your first download and we will refund it in full. You do not have to prove anything, justify anything, or complete a form. Having read the entire document does not disqualify you — a refund policy that expires before you can evaluate the product is not a refund policy.',
    },

    { kind: 'h', text: 'How to ask' },
    {
      kind: 'p',
      text: `Email ${site.supportEmail} from the address you used at checkout, with the order number. One line is enough. We acknowledge within ${site.responseSla} and the money is sent back to the original payment method. Banks and UPI providers typically take five to seven working days to post it.`,
    },

    { kind: 'h', text: 'What is refundable' },
    {
      kind: 'ul',
      items: [
        'Any Decode pack, single-subject pack, or bundle, in full, within seven days of first download.',
        'The unused portion of an update subscription, pro-rated to the day you cancel.',
        'A pre-order, at any time before the pack ships, in full. Pre-orders are only charged on dispatch, so in most cases there is nothing to refund.',
        'Everything, at any time, if we materially misdescribed the product.',
      ],
    },

    { kind: 'h', text: 'What is not refundable' },
    {
      kind: 'ul',
      items: [
        'Mentorship sessions that have already taken place. These are deducted at the standalone session rate and the rest of the bundle still refunds.',
        'A request made more than seven days after first download, unless we have since published a correction that materially changes the pack. In that case the window reopens for seven days from the correction date.',
        'A second refund on a repurchase of the same pack. One per pack, per person.',
      ],
    },

    { kind: 'h', text: 'Chargebacks' },
    {
      kind: 'p',
      text: 'Please email us before raising a chargeback. A chargeback costs us a fee and takes two months to resolve, whereas an email takes a day. We have never refused a refund request within the window.',
    },

    { kind: 'h', text: 'If a pack is delayed' },
    {
      kind: 'p',
      text: 'Pre-orders are charged when the pack ships, not when you order. If we miss a published ship date by more than thirty days, every pre-order is cancelled automatically and anything charged is returned without you having to ask.',
    },

    { kind: 'h', text: 'Why this policy exists' },
    {
      kind: 'p',
      text: 'We are asking students to pay for a PDF they cannot inspect before buying. The free sample exists to reduce that risk and this policy exists to remove the rest of it. If the product is good, a generous refund window costs us very little. If it is not, we would rather know.',
    },
  ],
}

export const legalDocs = [terms, privacy, refundPolicy]
