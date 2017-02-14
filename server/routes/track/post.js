'use strict';

const MessageModel = require('../../models').Message

// Track API endpoint, POST a new messaging event
function postTrackHandler(req, res) {
  // console.log('req.user')
  // console.log(req.user)
  // console.log('req.token')
  // console.log(req.token)

  MessageModel.create({ message: req.body })
  .then(message => {
    console.log(message)
    res.status(200).json(message)
  })
}

module.exports = postTrackHandler;