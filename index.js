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
        console.log(`Connecting to MongoDB at ${process.env.mango_uri} with a port number of ${process.env.PORT}`);
        // await mongoose.connect(process.env.mongo_uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    // const PORT = process.env.port;
    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
    // });
};

connectDB();


module.exports = { app, startServer };