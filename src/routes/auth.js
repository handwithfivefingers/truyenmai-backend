const express = require('express');
const { upload, requireSignin } = require('./../common-middleware/index');
const { signup, signin, signOut, checkUser, findUser, addUsertoProject } = require('../controller/auth');

const router = express.Router();

// Create User
router.post('/signup', upload.none(), signup);

// Login User
router.post('/signin', upload.none(), signin);

// Sign out
router.post('/signout', upload.none(), signOut);

// Login again
router.post('/auth/required', upload.none(), requireSignin, checkUser);

// Search User
router.post('/user', requireSignin, upload.none(), findUser);

// Send Request to User
router.post('/userapply', requireSignin, upload.none(), addUsertoProject);

module.exports = router;