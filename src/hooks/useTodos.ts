import { useEffect, useMemo, useState } from 'react'
import type { Todo, Filter } from '../types'

const STORAGE_KEY = 'mindbox_todos'

function readStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) as Todo[] : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => readStorage())
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const visible = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed)
      case 'completed': return todos.filter(t => t.completed)
      default: return todos
    }
  }, [todos, filter])

  const leftCount = useMemo(() => todos.filter(t => !t.completed).length, [todos])

  function add(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos(prev => [{ id: crypto.randomUUID(), title: trimmed, completed: false }, ...prev])
  }

  function toggle(id: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function removeCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  function clearAll() {
    setTodos([])
  }

  return {
    todos,
    visible,
    filter,
    setFilter,
    add,
    toggle,
    removeCompleted,
    clearAll,
    leftCount
  }
}