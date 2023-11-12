//this loads all of our environment variables from .env file
require('dotenv').config()

// import express library
const express = require('express')

// we create an app variable to configure our server
const app = express()

// we configure mongoose to connect to our mongodb database
const mongoose = require('mongoose')

//instead of writing the database path as string we pass it from a variable
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

// this helps us to connect to our database so we know it's working correctly
const db = mongoose.connection

// this allows to see if there's a problem connecting to our database
db.on('error', (error) => console.error(error))

// once we connect to our database, we want to get the message that we're connected to our database
// we do this whenever we open the database
db.once('open', () => console.log('Connected to Database'))

//this code runs once we get the request but before it gets passed to our routes
app.use(express.json())

//we set our routes
const subscribersRouter = require('./routes/subscribers')

//the app that we want to use the subscribers route
app.use('/subscribers', subscribersRouter)

// we listen to this port
app.listen(3000, () => console.log('Server Started'))