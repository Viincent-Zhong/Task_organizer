"use strict";
const auth = require('../controllers/auth');
const express = require('express');
const authRouter = express.Router();
authRouter.get('/', auth.test);
module.exports = authRouter;
