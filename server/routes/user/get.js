'use strict';

// const _ = require('underscore')

const UserModel = require('../../models').User
const MessageModel = require('../../models').Message

// User editing API endpoint, edit the User
function getUserHandler(req, res) {
  
  const user = req.user

  user.getConversations({
    include: [{ model: MessageModel }]
  })
  .then(result => res.status(200).json(result))
  .catch(error => res.status(500).json({ result: error.toString() }))

}

module.exports = getUserHandler;