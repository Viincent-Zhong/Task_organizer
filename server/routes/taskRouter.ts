const task = require('../controllers/task')
const express = require('express');

const taskRouter = express.Router()

// All routes start with /task

// Get all tasks
taskRouter.get('/', task.getAllTasks)

// Get one task
taskRouter.get('/:id', task.getOneTask)

// Add one task
taskRouter.post('/', task.addTask)

// Delete one task
taskRouter.delete('/:id', task.deleteTask)

// Modify task name
taskRouter.patch('/name/:id', task.modifyTaskName)

// Modify task description
taskRouter.patch('/description/:id', task.modifyTaskDescription)

// Add category in task
taskRouter.post('/category/:id/:categoryId', task.addTaskCategory)

// Delete category in task
taskRouter.delete('/category/:id/:categoryId', task.removeTaskCategory)

// Modify task start date
taskRouter.patch('/start/:id', task.modifyTaskStart)

// Modify task end date
taskRouter.patch('/end/:id', task.modifyTaskEnd)

// Modify task tab
taskRouter.patch('/tab/:id/:tabId', task.modifyTab)


module.exports = taskRouter

export {};