const filter = require('../controllers/filter')
const express = require('express');

const filterRouter = express.Router()

// All routes start with /filter

// Get all categories
filterRouter.get('/', filter.getAllFilters)

// Add one filter
filterRouter.post('/', filter.addFilter)

// Delete one filter
filterRouter.delete('/:id', filter.deleteFilter)

// Modify filter name
filterRouter.patch('/name/:id', filter.modifyFilterName)

// Add category in filter
filterRouter.post('/category/:id/:categoryId', filter.addFilterCategory)

// Delete category in filter
filterRouter.delete('/category/:id/:categoryId', filter.removeFilterCategory)

module.exports = filterRouter

export {};