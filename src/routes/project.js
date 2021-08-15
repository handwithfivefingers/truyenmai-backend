const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createProject, updateProject, deleteProject } = require('../controller/project');

router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);

router.post('/project/update', upload.none(), updateProject)

router.post('/project/delete', requireSignin, upload.none(), deleteProject)

module.exports = router;