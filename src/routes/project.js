const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createProject, updateProject, deleteProject, getallRequest, acceptRequest, refuseRequest } = require('../controller/project');

router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);

router.post('/project/update', upload.none(), updateProject)

router.post('/project/delete', requireSignin, upload.none(), deleteProject)

//check project request
router.post('/project/request', requireSignin, upload.none(), getallRequest)

//accept request
router.post('/project/request/:id', requireSignin, upload.none(), acceptRequest)
router.post('/project/refuse/:id', requireSignin, upload.none(), refuseRequest)
module.exports = router;