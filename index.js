const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

/**
 * Routes link
 */
const signUp = require('./routes/signUp');


/**
 * MiddleWares 
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * Routes
 */
app.use("/signup", signUp);

/**
 * Default Route
 */
app.get('/', (req, res) => {
    res.send('Welcome to the SEENECTASK API');
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri);
    } catch (error) {
        throw new Error('MongoDB connection failed');
    }
};

connectDB();


module.exports = { app, startServer, connectDB };