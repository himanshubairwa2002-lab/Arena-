import type { WeightageDataset } from './types'

const YEARS = [
  2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
]

/**
 * GATE Electronics & Communication — marks per subject per paper, 2012–2026.
 * Transcribed verbatim from ACE Engineering Academy's published paper analysis.
 * Every column sums to exactly 100.
 */
export const gateEce: WeightageDataset = {
  id: 'gate-ece',
  examId: 'gate-2027',
  label: 'Electronics & Communication',
  short: 'ECE',
  paperCode: 'EC',
  years: YEARS,
  paperTotal: 100,
  sourceId: 'aceWeightage',
  methodologyNote:
    'Marks per subject per paper, 2012–2026, from published GATE EC paper analysis. Every column sums to 100.',
  subjects: [
    {
      id: 'general-aptitude',
      name: 'General Aptitude',
      short: 'Aptitude',
      marks: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    },
    {
      id: 'eng-maths',
      name: 'Engineering Mathematics',
      short: 'Eng. Maths',
      marks: [12, 12, 13, 9, 11, 12, 14, 11, 11, 11, 12, 13, 11, 13, 7],
    },
    {
      id: 'edc-vlsi',
      name: 'Electronic Devices & VLSI',
      short: 'EDC + VLSI',
      marks: [11, 15, 10, 18, 11, 13, 13, 20, 10, 6, 13, 7, 12, 9, 9],
    },
    {
      id: 'comm-systems',
      name: 'Communication Systems',
      short: 'Comms',
      marks: [10, 7, 10, 9, 10, 8, 9, 12, 8, 16, 10, 11, 11, 12, 12],
    },
    {
      id: 'signals-systems',
      name: 'Signals & Systems',
      short: 'Signals',
      marks: [7, 10, 10, 10, 13, 11, 9, 8, 8, 8, 7, 12, 10, 7, 13],
    },
    {
      id: 'analog',
      name: 'Analog Electronics',
      short: 'Analog',
      marks: [7, 7, 9, 7, 7, 8, 7, 5, 13, 9, 10, 10, 9, 13, 10],
    },
    {
      id: 'network-theory',
      name: 'Network Theory',
      short: 'Networks',
      marks: [12, 15, 10, 10, 7, 6, 7, 5, 7, 10, 8, 6, 7, 6, 7],
    },
    {
      id: 'emt',
      name: 'Electromagnetic Theory',
      short: 'EMT',
      marks: [12, 6, 8, 8, 11, 8, 8, 9, 11, 10, 7, 11, 6, 6, 7],
    },
    {
      id: 'digital-mp',
      name: 'Digital Circuits & Microprocessors',
      short: 'Digital + MP',
      marks: [5, 6, 7, 7, 6, 10, 11, 5, 9, 9, 10, 8, 11, 9, 13],
    },
    {
      id: 'control',
      name: 'Control Systems',
      short: 'Control',
      marks: [9, 7, 8, 7, 9, 9, 7, 10, 8, 6, 8, 7, 8, 10, 7],
    },
  ],
}
