const express = require('express')
const app = express()
const connectToDB = require('./config/db')

connectToDB()

// Routes
const authRouter = require('./routes/authRouter')

app.use('/auth', authRouter)

export default app