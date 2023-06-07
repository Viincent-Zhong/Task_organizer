const tab = require('../controllers/tab')
const express = require('express');

const tabRouter = express.Router()

// All routes start with /tab

// Get all tabs
tabRouter.get('/', tab.getAllTab)

// Add one tab
tabRouter.post('/', tab.addTab)

// Delete one tab
tabRouter.delete('/:id', tab.deleteTab)

// Modify tab name
tabRouter.patch('/name/:id', tab.modifyTabName)

module.exports = tabRouter

export {};