const express = require('express');
const { upload } = require('./../common-middleware/index');
const { signup, signin, signOut } = require('../controller/auth');

const router = express.Router();

// Create User
router.post('/signup', upload.none(), signup);

// Login User
router.post('/signin', upload.none(), signin);

router.post('/signout', upload.none(), signOut);
module.exports = router;