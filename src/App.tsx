import { useState } from 'react'
import { RecommendView } from './components/RecommendView'
import { CardList } from './components/CardList'
import { DataSettings } from './components/DataSettings'

type Tab = 'recommend' | 'cards' | 'data'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'recommend', label: 'Which card?', icon: '💳' },
  { id: 'cards', label: 'My cards', icon: '🗂️' },
  { id: 'data', label: 'Backup', icon: '⚙️' },
]

const SUBTITLES: Record<Tab, string> = {
  recommend: 'Pick what you’re buying — get the best card.',
  cards: 'Add and edit your cards and their rewards.',
  data: 'Back up or restore your data.',
}

export default function App() {
  const [tab, setTab] = useState<Tab>('recommend')

  return (
    <div className="app">
      <header className="topbar">
        <h1>Card Optimizer</h1>
        <p>{SUBTITLES[tab]}</p>
      </header>

      <main>
        {tab === 'recommend' && <RecommendView />}
        {tab === 'cards' && <CardList />}
        {tab === 'data' && <DataSettings />}
      </main>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
