const mongoose = require('mongoose')
import { UserModel } from "../models/user";
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

exports.test = function(req, res) {
    res.send('doggi dog')
};

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
            id = new mongoose.Types.ObjectId()

            // Create new user
            const newUser = {
                _id: id,
                email: email,
                googleId: crypted_gid,
            }

            UserModel.create(newUser).then(_ => {
                console.log('User created');
            }).catch(err => {
                stop = true
                res.status(500).json(err)
            });
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
