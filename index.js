'use strict'

const config = require('./server/config')
const app = require('./server')
const db = require('./server/models')

// process.env.PORT lets the port to be set by Heroku
const PORT = process.env.PORT
app.set('port', PORT)

// {force: true}
db.sequelize.sync(config.dbOptions).then( () => {
	// START SERVER
	const server = app.listen(app.get('port'), () =>
    console.log(`Express app is listening at \n${config.serverUrl}`))
})

