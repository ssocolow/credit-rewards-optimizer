import { useRef, useState } from 'react'
import type { Card } from '../types'
import { useStore } from '../store/useStore'

export function DataSettings() {
  const cards = useStore((s) => s.cards)
  const replaceAll = useStore((s) => s.replaceAll)
  const resetToTemplates = useStore((s) => s.resetToTemplates)
  const [message, setMessage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ cards }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'card-optimizer-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text())
      const incoming: Card[] = Array.isArray(parsed) ? parsed : parsed.cards
      if (!Array.isArray(incoming)) throw new Error('No "cards" array found')
      replaceAll(incoming)
      setMessage(`Imported ${incoming.length} cards.`)
    } catch (e) {
      setMessage(`Import failed: ${(e as Error).message}`)
    }
  }

  return (
    <div>
      <p className="muted">
        Your cards live only in this browser (localStorage). Export a backup so you don't lose them
        if you clear browser data or switch phones.
      </p>

      <button className="btn full" onClick={exportJson} style={{ marginBottom: 10 }}>
        Export backup (JSON)
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void importJson(f)
          e.target.value = ''
        }}
      />
      <button
        className="btn secondary full"
        onClick={() => fileRef.current?.click()}
        style={{ marginBottom: 10 }}
      >
        Import backup (replaces current)
      </button>

      <button
        className="btn danger full"
        onClick={() => {
          if (confirm('Reset all cards back to the built-in templates? This replaces your cards.'))
            resetToTemplates()
        }}
      >
        Reset to templates
      </button>

      {message && <p className="muted" style={{ marginTop: 14 }}>{message}</p>}
    </div>
  )
}
