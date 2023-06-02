const mongoose = require('mongoose')
import { UserModel } from "../models/user";
import { CategoriesModel } from "../models/category";
import { FiltersModel } from "../models/filter";
import { TabsModel } from "../models/tab";
import { TasksModel } from "../models/task";
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

exports.test = function(req, res) {
    res.send('doggi dog')
};

function initUserRelatedModels(userID, tabId, categoryId, filterId, taskId) {
    // Invalid userID
    if (!mongoose.Types.ObjectId.isValid(userID))
        throw Error('Invalid user')

    // Initiating all models required
    TabsModel.create({_id: tabId, createdBy: userID, tabs: [] })
    CategoriesModel.create({_id: categoryId, createdBy: userID, categories: [] })
    FiltersModel.create({_id: filterId, createdBy: userID, filters: [] })
    TasksModel.create({_id: taskId, createdBy: userID, tasks: [] })

    return {tabId, categoryId, filterId, taskId}
}

exports.logging_in = async function(req, res) {
    // Cookie already setup
    if (req.cookies.auth)
        return res.status(200).send('User already connected');
    const gc = req.body.gcredential;
    if (!gc)
        return res.status(400).send('Invalid body')
    // Decrypt credential
    const decryptedBytes = CryptoJS.AES.decrypt(gc, process.env.ENCRYPT_KEY);
    const credentials = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // Decode jwt credential
    const decoded = jwt.decode(credentials);
    const email = decoded.email;
    const crypted_gid = CryptoJS.AES.encrypt(decoded.sub, process.env.ENCRYPT_KEY).toString();

    await UserModel.findOne({email: email}).then(user => {
        var stop = false;
        var id;
        // User not found
        if (!user) {
            const tabId = new mongoose.Types.ObjectId()
            const categoryId = new mongoose.Types.ObjectId()
            const filterId = new mongoose.Types.ObjectId()
            const taskId = new mongoose.Types.ObjectId()        
            const id = new mongoose.Types.ObjectId()

            // Create new user
            const newUser = {
                _id: id,
                email: email,
                googleId: crypted_gid,
                tasks: taskId,
                categories: categoryId,
                filters: filterId,
                tabs: tabId
            }

            UserModel.create(newUser).then(_ => {
                console.log('User created');
            }).catch(err => {
                stop = true
                res.status(500).json(err)
            });

            // Create a categories, filters, tabs, tasks models
            try {
                initUserRelatedModels(id, tabId, categoryId, filterId, taskId);
            } catch (error) {/* Error */}
        } else {
            id = user._id;
        }
        // Setting new cookie
        if (!stop) {
            res.cookie('auth', id, {
                // httpOnly: true,
                // secure: true,
                // sameSite: 'strict',
                signed: true,
                maxAge: 10800000 // Expires in 3 hours
            });
            res.status(201).send('Sending new cookie');
        }
    }).catch(err => {
        // Error
        res.status(500).json(err)
    })
};
