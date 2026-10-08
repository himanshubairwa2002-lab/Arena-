'use client'

import * as React from 'react'
import type { WeightageDataset } from '@/data/weightage/types'
import { WeightageHeatmap } from './weightage-heatmap'
import { HeatCallouts } from './heat-callouts'

/** Keeps the derived callouts in sync with whichever branch is on screen. */
export function HeatmapWithCallouts({
  datasets,
  initialId,
}: {
  datasets: WeightageDataset[]
  initialId?: string
}) {
  const [dsId, setDsId] = React.useState(initialId ?? datasets[0].id)
  const ds = datasets.find((d) => d.id === dsId) ?? datasets[0]

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
      <div className="min-w-0 rounded-xl border border-line bg-surface p-4 sm:p-5">
        <WeightageHeatmap datasets={datasets} datasetId={dsId} onDatasetChange={setDsId} />
      </div>
      <div className="lg:pt-1">
        <p className="eyebrow mb-3">Derived from the grid &mdash; {ds.short}</p>
        <HeatCallouts ds={ds} />
        <p className="mt-4 text-[0.75rem] leading-relaxed text-faint">
          Every line above is computed from the dataset, not written by hand. Change the branch and
          the callouts recompute from that paper&rsquo;s {ds.years.length}-year distribution.
        </p>
      </div>
    </div>
  )
}
