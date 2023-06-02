"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const user_1 = require("../models/user");
const category_1 = require("../models/category");
const filter_1 = require("../models/filter");
const tab_1 = require("../models/tab");
const task_1 = require("../models/task");
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
exports.test = function (req, res) {
    res.send('doggi dog');
};
function initUserRelatedModels(userID, tabId, categoryId, filterId, taskId) {
    // Invalid userID
    if (!mongoose.Types.ObjectId.isValid(userID))
        throw Error('Invalid user');
    // Initiating all models required
    tab_1.TabsModel.create({ _id: tabId, createdBy: userID, tabs: [] });
    category_1.CategoriesModel.create({ _id: categoryId, createdBy: userID, categories: [] });
    filter_1.FiltersModel.create({ _id: filterId, createdBy: userID, filters: [] });
    task_1.TasksModel.create({ _id: taskId, createdBy: userID, tasks: [] });
    return { tabId, categoryId, filterId, taskId };
}
exports.logging_in = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cookie already setup
        if (req.cookies.auth)
            return res.status(200).send('User already connected');
        const gc = req.body.gcredential;
        if (!gc)
            return res.status(400).send('Invalid body');
        // Decrypt credential
        const decryptedBytes = CryptoJS.AES.decrypt(gc, process.env.ENCRYPT_KEY);
        const credentials = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // Decode jwt credential
        const decoded = jwt.decode(credentials);
        const email = decoded.email;
        const crypted_gid = CryptoJS.AES.encrypt(decoded.sub, process.env.ENCRYPT_KEY).toString();
        yield user_1.UserModel.findOne({ email: email }).then(user => {
            var stop = false;
            var id;
            // User not found
            if (!user) {
                const tabId = new mongoose.Types.ObjectId();
                const categoryId = new mongoose.Types.ObjectId();
                const filterId = new mongoose.Types.ObjectId();
                const taskId = new mongoose.Types.ObjectId();
                const id = new mongoose.Types.ObjectId();
                // Create new user
                const newUser = {
                    _id: id,
                    email: email,
                    googleId: crypted_gid,
                    tasks: taskId,
                    categories: categoryId,
                    filters: filterId,
                    tabs: tabId
                };
                user_1.UserModel.create(newUser).then(_ => {
                    console.log('User created');
                }).catch(err => {
                    stop = true;
                    res.status(500).json(err);
                });
                // Create a categories, filters, tabs, tasks models
                try {
                    initUserRelatedModels(id, tabId, categoryId, filterId, taskId);
                }
                catch (error) { /* Error */ }
            }
            else {
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
            res.status(500).json(err);
        });
    });
};
