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
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
exports.test = function (req, res) {
    res.send('doggi dog');
};
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
                id = new mongoose.Types.ObjectId();
                // Create new user
                const newUser = {
                    _id: id,
                    email: email,
                    googleId: crypted_gid,
                };
                user_1.UserModel.create(newUser).then(_ => {
                    console.log('User created');
                }).catch(err => {
                    stop = true;
                    res.status(500).json(err);
                });
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
