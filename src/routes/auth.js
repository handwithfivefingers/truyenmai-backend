const express = require('express');
const { upload, requireSignin } = require('./../common-middleware/index');
const { signup, signin, signOut, checkUser, findUser, addUsertoProject } = require('../controller/auth');
const Authenticate = require('../controller/Authenticate/Authenticate');
const { acceptRequest } = require('../controller/project');

const router = express.Router();

const AuthenticateRoute = new Authenticate();

/**
 * @api {post} /signup Register
 * @apiName Register
 * @apiGroup Authenticate
 *
 * @apiSuccess { Array } data
 */
router.post('/signup', upload.none(), AuthenticateRoute.Register);
/**
 * @api {post} /signin Login
 * @apiName GetAll
 * @apiGroup Authenticate
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess { Array } data
 */
router.post('/signin', upload.none(), AuthenticateRoute.Login);
/**
 * @api {post} /reset-password ResetPassword
 * @apiName ResetPassword
 * @apiGroup Authenticate
 *
 * @apiSuccess { Array } data
 */
router.post('/reset-password', upload.none(), AuthenticateRoute.ResetPassword);
/**
 * @api {post} /signout Logout
 * @apiName Logout
 * @apiGroup Authenticate
 *
 * @apiSuccess { Array } data
 */
router.post('/signout', upload.none(), AuthenticateRoute.Logout);
/**
 * @api {post} /auth Authorization
 * @apiName Authorization
 * @apiGroup Authenticate
 *
 * @apiSuccess { String } message
 */
router.post('/auth', upload.none(), requireSignin, AuthenticateRoute.Authorization);

// Search User
router.post('/user', requireSignin, upload.none(), findUser);

// Send Request to User
router.post('/userapply', requireSignin, upload.none(), addUsertoProject);

module.exports = router;
