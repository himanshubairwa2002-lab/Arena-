import type { WeightageDataset } from '@/data/weightage/types'
import { callouts, cellValue, heatStep, maxCellValue, metricLabels, type HeatMetric } from '@/lib/heat'
import { sources } from '@/data/sources'

/** Palette baked into the export so the PNG looks identical for every reader. */
const EXPORT = {
  bg: '#07080B',
  panel: '#0B0D12',
  fg: '#F2F4F8',
  muted: '#9AA2B1',
  faint: '#6E7686',
  line: '#1C212B',
  accent: '#4D7AFF',
  heat: ['#221049', '#40147E', '#6B1C80', '#982D80', '#C83E73', '#ED6925', '#FBA40A'],
  heatFg: ['#C4BAE0', '#ECE2FC', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#1C0A02', '#261400'],
}

const SANS = '"Inter Tight", Inter, system-ui, sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

/**
 * Renders a branded PNG of the chart on a canvas. Deliberately not a screenshot
 * of the DOM: the export has its own layout, a header, the derived callout and a
 * source footer, because this file travels on WhatsApp without the page.
 */
export function downloadChartPng(ds: WeightageDataset, metric: HeatMetric): void {
  const dpr = 2
  const W = 1200
  const padX = 56
  const headerH = 150
  const labelW = 190
  const rowH = 34
  const gridTop = headerH + 34
  const rows = ds.subjects.length
  const cols = ds.years.length
  const colW = Math.floor((W - padX * 2 - labelW) / cols)
  const gridW = colW * cols
  const gridH = rowH * rows
  const footerH = 128
  const H = gridTop + gridH + footerH

  const canvas = document.createElement('canvas')
  canvas.width = W * dpr
  canvas.height = H * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)

  const max = maxCellValue(ds, metric)
  const c = callouts(ds)
  const suffix = metricLabels[metric].suffix

  // Background + faint graph paper
  ctx.fillStyle = EXPORT.bg
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgba(255,255,255,0.035)'
  ctx.lineWidth = 1
  for (let x = 0; x < W; x += 56) {
    ctx.beginPath()
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, H)
    ctx.stroke()
  }
  for (let y = 0; y < H; y += 56) {
    ctx.beginPath()
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(W, y + 0.5)
    ctx.stroke()
  }

  // Logo glyph: the same descending bars as the site mark
  const gx = padX
  const gy = 44
  const bars: [number, string, boolean][] = [
    [26, EXPORT.heat[6], true],
    [18, EXPORT.heat[5], true],
    [11, EXPORT.heat[3], false],
    [6, EXPORT.heat[2], false],
  ]
  bars.forEach(([w, color, solid], i) => {
    const y = gy + i * 7
    if (solid) {
      ctx.fillStyle = color
      ctx.fillRect(gx, y, w, 5)
    } else {
      ctx.strokeStyle = color
      ctx.lineWidth = 1.25
      ctx.strokeRect(gx + 0.5, y + 0.5, w, 4)
    }
  })

  ctx.fillStyle = EXPORT.fg
  ctx.font = `600 19px ${SANS}`
  ctx.fillText('skiplist', gx + 40, gy + 19)
  ctx.fillStyle = EXPORT.faint
  ctx.font = `400 12px ${MONO}`
  ctx.fillText('skiplist.in', gx + 40, gy + 34)

  // Title block
  ctx.fillStyle = EXPORT.fg
  ctx.font = `600 30px ${SANS}`
  ctx.fillText(`GATE ${ds.label} \u2014 ${metricLabels[metric].label.toLowerCase()} by subject`, padX, gy + 76)
  ctx.fillStyle = EXPORT.muted
  ctx.font = `400 14px ${SANS}`
  ctx.fillText(
    `${ds.years[0]}\u2013${ds.years[ds.years.length - 1]} papers \u00B7 ${rows} subjects \u00B7 paper code ${ds.paperCode}`,
    padX,
    gy + 98,
  )

  // Year axis
  ctx.textAlign = 'center'
  ctx.fillStyle = EXPORT.faint
  ctx.font = `400 11px ${MONO}`
  ds.years.forEach((y, i) => {
    ctx.fillText(String(y), padX + labelW + i * colW + colW / 2, gridTop - 10)
  })

  // Rows
  ctx.textAlign = 'left'
  ds.subjects.forEach((s, r) => {
    const y = gridTop + r * rowH
    ctx.fillStyle = EXPORT.muted
    ctx.font = `400 12.5px ${SANS}`
    const label = s.short.length > 22 ? `${s.short.slice(0, 21)}\u2026` : s.short
    ctx.fillText(label, padX, y + rowH / 2 + 4)

    ds.years.forEach((_, col) => {
      const v = cellValue(ds, s, col, metric)
      const x = padX + labelW + col * colW
      if (v === null) {
        ctx.fillStyle = EXPORT.line
        roundRect(ctx, x + 1.5, y + 1.5, colW - 3, rowH - 3, 3)
        ctx.fill()
        return
      }
      const step = heatStep(v, max)
      ctx.fillStyle = EXPORT.heat[step]
      roundRect(ctx, x + 1.5, y + 1.5, colW - 3, rowH - 3, 3)
      ctx.fill()
      ctx.fillStyle = EXPORT.heatFg[step]
      ctx.font = `400 11px ${MONO}`
      ctx.textAlign = 'center'
      ctx.fillText(
        metric === 'marks' ? String(v) : v.toFixed(0),
        x + colW / 2,
        y + rowH / 2 + 4,
      )
      ctx.textAlign = 'left'
    })
  })

  // Derived callout strip
  const fy = gridTop + gridH + 30
  ctx.fillStyle = EXPORT.panel
  roundRect(ctx, padX, fy, W - padX * 2, 52, 8)
  ctx.fill()
  ctx.strokeStyle = EXPORT.line
  ctx.lineWidth = 1
  roundRect(ctx, padX + 0.5, fy + 0.5, W - padX * 2 - 1, 51, 8)
  ctx.stroke()

  ctx.fillStyle = EXPORT.fg
  ctx.font = `600 14px ${SANS}`
  ctx.fillText(
    `Top ${c.topCount} subjects = ${c.topShare.toFixed(0)}% of the paper.`,
    padX + 18,
    fy + 22,
  )
  ctx.fillStyle = EXPORT.muted
  ctx.font = `400 12.5px ${SANS}`
  ctx.fillText(
    `Bottom ${c.tailCount} = ${c.tailShare.toFixed(1)}%: ${c.tailNames.join(', ')}.`,
    padX + 18,
    fy + 40,
  )

  // Legend
  const lx = W - padX - 7 * 22 - 86
  ctx.fillStyle = EXPORT.faint
  ctx.font = `400 10px ${MONO}`
  ctx.fillText('LOW', lx - 30, fy + 29)
  EXPORT.heat.forEach((col, i) => {
    ctx.fillStyle = col
    ctx.fillRect(lx + i * 22, fy + 20, 20, 10)
  })
  ctx.fillStyle = EXPORT.faint
  ctx.fillText('HIGH', lx + 7 * 22 + 6, fy + 29)

  // Source footer
  ctx.fillStyle = EXPORT.faint
  ctx.font = `400 11px ${SANS}`
  ctx.fillText(
    `Source: ${sources[ds.sourceId].label}, ${sources[ds.sourceId].publisher}. Values ${suffix ? 'in ' + metricLabels[metric].label.toLowerCase() : 'in marks'}.`,
    padX,
    fy + 78,
  )
  ctx.fillStyle = EXPORT.accent
  ctx.font = `500 11px ${MONO}`
  ctx.fillText('Full interactive chart: skiplist.in/free/weightage-map', padX, fy + 95)

  const a = document.createElement('a')
  a.download = `skiplist-${ds.id}-${metric}-${ds.years[0]}-${ds.years[ds.years.length - 1]}.png`
  a.href = canvas.toDataURL('image/png')
  a.click()
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
