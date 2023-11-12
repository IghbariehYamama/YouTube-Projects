//our entire application uses express
const express = require('express')

//we want the router portion of express
const router = express.Router()

// This is going to pull in our subscriber which we've created in the subscriber model
const Subscriber = require('../models/subscriber')

// This is the basic shell of all the different routes that we're going to create

// Getting all subscribers
router.get('/', async (req, res) => {
    // Inside the try we're going to get all the different subscribers for our model
    try {
        // we need to make sure we await this because this is an asynchronous method
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch (err){
        // We send the error as json because this is a JSON API
        // We send the status code 500, which means there's an error on our server
        // , which means the actual server (in our case, our database) had some kind of error
        // , which caused the actual transaction not to work, and it had nothing to do with the actual user or client using the API
        // , it was entirely our fault
        res.status(500).json({ message: err.message })
    }
})

// Getting one subscriber
// :id => we're getting a parameter
router.get('/:id', getSubscriber,(req, res) => {
    // instead of writing the same code every time, we use the getSubscriber function
    res.json(res.subscriber)
})

// Creating one subscriber
// we make this an asynchronous function
// , because we're trying to save the subscribers model
// , which is an asynchronous operation
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        // The status 201 means successfully created object
        // if we don't send a status, the default one is 200, which means everything was successful
        // when we use a post route, we always make sure to send a 201 status to make it more specific
        res.status(201).json(newSubscriber)
    }
    catch (err){
        // a 400 status means the user sent us a bad data
        res.status(400).json({ message: err.message })
    }
})

// Updating one subscriber
// put updates all the information of the subscriber all at once
// while patch updates only what the user passes
// if he passes only name, we update only name
router.patch('/:id', getSubscriber, async (req, res) => {
    // instead of writing the same code every time, we use the getSubscriber function
    if (req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }
    catch (err){
        res.status(400).json({ message: err.message })
    }
})

// Deleting one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    // instead of writing the same code every time, we use the getSubscriber function
    // it is an async function because we're going to be calling this using try catch
    try {
        await res.subscriber.deleteOne()
        res.json({ message: 'Deleted Subscriber Successfully' })
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})

// instead of writing the same code every time, we write a middleware function
async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            // status 404 means we are not able to find something (we are not able to find the subscriber in our case)
            // we use return because if there's no subscriber, we want to immediately leave this function and no longer go on
            return res.status(404).json({ message:'Cannot Find Subscriber' })
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    // this next function means we've successfully completed the get function
    // , so next will allow us to move on to the next piece of middleware or the actual request itself
    next()
}

module.exports = router