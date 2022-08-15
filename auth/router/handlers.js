'use strict';

const {
  users
} = require('../../models-connections');
const {
  signupUsers
} = require('../../models-connections');
console.log(signupUsers, "ddddddddddddddddd");

const {
  signInUsers
} = require('../../models-connections');
const {
  v4: uuidv4
} = require('uuid');
const bcrypt = require('bcrypt');

async function handleSignup(req, res, next) {
  try {
    const user = req.body
    if (Object.keys(user).length === 0) {}
    let x = user.displayName;
    if (x.length === 0) {
      res.status(403).send('no data entered')
    }
    let UuCode = uuidv4();
    console.log({
      UuCode
    });
    var hashed = await users.beforeCreate(user);
    let userRecord = await users.create({
      displayName: req.body.displayName,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
      uuCode: UuCode
    });

    let mailed = await users.sendEmail(user);
    const output = {
      displayName: userRecord.displayName,
      email: userRecord.email,
      isVerify: userRecord.isVerify,
      role: userRecord.role,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    let x = req.user.isVerify;
    if (x === true) {
      res.status(200).json(user);
    } else {
      res.send('email did not verified please check your email')
    }

  } catch (e) {
    next(e);
  }
}

async function verifyCode(req, res, next) {
  try {
    let code = req.body.code;
    let user = await users.findOne({
      where: {
        uuCode: code
      }
    });
    let usercode = user.uuCode;
    if (code === usercode) {
      let newUser = await user.update({
        isVerify: true
      })
      let h = newUser.displayName
      if (newUser) {
        res.send(newUser)
        next();
      }
    }
  } catch (e) {
    console.log(e);
  }

}

module.exports = {
  handleSignup,
  handleSignin,
  verifyCode,
}