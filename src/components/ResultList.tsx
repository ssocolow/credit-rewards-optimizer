import type { CardResult } from '../lib/recommend'

export function ResultList({ results }: { results: CardResult[] }) {
  if (results.length === 0) {
    return <p className="muted">No cards yet. Add some on the Cards tab.</p>
  }

  // The top rate may be shared by several cards (a tie); badge them all "Best".
  const topRate = results[0].rate

  return (
    <div>
      {results.map((r, i) => {
        const isBest = r.rate === topRate
        return (
          <div key={r.card.id} className={`card-row${isBest ? ' best' : ''}`}>
            <div>
              <div className="name">
                {r.card.name}
                {isBest && i === 0 && <span className="badge">Use this</span>}
              </div>
              <div className="reason">{r.reason}</div>
            </div>
            <div className="rate">{(r.rate * 100).toFixed(r.rate * 100 % 1 === 0 ? 0 : 1)}%</div>
          </div>
        )
      })}
    </div>
  )
}
