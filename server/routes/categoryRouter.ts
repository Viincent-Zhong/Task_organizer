const category = require('../controllers/category')
const express = require('express');

const categoryRouter = express.Router()

// All routes start with /category

// Get all categories
categoryRouter.get('/', category.getAllCategories)

// Add one category
categoryRouter.post('/', category.addCategory)

// Delete one category
categoryRouter.delete('/:id', category.deleteCategory)

// Modify category name
categoryRouter.patch('/name/:id', category.modifyCategoryName)

module.exports = categoryRouter

export {};