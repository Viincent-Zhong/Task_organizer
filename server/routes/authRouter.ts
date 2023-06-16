const auth = require('../controllers/auth')
const express = require('express');

const authRouter = express.Router()

// All routes start with /auth

// User logged in
authRouter.post('/login', auth.logging_in)

module.exports = authRouter

export {};