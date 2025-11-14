import express from 'express';
import cors from 'cors'

import 'dotenv/config'

import connectDB from './db.js';
import todoRoutes from './routes/todos.js'

const app = express()

const port = 8080

app.use(express.json())
app.use(cors())

app.use('/todos', todoRoutes)

app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})

// CRUD

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE