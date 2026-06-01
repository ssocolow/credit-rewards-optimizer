# Card Optimizer

A client-only PWA: pick the category of what you're buying, and it tells you which
of your credit cards earns the most. No server — all data lives in your browser's
localStorage. Installable to your phone's home screen and works offline.

## How it works

- **Categories, not merchants.** Card issuers reward bonus *categories* (Dining,
  Groceries, Gas, …), each defined internally by a set of merchant category codes
  (MCCs). There are ~1,000 MCCs but only ~15–25 reward categories, so you pick a
  category, not a specific store. MCC sets are kept in `src/data/categories.ts` as
  the definition/reference for each category.
- **Rotating quarterly bonuses** (e.g. Discover it, Chase Freedom Flex) are modeled
  as rules limited to specific quarters. The app derives the current quarter from
  today's date and only counts bonuses active now.
- **Recommendation** = for the chosen category, each card's best active rate (or its
  base "everything else" rate), ranked highest first. Pure logic in
  `src/lib/recommend.ts` (unit-tested in `recommend.test.ts`).

## Scope (intentionally simple)

Flat + rotating-quarterly cashback rates, compared by percentage. No spend caps,
activation tracking, or points valuation — those are noted as future extensions in
the data model.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # vitest unit tests
npm run build    # type-check + production build (generates PWA service worker)
npm run preview  # serve the production build
```

## Data

Cards are seeded from editable templates (`src/data/cardTemplates.ts`) on first run
and stored under the `card-optimizer-v1` localStorage key. Use the **Backup** tab to
export/import JSON or reset to templates. Treat templates as starting points — reward
terms change, so edit them to match your actual cards.
