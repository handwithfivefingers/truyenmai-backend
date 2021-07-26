const express = require('express');
const { upload } = require('./../common-middleware/index');
const { signup,signin } = require('../controller/auth');

const router = express.Router();

// Create User
router.post('/signup', upload.none(), signup);

// Login User
router.post('/signin', upload.none(), signin);
 
module.exports = router;