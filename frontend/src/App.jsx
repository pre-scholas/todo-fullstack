import { useEffect, useRef, useState } from "react"

function App() {

  const [todos, setTodos] = useState([{ text: "Lunch", completed: false, _id: 1 }])
  const inputRef = useRef(null)

  useEffect(() => {
    async function getTodos() {
      const response = await fetch('http://localhost:8080/todos')
      const data = await response.json()
      console.log(data)
      // setTodos(data)
    }
    getTodos()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('handleSubmit')

    const todo = {
      text: inputRef.current.value,
    }

    try {

      const response = await fetch('http://localhost:8080/todos', {
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

  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          required={true}
        />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) =>
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => { }}
            />
            {todo.text}
          </li>
        )}
      </ul>
    </>
  )
}

export default App