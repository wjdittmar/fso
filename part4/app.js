const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const blogsRouter = require('./controllers/blogs')
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app