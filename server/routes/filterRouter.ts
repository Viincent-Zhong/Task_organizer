const filter = require('../controllers/filter')
const express = require('express');

const filterRouter = express.Router()

// All routes start with /filter

// Get all filters
filterRouter.get('/', filter.getAllFilters)

/* Add a filter
    req:
        body - IFilter
*/
filterRouter.post('/', filter.addFilter)

/* Delete a filter
    req:
        param - id
*/
filterRouter.delete('/:id', filter.deleteFilter)

/* Modify a filter name
    req:
        param - id
        body - name
*/
filterRouter.patch('/name/:id', filter.modifyFilterName)

/* Add one filter category
    req: 
        param - id
        param - categoryID
*/
filterRouter.patch('/category/:id/:categoryId', filter.addFilterCategory)

/* Remove one filter category
    req: 
        param - id
        param - categoryID
*/
filterRouter.patch('/category/:id/:categoryId', filter.removeFilterCategory)

module.exports = filterRouter

export {};