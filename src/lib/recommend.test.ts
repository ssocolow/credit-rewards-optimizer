import { describe, it, expect } from 'vitest'
import type { Card } from '../types'
import { bestRateForCard, currentQuarter, rankCards, ruleActiveInQuarter } from './recommend'

const flat2: Card = { id: 'f2', name: 'Flat 2%', baseRate: 0.02, rules: [] }

const dining3: Card = {
  id: 'd3',
  name: 'Dining 3%',
  baseRate: 0.01,
  rules: [{ categoryId: 'dining', rate: 0.03 }],
}

const rotating: Card = {
  id: 'rot',
  name: 'Rotating 5%',
  baseRate: 0.01,
  rules: [
    { categoryId: 'groceries', rate: 0.05, quarters: [1] },
    { categoryId: 'dining', rate: 0.05, quarters: [3] },
  ],
}

describe('currentQuarter', () => {
  it('maps months to quarters', () => {
    expect(currentQuarter(new Date('2026-01-15'))).toBe(1)
    expect(currentQuarter(new Date('2026-06-01'))).toBe(2)
    expect(currentQuarter(new Date('2026-09-30'))).toBe(3)
    expect(currentQuarter(new Date('2026-12-31'))).toBe(4)
  })
})

describe('ruleActiveInQuarter', () => {
  it('treats rules without quarters as always active', () => {
    expect(ruleActiveInQuarter({ categoryId: 'x', rate: 0.03 }, 2)).toBe(true)
  })
  it('respects quarter restrictions', () => {
    const r = { categoryId: 'x', rate: 0.05, quarters: [1] as const }
    expect(ruleActiveInQuarter({ ...r, quarters: [1] }, 1)).toBe(true)
    expect(ruleActiveInQuarter({ ...r, quarters: [1] }, 2)).toBe(false)
  })
})

describe('bestRateForCard', () => {
  it('falls back to base rate when no rule matches', () => {
    const r = bestRateForCard(flat2, 'dining', 2)
    expect(r.rate).toBe(0.02)
    expect(r.reason).toMatch(/base rate/)
  })

  it('uses a flat category rule', () => {
    const r = bestRateForCard(dining3, 'dining', 2)
    expect(r.rate).toBe(0.03)
    expect(r.rotating).toBe(false)
    expect(r.reason).toMatch(/flat/)
  })

  it('includes a rotating bonus only in its active quarter', () => {
    expect(bestRateForCard(rotating, 'dining', 3).rate).toBe(0.05)
    expect(bestRateForCard(rotating, 'dining', 2).rate).toBe(0.01) // off-quarter → base
    expect(bestRateForCard(rotating, 'dining', 3).rotating).toBe(true)
  })

  it('picks the highest of base and matching rules', () => {
    const mixed: Card = {
      id: 'm',
      name: 'mixed',
      baseRate: 0.04,
      rules: [{ categoryId: 'dining', rate: 0.03 }],
    }
    expect(bestRateForCard(mixed, 'dining', 1).rate).toBe(0.04)
  })
})

describe('rankCards', () => {
  it('sorts by effective rate, best first', () => {
    const ranked = rankCards('dining', [flat2, dining3, rotating], 3)
    expect(ranked.map((r) => r.card.id)).toEqual(['rot', 'd3', 'f2'])
    expect(ranked[0].rate).toBe(0.05)
  })

  it('off-quarter, the flat dining card wins over the dormant rotator', () => {
    const ranked = rankCards('dining', [rotating, dining3, flat2], 2)
    expect(ranked[0].card.id).toBe('d3')
    expect(ranked[0].rate).toBe(0.03)
  })
})
