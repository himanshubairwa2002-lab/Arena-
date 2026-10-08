/**
 * Every long-form string on the site lives here or in a sibling content file.
 * Voice: blunt, numerate, slightly contrarian. Short sentences. No hype, no
 * exclamation marks, no promise of selection, no adjectives where a number works.
 */

/**
 * Eight tagline candidates written for this brand. #1 is the hero line; the rest
 * are used as section headers so the whole page carries one argument.
 * Full reasoning in DECISIONS.md.
 */
export const taglines = {
  hero: 'Know what to skip.',
  heatmap: 'The syllabus is a list. We built the skip list.',
  problem: 'Stop studying everything.',
  pack: 'Fifteen years of papers. One revision plan.',
  howItWorks: 'Study the 20%. Walk in like you studied all of it.',
  products: 'Every topic costs you a week. Only some pay you back.',
  trust: 'The syllabus is a promise. The papers are the evidence.',
  pricing: 'Cut the syllabus with data, not vibes.',
} as const

export const hero = {
  eyebrow: 'PYQ analytics for Indian competitive exams',
  headline: taglines.hero,
  sub: 'We read every GATE, CUET and State PSC paper from the last fifteen years and worked out which subjects actually carry the marks. You study those. You delete the rest and stop feeling guilty about it.',
  primaryCta: 'Get GATE 2027 Decode',
  secondaryCta: 'See the free weightage map',
  countdownLabel: 'GATE 2027, day one',
} as const

export const problem = {
  eyebrow: 'The maths nobody does',
  heading: taglines.problem,
  sub: 'Three numbers that decide your score before you open a book.',
  cards: [
    {
      stat: '12',
      unit: 'subjects',
      title: 'The GATE CS syllabus is twelve subjects wide.',
      body: 'Each one has a textbook behind it, a lecture series in front of it, and a Telegram group telling you it is the most important one. All twelve cannot be the most important one.',
    },
    {
      stat: null,
      unit: 'weeks left',
      title: 'You have this many weeks until paper day.',
      body: 'Not months. Weeks. Count the ones you will lose to college, to internals, to a week of fever, to the three days after a bad mock. Then count again.',
    },
    {
      stat: '0',
      unit: 'people',
      title: 'Nobody will tell you what to cut.',
      body: 'Your coaching sells hours, so it sells you all twelve. Your seniors cut topics but will not admit which. The decision gets made anyway, in week fourteen, by panic.',
    },
  ],
} as const

export const howItWorks = {
  eyebrow: 'Three steps',
  heading: taglines.howItWorks,
  sub: 'No course. No live classes. No app to open every morning. A file, a plan, and a deadline.',
  steps: [
    {
      n: '01',
      title: 'Pick your exam and paper',
      body: 'GATE by branch, CUET by domain subject, State PSC by commission. One pack covers one paper properly instead of four papers vaguely.',
    },
    {
      n: '02',
      title: 'Read the data before you read a book',
      body: 'Open the weightage matrix. Find your four core subjects, your four moderate ones, and the tail you are allowed to drop. Write the dropped list down. Tell someone.',
    },
    {
      n: '03',
      title: 'Run the 45, 30, 15 or 7-day calendar',
      body: 'Pick the calendar that matches the weeks you actually have left. Tick boxes. The calendar front-loads the subjects with the highest marks-per-hour and schedules the tail last, so if you run out of time you lose the cheap marks, not the expensive ones.',
    },
  ],
} as const

export const trust = {
  eyebrow: 'Why trust the data',
  heading: taglines.trust,
  sub: 'We launched this month. There are no success stories yet, and we are not going to invent any. Here is what you can check instead.',
} as const

export const finalCta = {
  heading: 'The paper is on 6 February 2027.',
  sub: 'The syllabus will not get shorter between now and then. The only variable left is what you choose not to study.',
  emailLabel: 'Email or WhatsApp number',
  button: 'Send me the free weightage map',
  reassurance: 'One email with the map and the 12-page sample. No drip sequence, no spam.',
} as const

export const notFound = {
  code: '404',
  heading: 'This page was not in the syllabus.',
  body: 'It has also never appeared in a previous paper, which by our own methodology means you are allowed to skip it.',
  cta: 'Go back to something that carries marks',
} as const
