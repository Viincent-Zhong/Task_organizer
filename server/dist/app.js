"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: ".env" });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectToDB = require('./config/db');
const cors = require('cors');
connectToDB();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
// Routes
const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');
const categoryRouter = require('./routes/categoryRouter');
const tabRouter = require('./routes/tabRouter');
const filterRouter = require('./routes/filterRouter');
app.use('/auth', authRouter);
app.use('/task', taskRouter);
app.use('/category', categoryRouter);
app.use('/tab', tabRouter);
app.use('/filter', filterRouter);
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});
exports.default = app;
