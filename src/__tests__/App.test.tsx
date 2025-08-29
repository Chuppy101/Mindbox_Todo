import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

function addTodo(title: string) {
	const input = screen.getByLabelText(/add todo/i) as HTMLInputElement
	return userEvent.type(input, title + "{enter}")
}

describe("Todo App", () => {
	it("adds, toggles, filters and clears completed", async () => {
		render(<App />)
		const user = userEvent.setup()

		// Добавляем 3 todo
		await addTodo("Тестовое задание")
		await addTodo("Прекрасный код")
		await addTodo("Покрытие тестами")

		// Переключаем "Прекрасный код" в выполненное
		const completedItem = screen.getByText("Прекрасный код").closest("li")!
		const toggleBtn = completedItem.querySelector("button")!
		await user.click(toggleBtn)

		// Фильтр должен его спрятать
		await user.click(screen.getByRole("button", { name: "Active" }))
		expect(screen.queryByText("Прекрасный код")).toBeNull()

		// Возвращение ко всем
		await user.click(screen.getByRole("button", { name: "All" }))
		expect(screen.getByText("Прекрасный код")).toBeInTheDocument()

		// Очищение выполненных должно его удалить
		await user.click(screen.getByRole("button", { name: /clear completed/i }))
		expect(screen.queryByText("Прекрасный код")).toBeNull()

		// Счетчик должен показывать 2 оставшихся
		expect(screen.getByText(/2 items left/i)).toBeInTheDocument()
	})
})
