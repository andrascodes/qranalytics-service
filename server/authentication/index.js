'use strict';

const UserModel = require('../models').User;
const TokenModel = require('../models').Token;
const cryptojs = require('crypto-js')

module.exports = function jwtAuth(req, res, next) {
  const tokenString = req.get('Authorization').includes('Bearer') ? req.get('Authorization').substring(7) : ''
  Promise.all([
      
      TokenModel.findOne({
        where: {
          tokenHash: cryptojs.MD5(tokenString).toString()
        }
      }),
      UserModel.findByToken(tokenString)
  ])
  .then(([token, user]) => {
    if(!token || !user) throw new Error()
    req.token = token
    req.user = user
    next()
  })
  .catch(error => res.status(401).send())
}
