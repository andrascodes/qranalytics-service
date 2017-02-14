'use strict'

// MessageSchema
module.exports = function Message(sequelize, DataTypes) {
  const MessageModel = sequelize.define('message', {   
    // Columns
    // conversationId: {
    //   type: DataTypes.UUID,
    // },

    // participantPSID: DataTypes.STRING,

    // type: DataTypes.STRING,

    // timestamp: DataTypes.DATE,

    // direction: DataTypes.STRING,

    // delivered: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },

    // read: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },

    message: DataTypes.JSON,
    
  }, {
    
    getterMethods: {

    },

    setterMethods: {

    },

    classMethods: {

    },

    instanceMethods: {

    },

    hooks: {

    },

    validate: {

    },



  })

  return MessageModel
}