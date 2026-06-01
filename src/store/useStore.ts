import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Card } from '../types'
import { CARD_TEMPLATES } from '../data/cardTemplates'

const newId = () => `card-${Math.random().toString(36).slice(2, 10)}`

/** Deep-clone the templates so seeded cards are independent, editable copies. */
const seedCards = (): Card[] =>
  CARD_TEMPLATES.map((c) => ({ ...c, id: newId(), rules: c.rules.map((r) => ({ ...r })) }))

const STORAGE_KEY = 'card-optimizer-v1'

interface State {
  cards: Card[]
  addCard: (card: Omit<Card, 'id'>) => void
  updateCard: (card: Card) => void
  removeCard: (id: string) => void
  replaceAll: (cards: Card[]) => void
  resetToTemplates: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      cards: seedCards(),
      addCard: (card) => set((s) => ({ cards: [...s.cards, { ...card, id: newId() }] })),
      updateCard: (card) =>
        set((s) => ({ cards: s.cards.map((c) => (c.id === card.id ? card : c)) })),
      removeCard: (id) => set((s) => ({ cards: s.cards.filter((c) => c.id !== id) })),
      replaceAll: (cards) => set({ cards }),
      resetToTemplates: () => set({ cards: seedCards() }),
    }),
    { name: STORAGE_KEY },
  ),
)

// `persist` only writes to localStorage after a state change, so the initial
// template seed would otherwise vanish on reload (and re-seed with fresh IDs).
// On first run — nothing persisted yet — write the current seed so it sticks.
if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === null) {
  useStore.setState((s) => ({ cards: s.cards }))
}

export { newId }
