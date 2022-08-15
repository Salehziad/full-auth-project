'use strict';
const express = require('express');
const authRouter = express.Router();
const basicAuth = require('../middleware/basic.js');
const {
  handleSignin,
  handleSignup,
  verifyCode,
} = require('./handlers.js');
authRouter.post('/signup', handleSignup);
authRouter.post('/verify',verifyCode)
authRouter.post('/signin', basicAuth, handleSignin);
module.exports = authRouter;
