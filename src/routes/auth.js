const express = require('express');

const { signup,signin } = require('../controller/auth');

const router = express.Router();

// Create User
router.post('/signup', signup);

// Login User
router.post('/signin', signin);

module.exports = router;