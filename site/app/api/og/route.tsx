import { ImageResponse } from 'next/og'
import { gateCse } from '@/data/weightage'
import { heatStep, maxCellValue } from '@/lib/heat'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

/**
 * Dynamic OG card. Every variant renders the real GATE CSE distribution as a
 * strip, so the share image is a data visualisation rather than a gradient.
 *
 * Fonts are not loaded here on purpose: satori falls back to a system sans, and
 * the sandbox cannot reach a font CDN. The layout is designed to survive that.
 */

const HEAT = [
  'rgb(34,16,73)',
  'rgb(64,20,126)',
  'rgb(107,28,128)',
  'rgb(152,45,128)',
  'rgb(200,62,115)',
  'rgb(237,105,37)',
  'rgb(251,164,10)',
]

const BG = 'rgb(7,8,11)'
const PANEL = 'rgb(11,13,18)'
const FG = 'rgb(242,244,248)'
const MUTED = 'rgb(154,162,177)'
const FAINT = 'rgb(110,118,134)'
const LINE = 'rgb(28,33,43)'
const ACCENT = 'rgb(77,122,255)'

const years = gateCse.years.slice(-12)
const offset = gateCse.years.length - years.length
const maxMarks = maxCellValue(gateCse, 'marks')
const rows = gateCse.subjects.slice(0, 7)

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const heading = (searchParams.get('heading') ?? 'Know what to skip.').slice(0, 90)
  const kicker = (searchParams.get('kicker') ?? 'Skiplist').slice(0, 48)
  const stat = searchParams.get('stat')?.slice(0, 16) ?? null
  const statLabel = searchParams.get('statLabel')?.slice(0, 60) ?? null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: BG,
          padding: 56,
          position: 'relative',
        }}
      >
        {/* graph-paper background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            opacity: 0.55,
            display: 'flex',
          }}
        />

        {/* wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {[HEAT[6], HEAT[5], HEAT[3], HEAT[1]].map((c, i) => (
              <div key={i} style={{ width: 14, height: 14, background: c, borderRadius: 2, display: 'flex' }} />
            ))}
          </div>
          <div style={{ fontSize: 26, color: FG, letterSpacing: -0.6, fontWeight: 600, display: 'flex' }}>
            skiplist
          </div>
          <div style={{ fontSize: 18, color: FAINT, marginLeft: 6, display: 'flex' }}>
            {kicker}
          </div>
        </div>

        {/* headline — sized so two lines always clear the panel below */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            fontSize: heading.length > 54 ? 46 : heading.length > 34 ? 56 : 68,
            lineHeight: 1.06,
            color: FG,
            letterSpacing: -1.8,
            fontWeight: 600,
            marginTop: 26,
            marginBottom: 22,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>

        {/* data strip */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: PANEL,
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: 18,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 14, color: FAINT, letterSpacing: 1.2, display: 'flex' }}>
              GATE CSE &middot; MARKS BY SUBJECT &middot; {years[0]}&ndash;{years[years.length - 1]}
            </div>
            {stat ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontSize: 28, color: ACCENT, fontWeight: 600, display: 'flex' }}>
                  {stat}
                </div>
                {statLabel ? (
                  <div style={{ fontSize: 14, color: MUTED, display: 'flex' }}>{statLabel}</div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {rows.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div
                  style={{
                    width: 160,
                    fontSize: 13,
                    color: MUTED,
                    display: 'flex',
                    overflow: 'hidden',
                  }}
                >
                  {s.short}
                </div>
                {years.map((y, i) => {
                  const v = s.marks[offset + i]
                  return (
                    <div
                      key={y}
                      style={{
                        display: 'flex',
                        flex: 1,
                        height: 20,
                        borderRadius: 3,
                        background: v === null ? LINE : HEAT[heatStep(v, maxMarks)],
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 16,
            fontSize: 15,
            color: FAINT,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex' }}>
            Based on published 2012&ndash;2026 paper analysis
          </div>
          <div style={{ display: 'flex', color: MUTED }}>skiplist.in</div>
        </div>
      </div>
    ),
    size,
  )
}
