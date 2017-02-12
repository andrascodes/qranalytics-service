'use strict'

const config = require('./server/config')
const app = require('./server')

// process.env.PORT lets the port to be set by Heroku
const PORT = process.env.PORT
app.set('port', PORT)

const server = app.listen(app.get('port'), () =>
  console.log(`Express app is listening at \n${config.serverUrl}`))