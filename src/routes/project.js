const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createProject, updateProject } = require('../controller/project');

router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);
router.post('/project/update', upload.none(), updateProject)
module.exports = router;