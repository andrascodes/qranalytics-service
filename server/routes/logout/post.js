'use strict';

const TokenModel = require('../../models').Token

// Singup API endpoint, save new User, return JWT
function postLogoutHandler(req, res) {
  req.token.destroy()
  .then(() => res.status(204).send())
  .catch(() => res.status(500).send())
}

module.exports = postLogoutHandler;