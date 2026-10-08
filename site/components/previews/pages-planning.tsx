import { heatStep } from '@/lib/heat'
import { stats } from '@/data/sources'
import { PageFrame, Rule } from './page-frame'

export function FormulaPage() {
  const rows = [
    ['Cache hit time', 'T = h·Tc + (1−h)·Tm', '2026, 2022, 2017'],
    ['Amdahl speedup', 'S = 1 / ((1−p) + p/n)', '2024, 2019'],
    ['Little\u2019s law', 'L = λ·W', '2025, 2021, 2014'],
    ['Master theorem', 'T(n)=aT(n/b)+f(n)', '2026, 2023, 2020'],
    ['Effective access', 'EAT = (1−p)·ma + p·pf', '2023, 2018'],
  ]
  return (
    <PageFrame section="Appendix A / Sheet" title="Formula sheet — print at A4" pageNo="p. 112">
      <div className="space-y-[7px]">
        {rows.map(([name, f, years]) => (
          <div key={name} className="flex items-baseline gap-2 border-b border-line/50 pb-[7px]">
            <span className="w-[80px] shrink-0 text-[7.5px] text-muted">{name}</span>
            <span className="num flex-1 text-[8.5px] text-fg">{f}</span>
            <span className="num shrink-0 text-[6.5px] text-faint">{years}</span>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Only formulas that have appeared in a question, each tagged with the years it appeared.
        Printed with backgrounds stripped so it costs one page of toner.
      </p>
    </PageFrame>
  )
}

export function CutoffPage() {
  const bars: [string, number, number][] = [
    ['CS', 30.0, Number(stats.gateCsCutoff2026.value)],
    ['CE', 28.7, Number(stats.gateCeCutoff2026.value)],
    ['EC', 26.4, Number(stats.gateEcCutoff2026.value)],
    ['ME', 25.2, Number(stats.gateMeCutoff2026.value)],
  ]
  return (
    <PageFrame section="Chapter 8 / Cut-offs" title="GATE 2026 general-category qualifying marks" pageNo="p. 103">
      <div className="space-y-2.5">
        {bars.map(([code, v]) => (
          <div key={code} className="flex items-center gap-2">
            <span className="num w-[22px] shrink-0 text-[8px] text-muted">{code}</span>
            <div className="h-[13px] flex-1 overflow-hidden rounded-[2px] bg-line">
              <div
                className="flex h-full items-center justify-end rounded-[2px] pr-1.5"
                style={{ width: `${v}%`, backgroundColor: `rgb(var(--c-heat-${heatStep(v, 40)}))` }}
              >
                <span className="num text-[7px]" style={{ color: `rgb(var(--c-heat-${heatStep(v, 40)}-fg))` }}>
                  {v.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Out of 100. Source: GATE 2026 statistical report, IIT Guwahati. The chapter turns these
        into an attempt target per section.
      </p>
    </PageFrame>
  )
}

export function ChangelogPage() {
  const entries = [
    ['2027.1', '07 Oct 2026', 'shipped', 'Matrix extended to the 2026 paper, all four branches'],
    ['2027.2', '15 Nov 2026', 'planned', 'Micro-topic ontology published for CSE'],
    ['2027.3', '10 Jan 2027', 'planned', 'Cut-off chapter refreshed with official 2026 figures'],
  ]
  return (
    <PageFrame section="Public / Changelog" title="Every edition, dated" pageNo="web">
      <div className="space-y-2.5">
        {entries.map(([v, d, status, text]) => (
          <div key={v} className="border-b border-line/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="num text-[8px] font-medium text-fg">{v}</span>
              <span className="num text-[7px] text-faint">{d}</span>
              <span
                className={`num ml-auto text-[6.5px] uppercase tracking-[0.08em] ${
                  status === 'shipped' ? 'text-heat-6' : 'text-faint'
                }`}
              >
                {status}
              </span>
            </div>
            <p className="mt-1 text-[7.5px] leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Corrections are listed here too. If we get a tagging wrong, the fix ships with a reason.
      </p>
    </PageFrame>
  )
}
