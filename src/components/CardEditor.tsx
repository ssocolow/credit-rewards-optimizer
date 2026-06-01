import { useState } from 'react'
import type { Card, Quarter, RewardRule } from '../types'
import { CATEGORIES } from '../data/categories'

const QUARTERS: Quarter[] = [1, 2, 3, 4]

/** Selectable bonus-category reward rates, in percent. */
const RATE_OPTIONS = [2, 3, 5]

/** Editor for a single card. Works for both new and existing cards. */
export function CardEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: Card
  onSave: (card: Card) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial.name)
  const [issuer, setIssuer] = useState(initial.issuer ?? '')
  const [basePct, setBasePct] = useState(String(initial.baseRate * 100))
  const [rules, setRules] = useState<RewardRule[]>(initial.rules.map((r) => ({ ...r })))

  const updateRule = (i: number, patch: Partial<RewardRule>) =>
    setRules((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  const toggleQuarter = (i: number, q: Quarter) =>
    setRules((rs) =>
      rs.map((r, idx) => {
        if (idx !== i) return r
        const have = r.quarters ?? []
        const next = have.includes(q) ? have.filter((x) => x !== q) : [...have, q].sort()
        return { ...r, quarters: next.length ? (next as Quarter[]) : undefined }
      }),
    )

  const addRule = () =>
    setRules((rs) => [...rs, { categoryId: CATEGORIES[0].id, rate: 0.03 }])

  const removeRule = (i: number) => setRules((rs) => rs.filter((_, idx) => idx !== i))

  const save = () => {
    const base = parseFloat(basePct)
    onSave({
      ...initial,
      name: name.trim() || 'Untitled Card',
      issuer: issuer.trim() || undefined,
      baseRate: Number.isFinite(base) ? base / 100 : 0,
      rules: rules.map((r) => ({
        categoryId: r.categoryId,
        rate: r.rate,
        ...(r.quarters && r.quarters.length ? { quarters: r.quarters } : {}),
      })),
    })
  }

  return (
    <div className="card-admin">
      <label>Card name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chase Freedom Flex" />

      <label>Issuer (optional)</label>
      <input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="e.g. Chase" />

      <label>Base rate — "everything else" (%)</label>
      <input
        type="number"
        inputMode="decimal"
        value={basePct}
        onChange={(e) => setBasePct(e.target.value)}
      />

      <fieldset className="fieldset">
        <legend>Bonus categories</legend>
        {rules.length === 0 && <p className="muted">No bonus categories — base rate applies everywhere.</p>}
        {rules.map((rule, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div className="rule-row">
              <select
                value={rule.categoryId}
                onChange={(e) => updateRule(i, { categoryId: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
              <select
                value={Math.round(rule.rate * 100)}
                onChange={(e) => updateRule(i, { rate: Number(e.target.value) / 100 })}
                aria-label="rate percent"
              >
                {RATE_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}%
                  </option>
                ))}
              </select>
              <button className="link-btn" onClick={() => removeRule(i)}>
                Remove
              </button>
            </div>
            <div className="quarters">
              <span className="muted" style={{ alignSelf: 'center' }}>Rotating only in:</span>
              {QUARTERS.map((q) => (
                <button
                  key={q}
                  className={`q-chip${rule.quarters?.includes(q) ? ' on' : ''}`}
                  onClick={() => toggleQuarter(i, q)}
                >
                  Q{q}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="btn secondary" onClick={addRule}>
          + Add category
        </button>
      </fieldset>

      <div className="row">
        <button className="btn" onClick={save}>Save</button>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
