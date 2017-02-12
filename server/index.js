'use strict'

// Setup and export the Express app
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/login', (req, res) => res.send('Login'))
// app.post('/login', (req, res) => {

// })

module.exports = app