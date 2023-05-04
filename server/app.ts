const express = require('express')
const app = express()

// Routes
const authRouter = require('./routes/authRouter')

app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})

export {};