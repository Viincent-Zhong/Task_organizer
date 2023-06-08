const tab = require('../controllers/tab')
const express = require('express');

const tabRouter = express.Router()

// All routes start with /tab

// Get all tabs
tabRouter.get('/', tab.getAllTab)

/* Add a tab
    req:
        body - ITab
*/
tabRouter.post('/', tab.addTab)

/* Delete a tab
    req:
        param - id
*/
tabRouter.delete('/:id', tab.deleteTab)

/* Modify a tab name
    req:
        param - id
        body - name
*/
tabRouter.patch('/name/:id', tab.modifyTabName)

module.exports = tabRouter

export {};