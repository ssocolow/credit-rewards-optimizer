import { useState } from 'react'
import type { Card } from '../types'
import { categoryById } from '../data/categories'
import { useStore } from '../store/useStore'
import { CardEditor } from './CardEditor'

const blankCard = (): Card => ({ id: 'new', name: '', baseRate: 0.01, rules: [] })

function ruleSummary(card: Card): string {
  if (card.rules.length === 0) return 'Flat rate only'
  return card.rules
    .map((r) => {
      const cat = categoryById(r.categoryId)?.name ?? r.categoryId
      const q = r.quarters && r.quarters.length ? ` (Q${r.quarters.join('/')})` : ''
      return `${(r.rate * 100).toFixed(0)}% ${cat}${q}`
    })
    .join(' · ')
}

export function CardList() {
  const cards = useStore((s) => s.cards)
  const addCard = useStore((s) => s.addCard)
  const updateCard = useStore((s) => s.updateCard)
  const removeCard = useStore((s) => s.removeCard)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  return (
    <div>
      {adding ? (
        <CardEditor
          initial={blankCard()}
          onCancel={() => setAdding(false)}
          onSave={(card) => {
            const { id: _ignored, ...rest } = card
            void _ignored
            addCard(rest)
            setAdding(false)
          }}
        />
      ) : (
        <button className="btn full" onClick={() => setAdding(true)} style={{ marginBottom: 14 }}>
          + Add a card
        </button>
      )}

      {cards.map((card) =>
        editingId === card.id ? (
          <CardEditor
            key={card.id}
            initial={card}
            onCancel={() => setEditingId(null)}
            onSave={(updated) => {
              updateCard(updated)
              setEditingId(null)
            }}
          />
        ) : (
          <div className="card-admin" key={card.id}>
            <div className="row">
              <div>
                <div className="name">{card.name}</div>
                <div className="sub">
                  {card.issuer ? `${card.issuer} · ` : ''}Base {(card.baseRate * 100).toFixed(0)}%
                </div>
                <div className="sub">{ruleSummary(card)}</div>
              </div>
              <div className="spacer" />
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn secondary" onClick={() => setEditingId(card.id)}>
                Edit
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  if (confirm(`Delete "${card.name}"?`)) removeCard(card.id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  )
}
