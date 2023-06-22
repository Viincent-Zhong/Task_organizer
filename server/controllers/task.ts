const mongoose = require('mongoose')
import { ITask, TaskModel } from "../models/task";

// Return all tasks
exports.getAllTasks = async function(req, res) {
    const userID = req.signedCookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request');

    try {
        const tasks = await TaskModel.find({ createdBy: userID }).exec();
        return res.status(200).send(tasks);
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Get one task
    req: 
        param - id
*/
exports.getOneTask = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;

    if (!userID || !taskID)
        return res.status(400).send('Invalid request');

    try {
        const task = await TaskModel.findOne({ _id: taskID, createdBy: userID }).exec();
        if (!task)
            return res.status(404).send('Did not found specified task');
        return res.status(200).send(task);
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Add one task
    req:
        body - ITask
*/
exports.addTask = async function(req, res) {
    const userID = req.signedCookies.auth;
    const task: ITask = req.body

    if (!userID || !task)
        return res.status(400).send('Invalid request');

    task._id = new mongoose.Types.ObjectId();
    task.createdBy = userID;
    try {
        await TaskModel.insertMany([task]);
        return res.status(200).send(task);
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Delete one task
    req: 
        param - id
*/
exports.deleteTask = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    
    if (!userID || !taskID)
    return res.status(400).send('Invalid request');

    try {
        await TaskModel.deleteOne({ _id: taskID, createdBy: userID });
        return res.status(200).send('Task deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify task name
    req: 
        param - id
        body - name
*/
exports.modifyTaskName = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const name = req.body && req.body.name;

    if (!userID || !taskID || !name)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { name: name });
        return res.status(200).send('Task name modified');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify task description
    req: 
        param - id
        body - description
*/
exports.modifyTaskDescription = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const description = req.body && req.body.description;

    if (!userID || !taskID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { description: description });
        return res.status(200).send('Task description modified');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Add category to task
    req: 
        param - id
        param - categoryId
*/
exports.addTaskCategory = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !taskID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, {"$push": { categories : categoryID } })
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Remove category from task
    req: 
        param - id
        param - categoryId
*/
exports.removeTaskCategory = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const categoryID = req.params.categoryId;

    if (!userID || !taskID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, {"$pull": { categories : categoryID } })
        return res.status(200).send('Task category removed');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify task start date
    req: 
        param - id
        body - start
*/
exports.modifyTaskStart = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const start = req.body && req.body.start;

    if (!userID || !taskID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { time_start: start ? new Date(start) : null})
        return res.status(200).send('Task start date modified');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify task end date
    req: 
        param - id
        body - end
*/
exports.modifyTaskEnd = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const end = req.body && req.body.end;

    if (!userID || !taskID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { time_end: end ? new Date(end) : null})
        return res.status(200).send('Task end date modified');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task tab
    req: 
        param - id
        param - tabId
*/
exports.modifyTab = async function(req, res) {
    const userID = req.signedCookies.auth;
    const taskID = req.params.id;
    const tab = req.params.tabId;

    if (!userID || !taskID || !tab)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { tab: tab})
        return res.status(200).send('Task tab modified');
    } catch (err) {
        return res.status(400).send(err);
    }
};