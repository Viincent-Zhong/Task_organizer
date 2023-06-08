const mongoose = require('mongoose')
import { IFilter, FilterModel } from "../models/filter";

// Get all filters
exports.getAllFilters = async function(req, res) {
    const userID = req.cookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request')
    try {
        const filters = await FilterModel.find({ createdBy: userID }).exec();
        return res.status(200).send(filters);
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Add a filter
    req:
        body - IFilter
*/
exports.addFilter = async function(req, res) {
    const userID = req.cookies.auth;
    const filter: IFilter = req.body

    if (!userID || !filter)
        return res.status(400).send('Invalid request')

    filter._id = new mongoose.Types.ObjectId();
    filter.createdBy = userID;

    try {
        await FilterModel.insertMany([filter]);
        return res.status(200).send('Filter created');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Delete a filter
    req:
        param - id
*/
exports.deleteFilter = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;

    if (!userID || !filterID)
        return res.status(400).send('Invalid request')

    try {
        await FilterModel.deleteOne({ _id: filterID, createdBy: userID });
        return res.status(200).send('Filter deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Modify a filter name
    req:
        param - id
        body - name
*/
exports.modifyFilterName = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;
    const name = req.body && req.body.name;

    if (!userID || !filterID || !name)
        return res.status(400).send('Invalid request')

    try {
        await FilterModel.updateOne({ _id: filterID, createdBy: userID }, { name: name });
        return res.status(200).send('Filter name modified');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Add one filter category
    req: 
        param - id
        param - categoryID
*/
exports.addFilterCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !filterID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await FilterModel.updateOne({ _id: filterID, createdBy: userID }, {"$push": { filters : categoryID } })
        return res.status(200).send('Filter filter added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Remove one filter category
    req: 
        param - id
        param - categoryID
*/
exports.removeFilterCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const filterID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !filterID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await FilterModel.updateOne({ _id: filterID, createdBy: userID }, {"$pull": { filters : categoryID } })
        return res.status(200).send('Filter filter removed');
    } catch (err) {
        return res.status(400).send(err);
    }
};