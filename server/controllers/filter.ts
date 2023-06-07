const mongoose = require('mongoose')
import { IFilter, FilterModel } from "../models/filter";

// name: string;
// _id?: Schema.Types.ObjectId;
// createdBy?: Schema.Types.ObjectId;
// categories: [Schema.Types.ObjectId];

// Get all filters
exports.getAllFilters = async function(req, res) {
    const userID = req.cookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request')
    try {
        const categories = await FilterModel.find({ createdBy: userID }).exec();
        return res.status(200).send(categories);
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Add a category
    req:
        body - IFilter
*/
exports.addFilter = async function(req, res) {
    const userID = req.cookies.auth;
    const category: IFilter = req.body

    if (!userID || !category)
        return res.status(400).send('Invalid request')

    category._id = new mongoose.Types.ObjectId();
    category.createdBy = userID;

    try {
        await FilterModel.insertMany([category]);
        return res.status(200).send('Filter created');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Delete a category
    req:
        param - id
*/
exports.deleteFilter = async function(req, res) {
    const userID = req.cookies.auth;
    const categoryID = req.params.id;

    if (!userID || !categoryID)
        return res.status(400).send('Invalid request')

    try {
        await FilterModel.deleteOne({ _id: categoryID, createdBy: userID });
        return res.status(200).send('Filter deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Modify a category name
    req:
        param - id
        body - name
*/
exports.modifyFilterName = async function(req, res) {
    const userID = req.cookies.auth;
    const categoryID = req.params.id;
    const name = req.body && req.body.name;

    if (!userID || !categoryID || !name)
        return res.status(400).send('Invalid request')

    try {
        await FilterModel.updateOne({ _id: categoryID, createdBy: userID }, { name: name });
        return res.status(200).send('Filter name modified');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Modify one filter category
    req: 
        param - filterID
        param - categoryID
*/
exports.addFilterCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !filterID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await FilterModel.updateOne({ _id: filterID, createdBy: userID }, {"$push": { categories : categoryID } })
        return res.status(200).send('Filter category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one filter category
    req: 
        param - filterID
        param - categoryID
*/
exports.removeFilterCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !filterID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await FilterModel.updateOne({ _id: filterID, createdBy: userID }, {"$pull": { categories : categoryID } })
        return res.status(200).send('Filter category removed');
    } catch (err) {
        return res.status(400).send(err);
    }
};