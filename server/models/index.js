'use strict'

// Setup and export the DB
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.databaseUrl);

const db = {};

db.User = sequelize.import(`${__dirname}/User/index.js`);
db.Token = sequelize.import(`${__dirname}/Token/index.js`);
db.Message = sequelize.import(`${__dirname}/Message/index.js`);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;