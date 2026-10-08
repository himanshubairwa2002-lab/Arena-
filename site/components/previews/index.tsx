import type { PackComponent } from '@/content/pack'
import { aggregate, heatStep, tierCopy, tierFor } from '@/lib/heat'
import { gateCse } from '@/data/weightage'
import { HeatmapPage, SourcesPage, RepeatPage } from './pages-data'
import { NotesPage, TrapsPage, CalendarPage } from './pages-study'
import { FormulaPage, CutoffPage, ChangelogPage } from './pages-planning'

const agg = aggregate(gateCse)

export function RankedYieldPreview({ limit = 7 }: { limit?: number }) {
  return (
    <div className="divide-y divide-line">
      {agg.slice(0, limit).map((a, i) => {
        const tier = tierFor(a.share)
        return (
          <div key={a.id} className="flex items-center gap-3 py-2">
            <span className="num w-5 shrink-0 text-[0.6875rem] text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-fg">{a.name}</span>
            <span className="num shrink-0 text-[0.75rem] text-muted">{a.mean.toFixed(1)}</span>
            <span className="num hidden w-16 shrink-0 text-right text-[0.6875rem] text-faint sm:inline">
              {tierCopy[tier].label}
            </span>
            <span
              className="h-1.5 w-12 shrink-0 rounded-full sm:w-16"
              style={{ backgroundColor: `rgb(var(--c-heat-${heatStep(a.mean, agg[0].mean)}))` }}
            />
          </div>
        )
      })}
    </div>
  )
}

export const previewMap: Record<PackComponent['preview'], () => React.JSX.Element> = {
  heatmap: HeatmapPage,
  sources: SourcesPage,
  repeat: RepeatPage,
  notes: NotesPage,
  traps: TrapsPage,
  calendar: CalendarPage,
  formula: FormulaPage,
  cutoff: CutoffPage,
  changelog: ChangelogPage,
}

