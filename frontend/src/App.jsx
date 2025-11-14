import { useEffect, useRef, useState } from "react"
import Form from "../components/Form"
import TodoList from "../components/TodoList"

export const BASE_URL = import.meta.env.VITE_BASE_URL

function App() {

  const [todos, setTodos] = useState([])
  const inputRef = useRef(null)

  async function getTodos() {
    const response = await fetch(`${BASE_URL}/todos`)
    const data = await response.json()
    console.log(data)
    setTodos(data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('handleSubmit')

    const todo = {
      text: inputRef.current.value,
    }

    try {

      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const newTodo = await response.json()

      console.log(newTodo)

      setTodos([...todos, newTodo])

    } catch (e) {
      console.log(e)
    }

    inputRef.current.value = ''
    inputRef.current.focus()

  }

  async function handleDelete(id) {
    try {

      await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      })

      const newTodos = todos.filter((todo) => todo._id !== id)

      setTodos(newTodos)

    } catch (e) {
      console.log(e)
    }
  }

  async function handleUpdate(id) {
    try {

      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT"
      })

      const updatedTodos = todos.map((todo) => (todo._id === id ? { ...todo, completed: !todo.completed } : todo))

      setTodos(updatedTodos)

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h1>Todos</h1>
      <Form
        handleSubmit={handleSubmit}
        inputRef={inputRef}
      />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  )
}

export default App