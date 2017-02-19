'use strict'

// Setup and export the Express app
const express = require('express')
const bodyParser = require('body-parser')

const authenticate = require('./authentication')

const postLoginHandler = require('./routes/login/post')
const getLoginHandler = require('./routes/login/get')
const postTrackHandler = require('./routes/track/post')
const postLogoutHandler = require('./routes/logout/post')
const putUserHandler = require('./routes/user/put')
const getUserHandler = require('./routes/user/get')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Login API endpoint, returning User, get the User instance from DB, return JWT
app.get('/login', getLoginHandler)

// Singup API endpoint
app.post('/login', postLoginHandler)

// Logout API endpoint
app.post('/logout', authenticate, postLogoutHandler)

// Track API endpoint, should be authenticated
app.post('/track/:direction', authenticate, postTrackHandler)

// User editing API endpoint, should be authenticated
app.put('/user', authenticate, putUserHandler)

app.get('/user', authenticate, getUserHandler)

module.exports = app