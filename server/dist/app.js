"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: ".env" });
const express = require('express');
const app = express();
const connectToDB = require('./config/db');
const cors = require('cors');
connectToDB();
// Routes
const authRouter = require('./routes/authRouter');
app.use(cors({ origin: true }));
app.use('/auth', authRouter);
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});
exports.default = app;
