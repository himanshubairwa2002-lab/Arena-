import { aggregate, heatStep, maxCellValue } from '@/lib/heat'
import { gateCse } from '@/data/weightage'
import { PageFrame, Rule } from './page-frame'

const agg = aggregate(gateCse)
const maxMarks = maxCellValue(gateCse, 'marks')

export function HeatmapPage() {
  const years = gateCse.years.slice(-10)
  const offset = gateCse.years.length - years.length
  return (
    <PageFrame section="Chapter 1 / Weightage" title="Marks by subject, 2017–2026" pageNo="p. 07">
      <div className="flex flex-col gap-[3px]">
        <div className="flex gap-[3px] pl-[72px]">
          {years.map((y) => (
            <span key={y} className="num flex-1 text-center text-[6px] text-faint">
              {String(y).slice(2)}
            </span>
          ))}
        </div>
        {gateCse.subjects.slice(0, 11).map((s) => (
          <div key={s.id} className="flex items-center gap-[3px]">
            <span className="w-[72px] shrink-0 truncate pr-1.5 text-[7.5px] text-muted">
              {s.short}
            </span>
            {years.map((y, i) => {
              const v = s.marks[offset + i]
              return (
                <span
                  key={y}
                  className="h-[11px] flex-1 rounded-[1.5px]"
                  style={{
                    backgroundColor:
                      v === null ? 'rgb(var(--c-line))' : `rgb(var(--c-heat-${heatStep(v, maxMarks)}))`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Top {4} subjects by 15-year mean: {agg.slice(0, 4).map((a) => a.short).join(', ')}.
        Combined share {agg.slice(0, 4).reduce((t, a) => t + a.share, 0).toFixed(1)}%.
      </p>
    </PageFrame>
  )
}

export function SourcesPage() {
  const rows = [
    ['2024', 'Q.41', 'os.sync.semaphores', 'Silberschatz ch.6'],
    ['2023', 'Q.18', 'os.sync.semaphores', 'Silberschatz ch.6'],
    ['2022', 'Q.52', 'os.memory.paging', 'Silberschatz ch.9'],
    ['2021', 'Q.33', 'os.sched.srtf', 'Silberschatz ch.5'],
    ['2019', 'Q.47', 'os.deadlock.banker', 'Silberschatz ch.8'],
    ['2017', 'Q.29', 'os.memory.paging', 'Silberschatz ch.9'],
  ]
  return (
    <PageFrame section="Chapter 2 / Source map" title="Operating Systems → source chapter" pageNo="p. 23">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line">
            {['Year', 'Q', 'Micro-topic', 'Source'].map((h) => (
              <th key={h} className="num py-1 text-left text-[6.5px] uppercase tracking-[0.1em] text-faint">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r[0]}${r[1]}`} className="border-b border-line/60">
              <td className="num py-[5px] text-[8px] text-muted">{r[0]}</td>
              <td className="num py-[5px] text-[8px] text-muted">{r[1]}</td>
              <td className="num py-[5px] text-[8px] text-fg">{r[2]}</td>
              <td className="py-[5px] text-[8px] text-muted">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        3 of 6 listed questions trace to two chapters. Questions referenced by number only; no
        question text or source text is reproduced.
      </p>
    </PageFrame>
  )
}

export function RepeatPage() {
  const rows: [string, string, string, string][] = [
    ['2024 Q.12', '2018 Q.09', 'identical', 'algo.greedy.huffman'],
    ['2023 Q.44', '2016 Q.51', 'reworded', 'toc.cfl.pumping'],
    ['2022 Q.31', '2013 Q.27', 'same concept', 'coa.cache.associativity'],
    ['2021 Q.08', '2015 Q.19', 'reworded', 'dbms.normal.bcnf'],
  ]
  const tone: Record<string, string> = {
    identical: 'text-heat-6',
    reworded: 'text-heat-5',
    'same concept': 'text-heat-4',
  }
  return (
    <PageFrame section="Chapter 3 / Repeats" title="Repeat and recycle index" pageNo="p. 41">
      <div className="space-y-[7px]">
        {rows.map(([a, b, cls, topic]) => (
          <div key={a} className="flex items-center gap-2 border-b border-line/60 pb-[7px]">
            <span className="num w-[52px] shrink-0 text-[8px] text-fg">{a}</span>
            <span className="text-[8px] text-faint">←</span>
            <span className="num w-[52px] shrink-0 text-[8px] text-muted">{b}</span>
            <span className={`num shrink-0 text-[6.5px] uppercase tracking-[0.08em] ${tone[cls]}`}>
              {cls}
            </span>
            <span className="num ml-auto truncate text-[7.5px] text-faint">{topic}</span>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Three classes: identical, reworded with the same solution path, and same concept with new
        numbers. Every entry cross-references both years.
      </p>
    </PageFrame>
  )
}
