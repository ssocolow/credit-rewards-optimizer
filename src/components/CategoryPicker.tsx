import { CATEGORIES } from '../data/categories'

export function CategoryPicker({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`cat-btn${selectedId === cat.id ? ' selected' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="emoji">{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  )
}
