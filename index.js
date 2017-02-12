'use strict'

const config = require('./server/config')

console.log(config.serverUrl ? 'success' : 'failure')