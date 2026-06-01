import { useMemo, useState } from 'react'
import { CategoryPicker } from './CategoryPicker'
import { ResultList } from './ResultList'
import { categoryById } from '../data/categories'
import { currentQuarter, rankCards } from '../lib/recommend'
import { useStore } from '../store/useStore'

export function RecommendView() {
  const cards = useStore((s) => s.cards)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Quarter is derived once per render from the real date.
  const quarter = currentQuarter(new Date())

  const results = useMemo(
    () => (selectedId ? rankCards(selectedId, cards, quarter) : []),
    [selectedId, cards, quarter],
  )

  const selected = selectedId ? categoryById(selectedId) : null

  const select = (id: string) => {
    setSelectedId(id)
    window.scrollTo(0, 0) // results screen should start at the top
  }

  // Results screen: a dedicated "page" so the best card is visible without scrolling.
  if (selected) {
    return (
      <div>
        <button className="back-btn" onClick={() => setSelectedId(null)}>
          ← All categories
        </button>
        <div className="result-head">
          <h2>
            {selected.emoji} {selected.name}
          </h2>
          <span className="muted">Q{quarter}</span>
        </div>
        <ResultList results={results} />
      </div>
    )
  }

  // Category picker screen.
  return <CategoryPicker selectedId={null} onSelect={select} />
}
