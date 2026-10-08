/**
 * TESTIMONIALS — INTENTIONALLY EMPTY.
 *
 * Skiplist launched in October 2026 and has not completed an exam cycle, so there
 * are no results to report. Publishing invented quotes, invented photographs or
 * invented selection statistics would make every other number on this site
 * worthless, which is the opposite of what we are selling.
 *
 * The <Testimonials /> component reads this file. While `testimonials` is empty it
 * renders an explicit "no results yet, here is why" panel. When real, verifiable,
 * consented quotes exist, add them below and the component swaps automatically.
 *
 * Rules for adding an entry:
 *   1. Written permission from the person, in writing, naming this site.
 *   2. No claimed rank or score unless we have seen the scorecard.
 *   3. `verified` is only ever set by a human who checked it.
 *   4. No stock photography. `avatar` stays undefined unless they sent us one.
 */

export type Testimonial = {
  id: string
  quote: string
  name: string
  context: string
  /** Set true only after a human has verified the claim. */
  verified: boolean
  /** Only ever a real photo the person sent us. Never stock. */
  avatar?: string
  date: string
}

export const testimonials: Testimonial[] = [
  // EXAMPLE — shape reference only. Never rendered: `examples` are filtered out
  // by the component and this array is what ships.
]

/** Shape reference for whoever adds the first real one. Not rendered anywhere. */
export const EXAMPLE_SHAPE: Testimonial = {
  id: 'example',
  quote: 'EXAMPLE ENTRY — replace with a real, consented quote before shipping.',
  name: 'EXAMPLE',
  context: 'EXAMPLE — exam, year, branch',
  verified: false,
  date: '2027-04-01',
}

export const noTestimonialsCopy = {
  heading: 'No testimonials. We have not earned any yet.',
  body: 'Skiplist went live in October 2026. The first cohort sits GATE in February 2027, so there is no honest success story to print and we are not going to stage one. Every competitor page you have open in another tab has quotes on it. Ask yourself when those people were photographed.',
  promise:
    'When a real one exists, it will carry a name, a year, and a scorecard we have actually seen. Until then this space stays empty on purpose.',
} as const
