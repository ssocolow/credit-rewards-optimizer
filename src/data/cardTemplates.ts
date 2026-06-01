import type { Card } from '../types'

/**
 * Editable starting templates for common cards. These are reasonable
 * representations of well-known reward structures, but reward terms change —
 * treat them as a fast starting point and edit to match your actual cards.
 * Rotating 5% categories are illustrative; set the real schedule in the editor.
 */
export const CARD_TEMPLATES: Card[] = [
  {
    id: 'tmpl-freedom-flex',
    name: 'Chase Freedom Flex',
    issuer: 'Chase',
    baseRate: 0.01,
    rules: [
      { categoryId: 'dining', rate: 0.03 },
      { categoryId: 'drugstores', rate: 0.03 },
      // Rotating 5% (activation required in real life). Illustrative schedule:
      { categoryId: 'groceries', rate: 0.05, quarters: [1] },
      { categoryId: 'gas', rate: 0.05, quarters: [2] },
      { categoryId: 'dining', rate: 0.05, quarters: [3] },
      { categoryId: 'online', rate: 0.05, quarters: [4] },
    ],
  },
  {
    id: 'tmpl-discover-it',
    name: 'Discover it Cash Back',
    issuer: 'Discover',
    baseRate: 0.01,
    rules: [
      { categoryId: 'groceries', rate: 0.05, quarters: [1] },
      { categoryId: 'gas', rate: 0.05, quarters: [2] },
      { categoryId: 'dining', rate: 0.05, quarters: [3] },
      { categoryId: 'online', rate: 0.05, quarters: [4] },
    ],
  },
  {
    id: 'tmpl-custom-cash',
    name: 'Citi Custom Cash',
    issuer: 'Citi',
    baseRate: 0.01,
    rules: [
      // 5% on your top eligible category each cycle. Set to whatever you use most.
      { categoryId: 'dining', rate: 0.05 },
    ],
  },
  {
    id: 'tmpl-blue-cash',
    name: 'Amex Blue Cash Everyday',
    issuer: 'American Express',
    baseRate: 0.01,
    rules: [
      { categoryId: 'groceries', rate: 0.03 },
      { categoryId: 'gas', rate: 0.03 },
      { categoryId: 'online', rate: 0.03 },
    ],
  },
  {
    id: 'tmpl-flat-2',
    name: 'Flat 2% Card',
    issuer: 'Generic',
    baseRate: 0.02,
    rules: [],
  },
]
