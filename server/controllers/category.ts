const mongoose = require('mongoose')
import { ICategory, CategoryModel } from "../models/category";

// Get all categories
exports.getAllCategories = async function(req, res) {
    const userID = req.signedCookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request')
    try {
        const categories = await CategoryModel.find({ createdBy: userID }).exec();
        return res.status(200).send(categories);
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Add a category
    req:
        body - ICategory
*/
exports.addCategory = async function(req, res) {
    const userID = req.signedCookies.auth;
    const category: ICategory = req.body

    if (!userID || !category)
        return res.status(400).send('Invalid request')

    category._id = new mongoose.Types.ObjectId();
    category.createdBy = userID;

    try {
        await CategoryModel.insertMany([category]);
        return res.status(200).send(category);
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Delete a category
    req:
        param - id
*/
exports.deleteCategory = async function(req, res) {
    const userID = req.signedCookies.auth;
    const categoryID = req.params.id;

    if (!userID || !categoryID)
        return res.status(400).send('Invalid request')

    try {
        await CategoryModel.deleteOne({ _id: categoryID, createdBy: userID });
        return res.status(200).send('Category deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Modify a category name
    req:
        param - id
        body - name
*/
exports.modifyCategoryName = async function(req, res) {
    const userID = req.signedCookies.auth;
    const categoryID = req.params.id;
    const name = req.body && req.body.name;

    if (!userID || !categoryID || !name)
        return res.status(400).send('Invalid request')

    try {
        await CategoryModel.updateOne({ _id: categoryID, createdBy: userID }, { name: name });
        return res.status(200).send('Category name modified');
    } catch (err) {
        return res.status(400).send(err);
    }
}
