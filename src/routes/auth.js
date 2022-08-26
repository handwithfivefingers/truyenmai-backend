const express = require('express');
const { upload, requireSignin } = require('./../common-middleware/index');
const { signup, signin, signOut, checkUser, findUser, addUsertoProject } = require('../controller/auth');
const Authenticate = require('../controller/Authenticate/Authenticate');
const { acceptRequest } = require('../controller/project');

const router = express.Router();

const AuthenticateRoute = new Authenticate();

// Create User
router.post('/signup', upload.none(), AuthenticateRoute.Register);

// Login User
// router.post('/signin', upload.none(), signin);
router.post('/signin', upload.none(), AuthenticateRoute.Login );


// Login User
// router.post('/signin', upload.none(), signin);
router.post('/reset-password', upload.none(), AuthenticateRoute.ResetPassword );


// Sign out
router.post('/signout', upload.none(),  AuthenticateRoute.Logout);

// Login again
router.post('/auth', upload.none(), requireSignin, AuthenticateRoute.Authorization);

// Search User
router.post('/user', requireSignin, upload.none(), findUser);

// Send Request to User
router.post('/userapply', requireSignin, upload.none(), addUsertoProject);

module.exports = router;