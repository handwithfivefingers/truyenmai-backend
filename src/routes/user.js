const express = require('express');
const { upload, requireSignin } = require('./../common-middleware/index');

const UserRouter = require('../controller/User/User');

const router = express.Router();

const UserRoute = new UserRouter();

router.post('/invite', upload.none(), UserRoute.InviteFriends);

module.exports = router;
