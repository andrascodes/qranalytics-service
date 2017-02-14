'use strict';

const auth = require('basic-auth')

const UserModel = require('../../models').User
const TokenModel = require('../../models').Token

// Singup API endpoint, save new User, return JWT
function postLoginHandler(req, res) {
  const { name: email, pass: password } = auth(req)

  // Create User instance with email and password
  UserModel.create({ email, password })
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
  .catch(error => {
    if(error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: "Email already exists in the database."
      })
    }
    return res.status(500).json(error)
  })

}

module.exports = postLoginHandler;