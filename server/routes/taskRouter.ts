const task = require('../controllers/auth')
const express = require('express');

const taskRouter = express.Router()

// All routes start with /task

// Get all tasks
taskRouter.get('/', task.getAllTasks)

module.exports = taskRouter

export {};