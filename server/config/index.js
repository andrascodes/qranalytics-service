'use strict'

const config = {
    // Secret key for JWT signing and encryption
    jwtPassword: 'qwerty098',
    cryptoPassword: 'abc123!@#!'
}

// Check the environment
const env = process.env.NODE_ENV || 'development'
// Set Database connection URL
if(env === 'production') {
    config.databaseUrl = process.env.DATABASE_URL
    config.serverUrl = `${process.env.HEROKU_SERVER_URL}:${process.env.PORT}/`
}
else {
    config.databaseUrl = process.env.LOCAL_DATABASE_URL
    config.serverUrl = `${process.env.LOCAL_SERVER_URL}:${process.env.PORT}/`
}

const resyncDb = process.env.FORCE_DB
if(resyncDb.toUpperCase() === 'TRUE') {
    console.log('DB set to resync.')
    config.dbOptions = { force: true }
}
else {
    console.log('DB is not being resynced.')
    config.dbOptions = {}
}

module.exports = config;