"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const connectToDB = require('./config/db');
const cors = require('cors');
connectToDB();
// Routes
const authRouter = require('./routes/authRouter');
app.use(cors({ origin: true }));
app.use('/auth', authRouter);
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
exports.default = app;
