const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
require('dotenv').config();

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app