"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const connectToDB = require('./config/db');
connectToDB();
// Routes
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);
exports.default = app;
