import { ArrowDownRight, ArrowUpRight, Scissors, Target } from 'lucide-react'
import type { WeightageDataset } from '@/data/weightage/types'
import { aggregate, callouts } from '@/lib/heat'

/**
 * Every line here is computed from data/weightage at render time. Change a number
 * in the dataset and this copy changes with it. Nothing is written by hand.
 */
export function HeatCallouts({ ds }: { ds: WeightageDataset }) {
  const c = callouts(ds)
  const agg = aggregate(ds)
  const nonTechnical = agg.filter(
    (a) => a.id === 'general-aptitude' || a.id === 'eng-maths' || a.id === 'discrete-eng-maths' || a.id === 'maths-aptitude',
  )
  const nonTechShare = nonTechnical.reduce((sum, a) => sum + a.share, 0)
  const years = `${ds.years[0]}\u2013${ds.years[ds.years.length - 1]}`

  const items = [
    {
      icon: Target,
      tone: 'text-heat-6',
      head: `These ${c.topCount} subjects are ${c.topShare.toFixed(0)}% of the paper.`,
      body: `${c.topNames.join(' \u00B7 ')}. Averaged across every ${ds.paperCode} paper from ${years}.`,
    },
    {
      icon: Scissors,
      tone: 'text-heat-2',
      head: `These ${c.tailCount} are ${c.tailShare.toFixed(1)}%. Consider dropping them.`,
      body: `${c.tailNames.join(' \u00B7 ')}. Worth a formula sheet and a PYQ set, not a textbook.`,
    },
    nonTechnical.length
      ? {
          icon: ArrowUpRight,
          tone: 'text-accent',
          head: `Maths and Aptitude are ${nonTechShare.toFixed(0)}% on their own.`,
          body: `${nonTechnical.map((n) => n.short).join(' + ')}. The block with the most fixed, most predictable marks on the whole paper.`,
        }
      : null,
    c.rising && c.rising.trend > 0.08
      ? {
          icon: ArrowUpRight,
          tone: 'text-heat-5',
          head: `${c.rising.short} is trending up: ${c.rising.trend > 0 ? '+' : ''}${c.rising.trend.toFixed(2)} marks a year.`,
          body: `Mean ${c.rising.mean.toFixed(1)} marks, range ${c.rising.min}\u2013${c.rising.max} across ${c.rising.yearsCounted} papers. Least-squares slope over ${years}.`,
        }
      : null,
    c.falling && c.falling.trend < -0.08
      ? {
          icon: ArrowDownRight,
          tone: 'text-heat-3',
          head: `${c.falling.short} is trending down: ${c.falling.trend.toFixed(2)} marks a year.`,
          body: `Mean ${c.falling.mean.toFixed(1)} marks, range ${c.falling.min}\u2013${c.falling.max}. Still on the paper, just worth less than it used to be.`,
        }
      : null,
  ].filter((x): x is { icon: typeof Target; tone: string; head: string; body: string } => x !== null)

  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
      {items.slice(0, 4).map((item) => (
        <li key={item.head} className="bg-surface p-4">
          <div className="flex gap-3">
            <item.icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.tone}`} aria-hidden />
            <div className="min-w-0">
              <p className="text-[0.875rem] font-medium leading-snug text-fg text-pretty">{item.head}</p>
              <p className="num mt-1 text-[0.75rem] leading-relaxed text-faint text-pretty">{item.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
