import Todo from '../models/Todo.js'

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}

const createTodo = async (req, res) => {
    try {
        console.log(req.body);
        const todo = await Todo.create(req.body)
        res.status(200).json(todo)
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}


const deleteTodo = async (req, res) => {
    try {
        const response = await Todo.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        todo.completed = !todo.completed
        await todo.save()
        res.status(200).json(todo)
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}

export default {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}