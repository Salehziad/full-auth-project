'use strict';

const base64 = require('base-64');
const {
  users
} = require('../../models-connections');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next()
  }

  let basic = req.headers.authorization.split(' ').pop();

  let [displayName, pass] = base64.decode(basic).split(':');
  try {
    req.user = await users.authenticateBasic(displayName, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
}