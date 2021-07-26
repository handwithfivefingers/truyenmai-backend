const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const {upload, requireSignin} = require('./../common-middleware/index');
const { createProject } = require('../controller/project');
router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);

module.exports = router;