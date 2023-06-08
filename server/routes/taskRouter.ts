const task = require('../controllers/task')
const express = require('express');

const taskRouter = express.Router()

// All routes start with /task

// Get all tasks
taskRouter.get('/', task.getAllTasks)

/* Get one task
    req: 
        param - id
*/
taskRouter.get('/:id', task.getOneTask)

/* Add one task
    req:
        body - ITask
*/
taskRouter.post('/', task.addTask)

/* Delete one task
    req: 
        param - id
*/
taskRouter.delete('/:id', task.deleteTask)

/* Modify task name
    req: 
        param - id
        body - name
*/
taskRouter.patch('/name/:id', task.modifyTaskName)

/* Modify one task description
    req: 
        param - id
        body - description
*/
taskRouter.patch('/description/:id', task.modifyTaskDescription)

/* Add category to task
    req: 
        param - id
        param - categoryId
*/
taskRouter.patch('/category/:id/:categoryId', task.addTaskCategory)

/* Remove category from task
    req: 
        param - id
        param - categoryId
*/
taskRouter.patch('/category/:id/:categoryId', task.removeTaskCategory)

/* Modify task start date
    req: 
        param - id
        body - start
*/
taskRouter.patch('/start/:id', task.modifyTaskStart)

/* Modify task end date
    req: 
        param - id
        body - end
*/
taskRouter.patch('/end/:id', task.modifyTaskEnd)

/* Modify one task tab
    req: 
        param - id
        param - tabId
*/
taskRouter.patch('/tab/:id/:tabId', task.modifyTab)


module.exports = taskRouter

export {};