'use strict'

module.exports = function Conversation(sequelize, DataTypes) {
  const ConversationModel = sequelize.define('conversation', {
    
    // Columns
    // ConversationSchema
   
    participant: DataTypes.STRING,

    startTimestamp: DataTypes.DATE,
    
    endTimestamp: DataTypes.DATE,

    errors: DataTypes.JSON

  }, {
    
    getterMethods: {

    },

    setterMethods: {

    },

    classMethods: {

    },

    instanceMethods: {

      createAMessage: function(message) {
        return new Promise((resolve, reject) => {

          const UserModel = sequelize.import(`../User/index.js`);
          const MessageModel = sequelize.import(`../Message/index.js`);

          Promise.all([
            UserModel.findOne({
              where: {
                id: this.get('userId')
              }
            }),
            MessageModel.create(message)
          ])
          .then( ([usr, msg]) => 
            Promise.all([
              usr.addMessage(msg)
              .then(m => m.reload()),

              this.addMessage(msg)
              .then(m => m.reload())
            ])
          )
          .then(([userMessage, convoMessage]) => resolve(convoMessage))
          .catch(error => reject(error))

        })
      },

      findEndtimestamp: function() {
        return new Promise((resolve, reject) => {
          this.getMessages({
            attributes: [[sequelize.fn('MAX', sequelize.col('timestamp')), 'lastMessageAt']],
          })
          .then(([res]) => resolve(res.get('lastMessageAt')))
          .catch(error => reject(error))
        })
      }

    },

    hooks: {

    },

    validate: {

    },



  })

  return ConversationModel
}