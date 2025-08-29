import React from 'react'
import type { Filter } from '../types'

type Props = {
  left: number
  filter: Filter
  setFilter: (f: Filter) => void
  onClearCompleted: () => void
}

const FILTERS: { key: Filter, label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' }
]

export default function TodoFooter({ left, filter, setFilter, onClearCompleted }: Props) {
  return (
    <footer className="footer">
      <span className="count">{left} {left === 1 ? 'item' : 'items'} left</span>
      <nav className="filters" aria-label="Filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter ${filter === f.key ? 'selected' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </nav>
      <button className="clear" onClick={onClearCompleted}>Clear completed</button>
    </footer>
  )
}