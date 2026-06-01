export type Quarter = 1 | 2 | 3 | 4

/** A reward bonus category. A category is defined by the set of MCCs that map to it. */
export interface Category {
  id: string // e.g. "dining"
  name: string // e.g. "Dining & Restaurants"
  emoji: string // shown in the picker grid
  /** Representative merchant category codes (ISO 18245) that map to this category. Reference only. */
  mccs: number[]
}

/** A single earning rule on a card. */
export interface RewardRule {
  categoryId: string // references a Category.id
  rate: number // decimal cashback, e.g. 0.05 for 5%
  /** Rotating categories: active only in these quarters. Omitted/empty = active all year. */
  quarters?: Quarter[]
}

export interface Card {
  id: string
  name: string // e.g. "Chase Freedom Flex"
  issuer?: string
  /** Catch-all "everything else" rate, e.g. 0.01 for 1%. */
  baseRate: number
  rules: RewardRule[]
}
