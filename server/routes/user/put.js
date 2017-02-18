'use strict';

const _ = require('underscore')

const UserModel = require('../../models').User

// User editing API endpoint, edit the User
function putUserHandler(req, res) {
  
  const user = req.user
  const attributes = _.pick(req.body, 'password')

  user.update(attributes)
  .then(user => res.json(user.toPublicJSON()))
  .catch(error => res.status(400).json(error))

}

module.exports = putUserHandler;