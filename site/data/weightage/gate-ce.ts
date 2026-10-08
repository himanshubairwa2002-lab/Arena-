import type { WeightageDataset } from './types'

const YEARS = [
  2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
]

/**
 * GATE Civil Engineering — marks per subject per paper, 2012–2026.
 * Subject rows transcribed verbatim from ACE Engineering Academy's published paper
 * analysis. That table omits General Aptitude, which is fixed at 15 marks in every
 * GATE paper by the official exam pattern, so we add it as its own row.
 *
 * Note: a handful of columns fall 1–3 marks short of 100 in the published table.
 * We do not pad them. Percentages in the UI are computed from the accounted total
 * for each column, and the chart shows the accounted total so you can see the gap.
 */
export const gateCe: WeightageDataset = {
  id: 'gate-ce',
  examId: 'gate-2027',
  label: 'Civil Engineering',
  short: 'CE',
  paperCode: 'CE',
  years: YEARS,
  paperTotal: 100,
  sourceId: 'aceWeightage',
  methodologyNote:
    'Marks per subject per paper, 2012–2026, from published GATE CE paper analysis, plus General Aptitude at its fixed 15 marks. Columns that fall short of 100 are left short rather than padded — percentages use the accounted total.',
  subjects: [
    {
      id: 'general-aptitude',
      name: 'General Aptitude',
      short: 'Aptitude',
      marks: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      derived: true,
      derivationNote: 'Fixed at 15 marks in every GATE paper by the official exam pattern.',
    },
    {
      id: 'geotech',
      name: 'Geotechnical Engineering',
      short: 'Geotech',
      marks: [15, 14, 12, 14, 14, 13, 14, 14, 14, 13, 13, 16, 14, 16, 13],
    },
    {
      id: 'eng-maths',
      name: 'Engineering Mathematics',
      short: 'Eng. Maths',
      marks: [13, 8, 8, 13, 14, 13, 12, 10, 13, 11, 12, 13, 12, 13, 13],
    },
    {
      id: 'environmental',
      name: 'Environmental Engineering',
      short: 'Environmental',
      marks: [10, 8, 9, 8, 10, 11, 10, 10, 11, 12, 13, 13, 8, 10, 11],
    },
    {
      id: 'transportation',
      name: 'Transportation Engineering',
      short: 'Transport',
      marks: [9, 9, 10, 8, 6, 8, 9, 10, 10, 9, 12, 6, 11, 8, 12],
    },
    {
      id: 'fmhm',
      name: 'Fluid Mechanics & Hydraulic Machines',
      short: 'Fluid Mech.',
      marks: [5, 9, 13, 9, 7, 7, 7, 8, 8, 7, 6, 7, 10, 6, 8],
    },
    {
      id: 'som',
      name: 'Strength of Materials',
      short: 'SOM',
      marks: [10, 9, 9, 6, 4, 8, 8, 6, 8, 8, 5, 5, 6, 4, 5],
    },
    {
      id: 'structural-analysis',
      name: 'Structural Analysis',
      short: 'Struct. Analysis',
      marks: [0, 9, 8, 6, 7, 6, 6, 6, 3, 5, 6, 7, 3, 7, 6],
    },
    {
      id: 'rcc',
      name: 'Reinforced Concrete Structures',
      short: 'RCC',
      marks: [8, 5, 6, 7, 4, 5, 8, 4, 5, 3, 3, 4, 6, 5, 5],
    },
    {
      id: 'surveying',
      name: 'Surveying & Geomatics',
      short: 'Surveying',
      marks: [3, 5, 5, 6, 4, 4, 4, 5, 4, 4, 3, 4, 7, 4, 6],
    },
    {
      id: 'hydrology',
      name: 'Hydrology',
      short: 'Hydrology',
      marks: [7, 6, 2, 4, 3, 4, 4, 4, 2, 3, 2, 5, 3, 6, 4],
    },
    {
      id: 'construction-mgmt',
      name: 'Construction Materials & Management',
      short: 'Constr. Mgmt',
      marks: [null, null, null, null, 4, 3, 3, null, 3, 2, 6, 1, 4, 2, 0],
    },
    {
      id: 'steel',
      name: 'Design of Steel Structures',
      short: 'Steel',
      marks: [3, 1, 1, 2, 2, 2, 2, 4, 2, 2, 2, 1, 0, 2, 1],
    },
    {
      id: 'irrigation',
      name: 'Irrigation',
      short: 'Irrigation',
      marks: [2, 2, 2, 2, 2, 2, 1, 1, 3, 2, 3, 1, 0, 2, 1],
    },
  ],
}
