import { HEAT_STEPS, metricLabels, type HeatMetric } from '@/lib/heat'

export function HeatLegend({ metric, max }: { metric: HeatMetric; max: number }) {
  const suffix = metricLabels[metric].suffix
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="eyebrow">Low</span>
      <div
        className="flex overflow-hidden rounded-sm ring-1 ring-inset ring-line"
        role="img"
        aria-label={`Colour scale from 0 to ${max.toFixed(0)}${suffix}, low to high`}
      >
        {Array.from({ length: HEAT_STEPS }, (_, i) => (
          <span
            key={i}
            className="h-2.5 w-6 sm:w-8"
            style={{ backgroundColor: `rgb(var(--c-heat-${i}))` }}
          />
        ))}
      </div>
      <span className="eyebrow">High</span>
      <span className="num ml-1 text-[0.6875rem] text-faint">
        0&ndash;{max.toFixed(0)}
        {suffix}
      </span>
    </div>
  )
}
