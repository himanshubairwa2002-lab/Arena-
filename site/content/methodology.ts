export const schemaColumns = [
  { name: 'year', type: 'int', example: '2024', note: 'Paper year. Two-session years carry a session suffix.' },
  { name: 'q_no', type: 'int', example: '41', note: 'Question number as printed on the official paper.' },
  { name: 'marks', type: 'int', example: '2', note: '1 or 2 for GATE. Drives every weight in the matrix.' },
  { name: 'subject', type: 'enum', example: 'operating_systems', note: 'Top-level syllabus subject. Closed set per paper.' },
  { name: 'micro_topic', type: 'enum', example: 'os.sync.semaphores', note: 'Leaf node in the ontology. Dotted path, max depth 4.' },
  { name: 'source', type: 'text', example: 'Silberschatz ch.6', note: 'Chapter-level reference. Never the text itself.' },
  { name: 'difficulty', type: 'enum', example: 'medium', note: 'easy | medium | hard. Two taggers, disagreements resolved.' },
  { name: 'q_type', type: 'enum', example: 'NAT', note: 'MCQ | MSQ | NAT. NAT has no negative marking, which changes strategy.' },
  { name: 'repeat_of', type: 'ref?', example: '2017:Q38', note: 'Null, or a pointer to the earlier question it recycles.' },
  { name: 'repeat_class', type: 'enum?', example: 'reworded', note: 'identical | reworded | same_concept.' },
  { name: 'trap', type: 'enum?', example: 'unit_switch', note: 'Distractor pattern, where one is present.' },
] as const

export const methodSteps = [
  {
    n: '01',
    title: 'Collect the official papers, not reconstructions',
    body: 'Every paper comes from the conducting body or its archive. Memory-based reconstructions floating around Telegram are excluded entirely — a wrong question in the corpus poisons every number downstream of it.',
  },
  {
    n: '02',
    title: 'Build the ontology before tagging anything',
    body: 'A micro-topic ontology is a closed, versioned tree. "Graphs" is not a micro-topic; `algo.graphs.mst.kruskal` is. Depth is capped at four so the leaves stay countable, and the tree is frozen before a single question is tagged so the categories cannot be bent to fit the data.',
  },
  {
    n: '03',
    title: 'Tag twice, independently',
    body: 'Two people tag the same paper without seeing each other\u2019s output. Agreement is measured. Where they disagree, a third pass resolves it and the disagreement is logged — a micro-topic that two careful people classify differently is usually a sign the ontology is wrong, not the tagger.',
  },
  {
    n: '04',
    title: 'Aggregate, and publish the aggregation rule',
    body: 'Marks per subject per year is a sum, not a judgement. Mean marks is the arithmetic mean over listed years. Trend is a least-squares slope in marks per year. The rules are written down here so you can disagree with them precisely instead of vaguely.',
  },
  {
    n: '05',
    title: 'Convert the ranking into a calendar, not advice',
    body: 'A ranking only helps if it changes what you do on Tuesday. The calendars sequence micro-topics by marks-per-hour so the cheap marks land first, and the tail is scheduled last on purpose — if you run out of time, you lose what you could afford to lose.',
  },
  {
    n: '06',
    title: 'Show the gaps instead of smoothing them',
    body: 'Published analyses are not always internally consistent. The GATE CS column for 2024 sums to 98, not 100, in our source. We did not pad it. The chart shows the accounted total for every year and computes percentages from that, because a visible two-mark gap is more useful than an invisible fudge.',
  },
] as const

export const methodologyCopy = {
  eyebrow: 'Methodology',
  heading: 'How fifteen years of question papers become one ranked list.',
  sub: 'Every coaching brand in India claims to have analysed the previous years. Almost none of them will show you the schema. Here is ours, including the parts that are unfinished.',
  honesty: {
    heading: 'What this method cannot do',
    points: [
      'It cannot predict a specific question. Nothing can, and a distribution is not a prophecy.',
      'It cannot protect you from an outlier paper. Roughly one paper in ten breaks its own trend by eight to ten marks — that risk is why the pack still covers the mid-weight subjects.',
      'It cannot tell you how fast you personally read. Marks-per-hour in the calendar is a planning average, not a measurement of you.',
      'It cannot replace solving papers. The matrix tells you where to spend the hours. It does not spend them.',
    ],
  },
} as const
