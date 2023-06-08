const mongoose = require('mongoose')
import { ITab, TabModel } from "../models/tab";

// Get all tabs
exports.getAllTab = async function(req, res) {
    const userID = req.cookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request')
    try {
        const categories = await TabModel.find({ createdBy: userID }).exec();
        return res.status(200).send(categories);
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Add a tab
    req:
        body - ITab
*/
exports.addTab = async function(req, res) {
    const userID = req.cookies.auth;
    const tab: ITab = req.body

    if (!userID || !tab)
        return res.status(400).send('Invalid request')

    tab._id = new mongoose.Types.ObjectId();
    tab.createdBy = userID;

    try {
        await TabModel.insertMany([tab]);
        return res.status(200).send('Tab created');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Delete a tab
    req:
        param - id
*/
exports.deleteTab = async function(req, res) {
    const userID = req.cookies.auth;
    const tabID = req.params.id;

    if (!userID || !tabID)
        return res.status(400).send('Invalid request')

    try {
        await TabModel.deleteOne({ _id: tabID, createdBy: userID });
        return res.status(200).send('Tab deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
}

/* Modify a tab name
    req:
        param - id
        body - name
*/
exports.modifyTabName = async function(req, res) {
    const userID = req.cookies.auth;
    const tabID = req.params.id;
    const name = req.body && req.body.name;

    if (!userID || !tabID || !name)
        return res.status(400).send('Invalid request')

    try {
        await TabModel.updateOne({ _id: tabID, createdBy: userID }, { name: name });
        return res.status(200).send('Tab name modified');
    } catch (err) {
        return res.status(400).send(err);
    }
}
