import React from 'react'
import TodoItem from './TodoItem'
import type { Todo } from '../types'

type Props = {
  items: Todo[]
  onToggle: (id: string) => void
}

export default function TodoList({ items, onToggle }: Props) {
  if (!items.length) return null
  return (
    <ul className="todo-list" role="list">
      {items.map(item => (
        <TodoItem key={item.id} todo={item} onToggle={onToggle} />
      ))}
    </ul>
  )
}