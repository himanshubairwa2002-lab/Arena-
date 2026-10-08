import type { WeightageDataset } from './types'

const YEARS = [
  2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
]

/**
 * GATE Computer Science & IT — marks per subject per paper, 2012–2026.
 * Transcribed verbatim from ACE Engineering Academy's published paper analysis.
 * Every column sums to exactly 100, which is the full GATE paper.
 */
export const gateCse: WeightageDataset = {
  id: 'gate-cse',
  examId: 'gate-2027',
  label: 'Computer Science & IT',
  short: 'CSE',
  paperCode: 'CS',
  years: YEARS,
  paperTotal: 100,
  sourceId: 'aceWeightage',
  methodologyNote:
    'Marks per subject per paper, 2012–2026, from published GATE CS paper analysis. Where a year ran two sessions, the published figure is the analysed set. Every column sums to 100.',
  subjects: [
    {
      id: 'discrete-eng-maths',
      name: 'Discrete & Engineering Mathematics',
      short: 'Discrete+Maths',
      marks: [18, 13, 23, 23, 16, 16, 16, 14, 15, 15, 19, 17, 13, 14, 13],
    },
    {
      id: 'general-aptitude',
      name: 'General Aptitude',
      short: 'Aptitude',
      marks: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 14, 15, 15, 15],
    },
    {
      id: 'coa',
      name: 'Computer Organisation & Architecture',
      short: 'COA',
      marks: [6, 13, 8, 8, 9, 10, 11, 4, 13, 10, 9, 12, 11, 12, 11],
    },
    {
      id: 'os',
      name: 'Operating Systems',
      short: 'OS',
      marks: [10, 10, 7, 6, 9, 6, 8, 10, 10, 7, 9, 7, 6, 7, 9],
    },
    {
      id: 'cn',
      name: 'Computer Networks',
      short: 'Networks',
      marks: [10, 6, 8, 10, 9, 8, 7, 10, 6, 7, 11, 8, 9, 6, 9],
    },
    {
      id: 'algorithms',
      name: 'Design & Analysis of Algorithms',
      short: 'Algorithms',
      marks: [6, 10, 7, 10, 11, 6, 10, 8, 3, 11, 7, 6, 8, 6, 9],
    },
    {
      id: 'dbms',
      name: 'Databases',
      short: 'DBMS',
      marks: [11, 10, 8, 6, 4, 8, 6, 8, 8, 8, 7, 5, 8, 9, 6],
    },
    {
      id: 'toc',
      name: 'Theory of Computation',
      short: 'TOC',
      marks: [8, 8, 6, 6, 9, 10, 8, 6, 9, 9, 7, 9, 7, 7, 6],
    },
    {
      id: 'programming',
      name: 'Programming (C, recursion)',
      short: 'Programming',
      marks: [7, 4, 3, 4, 6, 10, 8, 10, 5, 4, 5, 6, 5, 6, 6],
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      short: 'Data Struct.',
      marks: [6, 5, 6, 4, 4, 2, 2, 2, 10, 2, 4, 5, 4, 6, 6],
    },
    {
      id: 'compiler',
      name: 'Compiler Design',
      short: 'Compilers',
      marks: [2, 3, 3, 4, 4, 4, 5, 6, 4, 8, 4, 5, 7, 6, 5],
    },
    {
      id: 'digital-logic',
      name: 'Digital Logic',
      short: 'Digital Logic',
      marks: [1, 3, 6, 4, 4, 5, 4, 7, 2, 4, 3, 6, 5, 6, 5],
    },
  ],
}
