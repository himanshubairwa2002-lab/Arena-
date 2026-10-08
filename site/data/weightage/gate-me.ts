import type { WeightageDataset } from './types'

const YEARS = [
  2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
]

/**
 * GATE Mechanical Engineering — marks per subject per paper, 2012–2026.
 * Technical rows are transcribed verbatim from ACE Engineering Academy's published
 * paper analysis. That table omits the non-technical block, so we add one derived
 * row: Engineering Mathematics + General Aptitude = 100 − (sum of technical rows).
 * It is flagged `derived` and labelled as such everywhere it renders.
 */
export const gateMe: WeightageDataset = {
  id: 'gate-me',
  examId: 'gate-2027',
  label: 'Mechanical Engineering',
  short: 'ME',
  paperCode: 'ME',
  years: YEARS,
  paperTotal: 100,
  sourceId: 'aceWeightage',
  methodologyNote:
    'Technical rows: marks per subject per paper, 2012–2026, from published GATE ME paper analysis. The Maths + Aptitude row is derived by us as 100 minus the published technical total, because the source table lists technical subjects only.',
  subjects: [
    {
      id: 'maths-aptitude',
      name: 'Engineering Mathematics + General Aptitude',
      short: 'Maths + Apt.',
      marks: [30, 30, 28, 29, 28, 28, 28, 29, 30, 29, 28, 32, 29, 29, 28],
      derived: true,
      derivationNote: '100 − sum of published technical rows.',
    },
    {
      id: 'production',
      name: 'Manufacturing & Production Engineering',
      short: 'Manufacturing',
      marks: [13, 17, 14, 16, 15, 15, 17, 16, 15, 16, 16, 17, 15, 18, 14],
    },
    {
      id: 'thermal',
      name: 'Thermodynamics & Thermal Engineering',
      short: 'Thermal',
      marks: [12, 10, 10, 10, 10, 10, 9, 10, 12, 10, 9, 8, 8, 9, 9],
    },
    {
      id: 'som',
      name: 'Strength of Materials',
      short: 'SOM',
      marks: [11, 6, 6, 8, 10, 9, 10, 8, 8, 6, 7, 15, 6, 7, 10],
    },
    {
      id: 'fmhm',
      name: 'Fluid Mechanics & Hydraulic Machines',
      short: 'Fluid Mech.',
      marks: [4, 6, 8, 5, 8, 9, 9, 7, 8, 8, 7, 9, 7, 10, 8],
    },
    {
      id: 'tom',
      name: 'Theory of Machines & Vibrations',
      short: 'Theory of M/c',
      marks: [7, 9, 11, 9, 7, 7, 7, 10, 6, 8, 8, 4, 8, 8, 8],
    },
    {
      id: 'heat-transfer',
      name: 'Heat Transfer',
      short: 'Heat Transfer',
      marks: [8, 8, 6, 10, 7, 6, 4, 7, 5, 6, 8, 7, 9, 5, 7],
    },
    {
      id: 'imor',
      name: 'Industrial Engineering & Operations Research',
      short: 'Industrial Eng.',
      marks: [6, 4, 6, 6, 5, 6, 6, 5, 6, 8, 8, 2, 8, 6, 10],
    },
    {
      id: 'machine-design',
      name: 'Machine Design',
      short: 'Machine Design',
      marks: [5, 6, 6, 4, 4, 5, 4, 4, 6, 5, 3, 3, 6, 6, 4],
    },
    {
      id: 'eng-mech',
      name: 'Engineering Mechanics',
      short: 'Eng. Mechanics',
      marks: [4, 4, 5, 3, 6, 5, 6, 4, 4, 4, 6, 3, 4, 2, 2],
    },
  ],
}
