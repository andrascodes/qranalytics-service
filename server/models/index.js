'use strict'

// Setup and export the DB
const Sequelize = require('sequelize');

const config = require('../config');
const ConversationArray = require('../lib/ConversationArray')

const sequelize = new Sequelize(config.databaseUrl);

const db = {};

db.User = sequelize.import(`${__dirname}/User/index.js`);
db.Token = sequelize.import(`${__dirname}/Token/index.js`);
db.Message = sequelize.import(`${__dirname}/Message/index.js`);
db.Conversation = sequelize.import(`${__dirname}/Conversation/index.js`);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User to Conversation: One to Many relationship
db.Conversation.belongsTo(db.User);
db.User.hasMany(db.Conversation);

// User to Message: One to Many relationship
db.Message.belongsTo(db.User);
db.User.hasMany(db.Message);

// Conversation to Message: One to Many relationship
db.Message.belongsTo(db.Conversation); 
db.Conversation.hasMany(db.Message);

db.activeConversations = new ConversationArray();

module.exports = db;