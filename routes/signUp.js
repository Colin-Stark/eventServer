const express = require('express');
const emailCheck = require('../helper/emailCheck');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the signup page'
    });
});

module.exports = router;