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

app.use((req, res, next) => {
    const urlParts = req.originalUrl.split("/");
    const lastPart = urlParts.pop();
    if (lastPart === 'favicon.ico' || lastPart === 'favicon.png') {
        return res.sendStatus(204);
    }
    return next();
});



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


module.exports = app;