import React from 'react'
import type { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
}

export default function TodoItem({ todo, onToggle }: Props) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={`check ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      />
      <span className="title">{todo.title}</span>
    </li>
  )
}