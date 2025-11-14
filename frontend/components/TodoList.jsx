import Todo from "./Todo"

function TodoList({ todos, handleUpdate, handleDelete }) {
    return (
        <ul>
            {todos.map((todo) =>
                <Todo
                    key={todo._id}
                    todo={todo}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            )}
        </ul>
    )
}

export default TodoList