import { PageFrame, Rule } from './page-frame'

export function NotesPage() {
  return (
    <PageFrame section="Chapter 4 / Micro-notes" title="Semaphores — counting vs binary" pageNo="p. 58">
      <div className="space-y-2">
        <div className="rounded border-l-2 border-heat-6 bg-heat-6/[0.07] py-1.5 pl-2.5 pr-2">
          <p className="num text-[6.5px] uppercase tracking-[0.1em] text-heat-6">Asked 7 times since 2012</p>
          <p className="mt-0.5 text-[8px] leading-relaxed text-fg">
            Every appearance has been a counting semaphore with an initial value you must derive,
            not a definition question.
          </p>
        </div>
        <div className="space-y-1">
          {[
            'wait(S): S ← S − 1; if S < 0 then block',
            'signal(S): S ← S + 1; if S ≤ 0 then wake one',
            '|S| when negative = number of blocked processes',
          ].map((l) => (
            <p key={l} className="num text-[7.5px] leading-relaxed text-muted">
              {l}
            </p>
          ))}
        </div>
        <Rule />
        <p className="text-[8px] font-medium text-fg">Where people lose the mark</p>
        <p className="text-[7.5px] leading-relaxed text-muted">
          Reading the final value of S as the number of processes in the critical section. It is
          not. Count the blocked set from the sign, not the magnitude.
        </p>
      </div>
    </PageFrame>
  )
}

export function TrapsPage() {
  const traps = [
    ['unit_switch', 'Question gives MB, options are in Mb. Seen 4 times.'],
    ['off_by_one', 'Page table entries vs page table size. Classic.'],
    ['prev_year_answer', 'One option is the correct answer to the 2019 variant.'],
    ['tightest_bound', '"Tightest" vs "an upper bound" changes the answer.'],
  ]
  return (
    <PageFrame section="Chapter 5 / Traps" title="Distractor patterns that recur" pageNo="p. 74">
      <div className="space-y-[9px]">
        {traps.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span className="num mt-px w-[84px] shrink-0 text-[7px] uppercase tracking-[0.06em] text-heat-5">
              {k}
            </span>
            <span className="text-[8px] leading-relaxed text-muted">{v}</span>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Patterns are catalogued from the published papers, with a worked counter-example for each
        so you can rehearse spotting the shape.
      </p>
    </PageFrame>
  )
}

export function CalendarPage() {
  const days = [
    ['D-45', 'Discrete + Maths', 'Logic, sets, relations', true],
    ['D-44', 'Discrete + Maths', 'Graph theory, counting', true],
    ['D-43', 'Aptitude', 'DI + numerical estimation', true],
    ['D-42', 'COA', 'Cache, memory hierarchy', false],
    ['D-41', 'COA', 'Pipelining + hazards', false],
    ['D-40', 'Networks', 'TCP, congestion control', false],
    ['D-39', 'OS', 'Scheduling + sync', false],
  ] as const
  return (
    <PageFrame section="Chapter 6 / Calendar" title="45-day plan — week 1" pageNo="p. 91">
      <div className="space-y-[5px]">
        {days.map(([d, subject, topic, done]) => (
          <div key={d} className="flex items-center gap-2 border-b border-line/50 pb-[5px]">
            <span
              className={`flex h-[9px] w-[9px] shrink-0 items-center justify-center rounded-[2px] border ${
                done ? 'border-heat-6 bg-heat-6' : 'border-line-strong'
              }`}
            >
              {done ? (
                <svg viewBox="0 0 10 10" className="h-[7px] w-[7px]">
                  <path d="M2 5.2 4 7.2 8 3" stroke="rgb(var(--c-heat-6-fg))" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              ) : null}
            </span>
            <span className="num w-[26px] shrink-0 text-[7.5px] text-faint">{d}</span>
            <span className="w-[82px] shrink-0 truncate text-[8px] font-medium text-fg">{subject}</span>
            <span className="truncate text-[7.5px] text-muted">{topic}</span>
          </div>
        ))}
      </div>
      <Rule />
      <p className="text-[7.5px] leading-relaxed text-faint">
        Ordered by marks-per-hour, highest first. Fall behind and you lose the cheap days at the
        end, by design.
      </p>
    </PageFrame>
  )
}
