const mongoose = require('mongoose')
import { ITask, TaskModel } from "../models/task";

// name: string;
// _id: Schema.Types.ObjectId;
// createdBy: Schema.Types.ObjectId;
// description: string;
// time_start: Schema.Types.Date;
// time_end: Schema.Types.Date;
// categories: [Schema.Types.ObjectId];

// Return all tasks
exports.getAllTasks = async function(req, res) {
    const userID = req.cookies.auth;

    if (!userID)
        return res.status(400).send('Invalid request');

    try {
        const tasks = await TaskModel.find({ createdBy: userID }).exec();
        if (!tasks)
            return res.status(404).send('No tasks found for the user');
        return res.status(200).send(tasks);
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Get one task
    req: 
        - taskID
*/
exports.getOneTask = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;

    if (!userID || !taskID)
        return res.status(400).send('Invalid request');

    try {
        const task = await TaskModel.findOne({ _id: taskID, createdBy: userID }).exec();
        if (!task)
            return res.status(404).send('No tasks found for the user');
        return res.status(200).send(task);
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Add one task
    req: ITask
*/
exports.addTask = async function(req, res) {
    const userID = req.cookies.auth;
    const task: ITask = req.body

    if (!userID || !task)
        return res.status(400).send('Invalid request');

    task._id = new mongoose.Types.ObjectId();
    task.createdBy = userID;

    try {
        await TaskModel.insertMany([task]);
        return res.status(200).send('Task created');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Delete one task
    req: 
    - taskID
*/
exports.deleteTask = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    
    if (!userID || !taskID)
    return res.status(400).send('Invalid request');

    try {
        await TaskModel.deleteOne({ _id: taskID, createdBy: userID });
        return res.status(200).send('Task deleted');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task name
    req: 
        - taskID
        - name
*/
exports.modifyTaskName = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
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

/* Modify one task description
    req: 
        - taskID
        - description
*/
exports.modifyTaskDescription = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
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

/* Modify one task category
    req: 
        - taskID
        - categoryID
*/
exports.addTaskCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    const categoryID = req.body && req.body.categoryID;

    if (!userID || !taskID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, {"$push": { categories : categoryID } })
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task category
    req: 
        - taskID
        - categoryID
*/
exports.removeTaskCategory = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    const categoryID = req.body && req.body.categoryID;

    if (!userID || !taskID || !categoryID)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, {"$pull": { categories : categoryID } })
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task start date
    req: 
        - taskID
        - start
*/
exports.modifyTaskStart = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    const start = req.body && req.body.start;

    if (!userID || !taskID || !start)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { time_start: new Date(start)})
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task end date
    req: 
        - taskID
        - end
*/
exports.modifyTaskEnd = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    const end = req.body && req.body.end;

    if (!userID || !taskID || !end)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { time_end: new Date(end)})
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};

/* Modify one task tab
    req: 
        - taskID
        - tab
*/
exports.modifyTab = async function(req, res) {
    const userID = req.cookies.auth;
    const taskID = req.body && req.body.taskID;
    const tab = req.body && req.body.tab;

    if (!userID || !taskID || !tab)
        return res.status(400).send('Invalid request');

    try {
        await TaskModel.updateOne({ _id: taskID, createdBy: userID }, { tab: tab})
        return res.status(200).send('Task category added');
    } catch (err) {
        return res.status(400).send(err);
    }
};