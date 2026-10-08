export type Faq = { id: string; q: string; a: string }

export const faqs: Faq[] = [
  {
    id: 'not-notes',
    q: 'Is this just notes with a nicer cover?',
    a: 'No, and if notes are what you want, do not buy this. Notes are free everywhere in India and most of them are fine. What you are buying is a ranking: fifteen years of papers reduced to a marks-per-subject matrix, a ranked high-yield-to-skippable table, and a calendar built from that ranking. The micro-notes in the pack exist only for the subjects the data says are worth the hours. We deliberately did not write notes for the bottom of the table.',
  },
  {
    id: 'typed',
    q: 'Is it handwritten scans or properly typed?',
    a: 'Typed, set in a real typeface, with selectable text and a working table of contents. Every chart is vector, so it stays sharp when you zoom on a phone or print at A4. There are no photographs of a notebook anywhere in the pack.',
  },
  {
    id: 'updates',
    q: 'What happens if the pattern changes mid-cycle?',
    a: 'You get every update for your exam cycle free, and each one is logged in the public changelog with a date and a one-line reason. If the conducting body changes the pattern — a new paper, a syllabus revision, a session split — we re-run the analysis and reissue the pack. You download the new version from the same link.',
  },
  {
    id: 'print',
    q: 'Can I print it, and will it survive a cheap printer?',
    a: 'Yes. The pack is laid out for A4 with margins that work in a spiral binding, and there is a separate print build with the dark backgrounds stripped out so you are not burning a cartridge on a black page. The formula and one-liner sheets are designed to be printed on their own and stuck on a wall.',
  },
  {
    id: 'refund',
    q: 'What is the refund policy on a file I have already downloaded?',
    a: 'Seven days, no questions, including after you download — see the refund policy page for the exact wording. We would rather eat the occasional abuse than make you gamble ₹599 on a product you have not read. One request per person per cycle.',
  },
  {
    id: 'hindi',
    q: 'Is any of this available in Hindi?',
    a: 'The State PSC pack ships in Hindi and English in the same file, written separately in both rather than machine-translated. The GATE pack is English only, because the exam is English only and a Hindi edition would be theatre. The CUET pack is English with Hindi chapter labels for the NCERT mapping.',
  },
  {
    id: 'telegram-pdfs',
    q: 'Why pay when free PYQ PDFs are all over Telegram?',
    a: 'Because a folder of fifteen question papers is not analysis, it is homework. The work we are charging for is the part you would otherwise do yourself: tagging every question to a micro-topic, counting marks per subject per year, spotting the repeats, and turning the result into a calendar. If you have forty spare hours, do it yourself — the sources are public and we list them. The pack costs less than one day of those hours.',
  },
  {
    id: 'guarantee',
    q: 'Will this guarantee me a rank or a seat?',
    a: 'No. Nothing can, and anyone telling you otherwise is selling something worse than we are. In GATE 2026, 7,97,434 people sat the paper and 1,56,318 qualified. Prioritisation improves the odds of those numbers landing your way. It does not decide them. We will never put a selection figure on this site.',
  },
  {
    id: 'branch',
    q: 'Do I need a separate pack for each branch or paper?',
    a: 'Yes, and that is deliberate. A CSE weightage matrix is useless to a Civil candidate, so the Core Decode covers one paper properly rather than four papers vaguely. If you are attempting two papers, the full bundle is cheaper than two singles.',
  },
  {
    id: 'devices',
    q: 'How does it get to me, and on what device?',
    a: 'PDF, downloaded straight after payment from the confirmation page and from an email link that stays live for the whole cycle. Nothing ships. No app, no login, no reader that stops working when we do. Roughly 30–50 MB depending on the pack, which downloads on a weak connection.',
  },
  {
    id: 'support',
    q: 'If something is wrong, who actually answers?',
    a: 'WhatsApp for anything about your order, Telegram for questions about the data itself, and both are answered by the people who built the pack. If you find a tagging error, tell us — corrections ship in the next changelog entry and you get the update free.',
  },
  {
    id: 'preorder-charge',
    q: 'If I pre-order, when do you actually take the money?',
    a: 'When the pack ships, not today. A pre-order records your price and your place; the charge happens on the day the file is ready to download. If we miss the window, you are not out of pocket and you can walk away.',
  },
  {
    id: 'cuet-subjects',
    q: 'Which CUET subjects does this cover?',
    a: 'Domain subjects only. The first edition targets the eight highest-registration domain papers. The General Aptitude Test is not covered — it is a different paper with different logic, and we would rather leave it out than half-build it.',
  },
  {
    id: 'parents',
    q: 'I am a parent. What am I actually paying for?',
    a: 'A document that tells your child which chapters are worth the remaining weeks and which are not, based on what was actually asked in the last five CUET papers. It is not a course, it does not replace school, and it does not need supervision. It is one PDF and a wall chart. Nothing auto-renews.',
  },
  {
    id: 'psc-launch',
    q: 'When does the State PSC pack actually launch?',
    a: 'We will not give you a date we cannot hold. The state-GS tagging is in progress and the pack goes on sale when the matrix is finished, not before. Joining the list gets you the launch price and an email on the day — nothing else.',
  },
  {
    id: 'free-catch',
    q: 'The heat map is free. What is the catch?',
    a: 'There is no email wall and no watermark. The catch, if you want to call it one, is that the grid is the cheapest chapter to produce and the most persuasive one to show you. It took us a week. The micro-topic tagging behind the other eight chapters took considerably longer, and that is what the pack costs money for. If the free chart is all you needed, take it and go.',
  },
  {
    id: 'data-source',
    q: 'Where does the weightage data come from, exactly?',
    a: 'The subject-by-year mark distribution is built on published paper analysis of the 2012–2026 GATE papers from ACE Engineering Academy, which is the only source we found that publishes a consistent fifteen-year table for every branch rather than a one-off per-year post. Candidate counts and cut-offs come from the official GATE 2026 statistical report released by IIT Guwahati. Both are linked at the bottom of this page. Where a published column does not sum to 100 — CS 2024 sums to 98 — we show the real total rather than padding it.',
  },
]

export const faqById: Record<string, Faq> = Object.fromEntries(faqs.map((f) => [f.id, f]))

/** The ten objections shown on the home page, in order. */
export const homeFaqIds = [
  'not-notes',
  'telegram-pdfs',
  'guarantee',
  'typed',
  'updates',
  'print',
  'refund',
  'hindi',
  'branch',
  'devices',
]
