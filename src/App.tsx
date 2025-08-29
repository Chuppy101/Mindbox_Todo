import React, { useState } from "react"
import TodoList from "./components/TodoList"
import TodoFooter from "./components/TodoFooter"
import { useTodos } from "./hooks/useTodos"

export default function App() {
	const {
		visible,
		add,
		toggle,
		filter,
		setFilter,
		leftCount,
		removeCompleted,
	} = useTodos()
	const [input, setInput] = useState("")

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		add(input)
		setInput("")
	}

	return (
		<div className="container">
			<h1 className="title">todos</h1>

			<section className="panel">
				<form onSubmit={handleSubmit}>
					<input
						aria-label="Add todo"
						className="new-todo"
						placeholder="What needs to be done?"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</form>

				<TodoList items={visible} onToggle={toggle} />

				<TodoFooter
					left={leftCount}
					filter={filter}
					setFilter={setFilter}
					onClearCompleted={removeCompleted}
				/>
			</section>
		</div>
	)
}
