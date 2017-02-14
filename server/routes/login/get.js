'use strict';

const auth = require('basic-auth')

const UserModel = require('../../models').User
const TokenModel = require('../../models').Token

// Login API endpoint, returning User, get the User instance from DB, return JWT
function getLoginHandler(req, res) {
  const { name: email, pass: password } = auth(req)

  // Find User instance
  UserModel.authenticate({ email, password })
  .then( user => Promise.all([
    user,
    user.generateToken()
    .then(jwt => TokenModel.create({ token: jwt }))
    .then(token => token.get('token'))
  ]))
  .then(([user, tokenString]) => 
    res.header('Auth', tokenString)
    .json(user.toPublicJSON()) 
  )
  .catch(error => res.status(401).json(error))
}

module.exports = getLoginHandler;