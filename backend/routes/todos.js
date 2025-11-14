import express from 'express'

const router = express.Router()

import todoController from '../controllers/todos.js'

router.get('/', todoController.getTodos)

router.post('/', todoController.createTodo)

router.delete('/:id', todoController.deleteTodo)

router.put('/:id', todoController.updateTodo)

export default router

// CRUD

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE