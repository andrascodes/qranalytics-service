'use strict';

const MessageModel = require('../../models').Message

const { 
  initMessage, 
  extractParticipant,
  extractType,
  extractTimestamp,
  extractError,
  extractText
} = require('./extractFunctions')

// Track API endpoint, POST a new messaging event
function postTrackHandler(req, res) {

  const user = req.user

  const message = initMessage(req.body, req.params.direction)
  .map(msg => extractParticipant(msg))
  .map(msg => extractType(msg))
  .map(msg => extractText(msg))
  .map(msg => extractTimestamp(msg))
  .map(msg => extractError(msg))
  .reduce((prev, msg) => msg)

  // Get the Conversation instance where the current message belongs to
  // based on message.participant
  // Delivery, Read and Echo messages don't need a Conversation instance to be logged
  // 1. Search in memory:
    // if it's not the first message
    // get the convoID
    // Conversation.findOne({ id: convoId })
  // 2. Create a new convo
    // Conversation.create()
    // save convoId in Memory
  // const conversation = 

  if(message instanceof Error) {
    return res.status(400).json({ error: message.toString() })
  }
  else {
    if(message.type === 'echo') {
      return res.status(200).json({ result: `Echo messages are not logged` })
    }
    else if(message.type === 'delivery') {
      // Get outgoing messages that
      // have a timestamp < this message's timestamp
      // have not been delivered
      // exchanged between the authenticated user and the partipant
      // Query the messages based on user.id
      MessageModel.update({
        delivered: true
      }, {
        where: {
          // userId: user.id,
          timestamp: {
            $lte: message.timestamp
          },
          participant: message.participant,
          error: null,
          delivered: false,
          direction: 'outgoing'
        }
      })
      .then(response => {
        // console.log(response) // [1]: number of rows updated
        res.status(200).json({ result: `${message.type} message logged` })
      })
      .catch(error => {
        // console.log(error)
        res.status(500).json({ error: message.toString() })
      })
    }
    else if(message.type === 'read') {
      // Get outgoing messages that
      // have a timestamp < this message's timestamp
      // have not been read
      // exchanged between the authenticated user and the partipant
      // Query the messages based on user.id
      MessageModel.update({
        read: true
      }, {
        where: {
          // userId: user.id,
          timestamp: {
            $lte: message.timestamp
          },
          participant: message.participant,
          error: null,
          read: false,
          direction: 'outgoing'
        }
      })
      .then(response => {
        // console.log(response) // [1]: number of rows updated
        res.status(200).json({ result: `${message.type} message logged` })
      })
      .catch(error => {
        // console.log(error)
        res.status(500).json({ error: message.toString() })
      })
    }
    else {
      MessageModel.create(message)
      .then(msg => {
        // console.log(msg)
        res.status(200).json({ result: `${msg.type} message logged` })
      })
      .catch(error => res.status(500).json({ error: message.toString() }))
    }
  }
}

module.exports = postTrackHandler;