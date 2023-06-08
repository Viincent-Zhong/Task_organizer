const category = require('../controllers/category')
const express = require('express');

const categoryRouter = express.Router()

// All routes start with /category

// Get all categories
categoryRouter.get('/', category.getAllCategories)

/* Add a category
    req:
        body - ICategory
*/
categoryRouter.post('/', category.addCategory)

/* Delete a category
    req:
        param - id
*/
categoryRouter.delete('/:id', category.deleteCategory)

/* Modify a category name
    req:
        param - id
        body - name
*/
categoryRouter.patch('/name/:id', category.modifyCategoryName)

module.exports = categoryRouter

export {};