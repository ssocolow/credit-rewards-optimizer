import type { Card, Quarter, RewardRule } from '../types'

/** The calendar quarter (1-4) for a given date. */
export function currentQuarter(date: Date): Quarter {
  return (Math.floor(date.getMonth() / 3) + 1) as Quarter
}

/** Is a rule active in the given quarter? Rules with no `quarters` are active all year. */
export function ruleActiveInQuarter(rule: RewardRule, quarter: Quarter): boolean {
  return !rule.quarters || rule.quarters.length === 0 || rule.quarters.includes(quarter)
}

export interface CardResult {
  card: Card
  /** Best effective rate for this category right now (decimal). */
  rate: number
  /** Human-readable explanation of where the rate comes from. */
  reason: string
  /** True when the winning rate is a rotating (quarter-limited) bonus. */
  rotating: boolean
}

const pct = (r: number) => `${(r * 100).toFixed(r * 100 % 1 === 0 ? 0 : 1)}%`

/**
 * The best effective rate a card gives for a category in a quarter, with an
 * explanation. Considers every matching rule active this quarter plus the
 * card's base rate; the highest wins.
 */
export function bestRateForCard(card: Card, categoryId: string, quarter: Quarter): CardResult {
  let best = card.baseRate
  let reason = `${pct(card.baseRate)} base rate`
  let rotating = false

  for (const rule of card.rules) {
    if (rule.categoryId !== categoryId) continue
    if (!ruleActiveInQuarter(rule, quarter)) continue
    if (rule.rate <= best) continue
    best = rule.rate
    const isRotating = !!rule.quarters && rule.quarters.length > 0
    rotating = isRotating
    reason = isRotating ? `${pct(rule.rate)} — Q${quarter} rotating` : `${pct(rule.rate)} flat`
  }

  return { card, rate: best, reason, rotating }
}

/**
 * Rank all cards for a category in a quarter, best rate first. Ties keep the
 * input order (stable), so a user's preferred card ordering is respected.
 */
export function rankCards(categoryId: string, cards: Card[], quarter: Quarter): CardResult[] {
  return cards
    .map((card) => bestRateForCard(card, categoryId, quarter))
    .sort((a, b) => b.rate - a.rate)
}
