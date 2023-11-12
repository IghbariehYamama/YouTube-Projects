// This allows us to create a model that we can use to interact with the database in a really easy way
const mongoose = require('mongoose')

// This takes a javascript object that contains keys for all the different properties for our subscriber
const subscriberSchema = new mongoose.Schema({
    // We want the name to always be required
    name:{
        type: String,
        required: true
    },
    subscribedToChannel:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

// This model function takes two arguments:
// The 1st one is the name of the model in our database
// The 2nd one is the schema that corresponds to that model
// The reason we need this model function is that when we export this and import it in a different file,
// this model allows us to interact directly with the database using the schema that is above
module.exports = mongoose.model('Subscriber', subscriberSchema)