'use strict'

// MessageSchema
module.exports = function Message(sequelize, DataTypes) {
  const MessageModel = sequelize.define('message', {   
    // Columns
    // conversationId: {
    //   type: DataTypes.UUID,
    // },

    // Should have a userId

    participant: DataTypes.STRING,

    type: DataTypes.STRING,

    direction: DataTypes.STRING,

    timestamp: DataTypes.DATE,

    text: DataTypes.TEXT,

    error: DataTypes.STRING,

    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    message: DataTypes.JSON,

    response: DataTypes.JSON,
    
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