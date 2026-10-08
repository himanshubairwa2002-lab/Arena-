/** The nine components of a Decode pack, in the order they appear in the file. */
export type PackComponent = {
  id: string
  n: string
  title: string
  /** One sentence on the card. */
  summary: string
  /** Two or three sentences in the detail pane. */
  body: string
  /** Which preview component renders on the right. */
  preview: 'heatmap' | 'sources' | 'repeat' | 'notes' | 'traps' | 'calendar' | 'formula' | 'cutoff' | 'changelog'
  /** Mono spec line shown under the title in the detail pane. */
  spec: string
}

export const packComponents: PackComponent[] = [
  {
    id: 'heatmap',
    n: '01',
    title: 'Year-wise, topic-wise weightage matrix',
    summary: 'Ten to twenty years of papers as one grid you can read in thirty seconds.',
    body: 'Every subject on one axis, every year on the other, coloured by the marks it carried. Below it, the same data as a ranked table so you can sort by mean marks, by trend, or by marks-per-hour. This is the page people screenshot.',
    preview: 'heatmap',
    spec: '15 years · 1 page matrix · 1 page ranked table',
  },
  {
    id: 'sources',
    n: '02',
    title: 'Question to source mapping',
    summary: 'Which textbook, which chapter, which standard reference each question came from.',
    body: 'Questions are referenced by year and number and mapped to the chapter they came from — never reproduced. When nine questions over fifteen years trace back to the same four chapters, that is a decision you can act on and a chapter list you can hand to a junior.',
    preview: 'sources',
    spec: 'Referenced by year + Q.no · no question text reproduced',
  },
  {
    id: 'repeat',
    n: '03',
    title: 'Repeat and recycle index',
    summary: 'The questions that came back verbatim, and the ones that came back wearing a hat.',
    body: 'Three categories: identical, reworded with the same solution path, and same concept with new numbers. Each entry points at both years. The recycle rate is the single most under-used statistic in Indian exam prep.',
    preview: 'repeat',
    spec: 'Three repeat classes · cross-referenced both ways',
  },
  {
    id: 'notes',
    n: '04',
    title: 'High-yield micro-notes',
    summary: 'Forty to a hundred and twenty pages, written only for the top of the table.',
    body: 'Notes exist for the subjects the matrix says are worth the hours, and deliberately do not exist for the bottom of the table. If a micro-topic has never been asked since 2012 there is no page for it, because the point of the pack is that you do not read that page.',
    preview: 'notes',
    spec: '40–120 pages depending on paper · typed, vector, selectable',
  },
  {
    id: 'traps',
    n: '05',
    title: 'Trap analysis',
    summary: 'The distractor patterns the paper-setter reuses, written out as rules.',
    body: 'Setters have habits. Off-by-one in complexity bounds, unit switches mid-question, the option that is right for the previous year\u2019s variant. We catalogue the patterns that recur across papers so you recognise the shape of a trap before you solve into it.',
    preview: 'traps',
    spec: 'Pattern catalogue · worked counter-examples',
  },
  {
    id: 'calendar',
    n: '06',
    title: '45 / 30 / 15 / 7-day revision calendars',
    summary: 'Four calendars. Pick the one that matches the weeks you actually have.',
    body: 'Each day is a checkbox against a specific micro-topic, ordered so the highest marks-per-hour work happens first. If you fall behind — and you will — the things you drop are the ones at the bottom of the ranking, by design rather than by panic.',
    preview: 'calendar',
    spec: '4 calendars · daily checkboxes · print-ready A4',
  },
  {
    id: 'formula',
    n: '07',
    title: 'Formula, fact and one-liner sheets',
    summary: 'Wall-chart density. Printed on its own, stuck above the desk.',
    body: 'Only the formulas that have appeared in a question, with the year they appeared. No decorative identities, no derivations, no colour that costs you a cartridge. Designed to be read from across a room at 2 a.m.',
    preview: 'formula',
    spec: 'A4 · print build with backgrounds stripped',
  },
  {
    id: 'cutoff',
    n: '08',
    title: 'Cut-off and normalisation trends',
    summary: 'How many you actually need to attempt, instead of how many you fear you do.',
    body: 'Published qualifying marks and normalisation behaviour, year by year, turned into an attempt target. Knowing the general-category CS qualifying mark was 30 out of 100 in 2026 changes which questions you walk past in the hall.',
    preview: 'cutoff',
    spec: 'Official cut-offs only · category-wise where published',
  },
  {
    id: 'changelog',
    n: '09',
    title: 'Free annual update and a public changelog',
    summary: 'One cycle of updates free, every change dated and explained in public.',
    body: 'When the pattern shifts or we find a tagging error, we re-run the analysis and reissue the pack from the same link. Every edition is listed publicly with a date and a reason, including the corrections. You can read the changelog before you buy.',
    preview: 'changelog',
    spec: 'Public page · dated entries · corrections included',
  },
]
