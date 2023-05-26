const auth = require('../controllers/auth')
const express = require('express');

const authRouter = express.Router()

// All routes start with /auth

authRouter.get('/', auth.test)

// User logged in
authRouter.post('/login', auth.logging_in)

module.exports = authRouter