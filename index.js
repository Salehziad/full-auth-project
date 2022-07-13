'use strict';
require('dotenv').config();
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT;
const pasportSetUp = require('./passport');
const router = require('./routes/auth');
const authRouter=require('./auth/router/index');
const {db}=require('./models-connections');
const app = express();
app.use(express.json());
app.use(cookieSession({
    name: "session",
    keys: ["salhe"],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
app.use('/auth', router);
app.use('/auth',authRouter);
db.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is lestining 0n port ${PORT}`);
    });
  });