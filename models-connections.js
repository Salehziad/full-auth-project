'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./auth/models/users/users');
const signUpSchema = require('./auth/models/logs/sign-up-logs');
// const verifySignUpSchema = require('./auth/logs/verify-sugn-up-logs');
// const signInSchema = require('./auth/logs/sign-in-logs');
// console.log(signUpSchema)
// const GoalsModel = require('./api.v2/models/goals/model');
// const foodModel = require('./api.v2/models/food/model');
// const Collection = require('./api.v2/models/data-collection');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
// const food = foodModel(sequelize, DataTypes);
// const goals = GoalsModel(sequelize, DataTypes);

// let x=signUpSchema(sequelize, DataTypes)
// console.log({x})
module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  signupUsers:signUpSchema(sequelize, DataTypes),
  // verifySignUp:verifySignUpSchema(sequelize, DataTypes),
  // signInUsers:signInSchema(sequelize, DataTypes),
  // food: new Collection(food),
  // goals: new Collection(goals),
};
