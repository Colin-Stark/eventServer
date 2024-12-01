const express = require('express');
const validateSenecaEmail = require('../helper/emailCheck');
const { hashPasswordMiddleware } = require('../helper/passwordMatch');
const { User } = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the signup page'
    });
});

const createNewUser = async (req, res) => {
    const { email, hashedPassword, userType } = req.body;
    const passWord = req.hashedPassword;
    const newUser = await User.create({ email, password: passWord, userType });
    return newUser.save();
};

const handleRegistrationError = (error, res) => {
    if (error.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: `Could not create user because ${error.message}` });
};

router.post('/', validateSenecaEmail, hashPasswordMiddleware, async (req, res) => {

    try {
        await createNewUser(req, res);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        handleRegistrationError(error, res);
    }

});



module.exports = router;