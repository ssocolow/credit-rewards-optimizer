import type { Category } from '../types'

/**
 * Bonus categories used by credit card reward programs, each defined by the
 * representative MCCs (ISO 18245) that map to it. The picker UI surfaces these
 * categories; the MCC sets document what each category actually covers.
 */
export const CATEGORIES: Category[] = [
  { id: 'dining', name: 'Dining & Restaurants', emoji: '🍽️', mccs: [5812, 5813, 5814] },
  { id: 'groceries', name: 'Groceries (Supermarkets)', emoji: '🛒', mccs: [5411] },
  { id: 'gas', name: 'Gas Stations', emoji: '⛽', mccs: [5541, 5542] },
  { id: 'ev', name: 'EV Charging', emoji: '🔌', mccs: [5552] },
  { id: 'transit', name: 'Transit & Rideshare', emoji: '🚇', mccs: [4111, 4121, 4131, 4789] },
  { id: 'airlines', name: 'Airlines & Flights', emoji: '✈️', mccs: [3000, 4511] },
  { id: 'hotels', name: 'Hotels & Lodging', emoji: '🏨', mccs: [3501, 7011] },
  { id: 'travel', name: 'Other Travel', emoji: '🧳', mccs: [4722, 7512, 7011] },
  { id: 'drugstores', name: 'Drugstores & Pharmacies', emoji: '💊', mccs: [5912] },
  { id: 'streaming', name: 'Streaming Services', emoji: '📺', mccs: [4899, 5815, 5818] },
  { id: 'online', name: 'Online Shopping', emoji: '📦', mccs: [5942, 5964, 5969] },
  { id: 'wholesale', name: 'Wholesale Clubs', emoji: '🏬', mccs: [5300] },
  { id: 'department', name: 'Department / Big-box Stores', emoji: '🏪', mccs: [5310, 5311, 5331] },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎟️', mccs: [7832, 7922, 7991, 7996, 7998] },
  { id: 'home', name: 'Home Improvement', emoji: '🔨', mccs: [5200, 5211, 5251] },
  { id: 'utilities', name: 'Utilities', emoji: '💡', mccs: [4900] },
  { id: 'phone', name: 'Phone / Internet', emoji: '📱', mccs: [4814, 4815] },
  { id: 'fitness', name: 'Gyms & Fitness', emoji: '🏋️', mccs: [7997, 7298] },
  { id: 'other', name: 'Everything Else', emoji: '🧾', mccs: [] },
]

export const categoryById = (id: string): Category | undefined =>
  CATEGORIES.find((c) => c.id === id)
