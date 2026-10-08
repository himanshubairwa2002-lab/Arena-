import { sourceFor, sources, type SourceId, type SourcedStat } from '@/data/sources'

/** A number with its citation welded on. Never render a statistic without one. */
export function Stat({ stat, className }: { stat: SourcedStat; className?: string }) {
  const src = sourceFor(stat)
  return (
    <div className={className}>
      <p className="num text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-fg">
        {stat.approx ? '~' : ''}
        {stat.display}
        {stat.unit ? <span className="ml-1 text-[0.875rem] text-muted">{stat.unit}</span> : null}
      </p>
      <p className="mt-2 text-[0.8125rem] leading-snug text-muted text-pretty">{stat.label}</p>
      <a
        href={src.url}
        target="_blank"
        rel="noopener noreferrer"
        className="num mt-1.5 inline-block text-[0.625rem] leading-tight text-faint underline underline-offset-2 decoration-line-strong transition-colors hover:text-muted"
      >
        {src.publisher}
        {stat.asOf ? ` \u00B7 ${stat.asOf}` : ''}
      </a>
    </div>
  )
}

export function StatGrid({ stats: list, cols = 3 }: { stats: SourcedStat[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols]
  return (
    <dl className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${grid}`}>
      {list.map((s) => (
        <div key={s.label} className="bg-surface p-5">
          <Stat stat={s} />
        </div>
      ))}
    </dl>
  )
}

/** The "where this came from" block that closes a data-heavy page. */
export function SourceList({ ids, heading = 'Sources' }: { ids: SourceId[]; heading?: string }) {
  return (
    <section aria-labelledby="sources-heading" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <h2 id="sources-heading" className="eyebrow">
        {heading}
      </h2>
      <ol className="mt-4 space-y-3">
        {ids.map((id, i) => {
          const s = sources[id]
          return (
            <li key={id} className="flex gap-3">
              <span className="num mt-px shrink-0 text-[0.6875rem] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-fg underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-accent"
                >
                  {s.label}
                </a>
                <p className="num mt-0.5 text-[0.6875rem] text-faint">
                  {s.publisher} &middot; retrieved {s.retrieved}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="mt-5 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-faint">
        Every figure on this page traces to one of the entries above or is computed from the
        datasets in this repository. If you find one that does not, tell us and we will fix it in
        the changelog.
      </p>
    </section>
  )
}
