import type { SyllabusCoverageRow } from '@/data/exams'

const tone: Record<SyllabusCoverageRow['covered'], { label: string; cls: string }> = {
  full: { label: 'Full', cls: 'bg-heat-6 text-[rgb(var(--c-heat-6-fg))]' },
  'high-yield': { label: 'High-yield only', cls: 'bg-heat-3 text-[rgb(var(--c-heat-3-fg))]' },
  skip: { label: 'Skipped', cls: 'bg-line text-faint' },
}

/** Says out loud what the pack does not cover. That row is the credible one. */
export function CoverageTable({ rows }: { rows: SyllabusCoverageRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-canvas">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">Syllabus coverage, including what is deliberately excluded</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="eyebrow px-5 py-3 font-medium">
              Syllabus area
            </th>
            <th scope="col" className="eyebrow w-[140px] px-3 py-3 font-medium">
              Coverage
            </th>
            <th scope="col" className="eyebrow px-5 py-3 font-medium">
              What that means
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.area} className="border-b border-line/60 last:border-0">
              <th scope="row" className="px-5 py-3.5 text-[0.875rem] font-normal text-fg">
                {r.area}
              </th>
              <td className="px-3 py-3.5 align-top">
                <span
                  className={`num inline-block rounded px-2 py-1 text-[0.625rem] uppercase tracking-[0.06em] ${tone[r.covered].cls}`}
                >
                  {tone[r.covered].label}
                </span>
              </td>
              <td className="px-5 py-3.5 text-[0.8125rem] leading-relaxed text-muted">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
