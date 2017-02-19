'use strict'

const _ = require('underscore')

// const ConversationModel = require('../models').Conversation

function ConversationArray() {
  // const _thirtyMinutes = 1800000
  const _thirtyMinutes = 30000
  const _conversations = {}

  const _endConversation = (userId, participantId) => () => {
    
    const convo = _conversations[userId][participantId].instance
    convo.findEndtimestamp()
    .then(endTimestamp => convo.update({ endTimestamp }))
    .then(convo => {
      delete _conversations[userId][participantId]
      console.log(`User ${convo.userId}'s conversation with ${convo.participant} has ended` +
                   ` at ${convo.endTimestamp.getHours()}:${convo.endTimestamp.getMinutes()}`)
    })
    .catch(console.error)
  }

  const toString = () => 
    _.keys(_conversations).map( userId => _.flatten([ userId, _.keys(_conversations[userId]) ]) )

  const saveConversation = (convo) => {
    const userId = convo.get('userId')
    const participantId = convo.get('participant')

    if(!_conversations[userId]) {
      _conversations[userId] = {}
    }
    _conversations[userId][participantId] = {
      instance: convo,
      scheduledDeletion: setTimeout(_endConversation(userId, participantId), _thirtyMinutes)
    }

    return _conversations[userId][participantId].instance
  }

  const getConversation = (userId, participantId) => {

    const conversation = _conversations[userId] && _conversations[userId][participantId]

    if(conversation) {
      clearTimeout(conversation.scheduledDeletion)
      conversation.scheduledDeletion = setTimeout(_endConversation(userId, participantId), _thirtyMinutes)

      return conversation.instance
    }
    else {
      return null
    }
  }

  return ({
    getConversation,
    saveConversation,
    toString
  })
}

module.exports = ConversationArray