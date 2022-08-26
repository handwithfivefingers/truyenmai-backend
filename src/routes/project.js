const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createProject, updateProject, deleteProject, getallRequest, acceptRequest, refuseRequest } = require('../controller/project');
const ProjectRouter = require('../controller/Project/Project');


const ProjectRoute = new ProjectRouter()

// Create Project
router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);

// Update Project
router.post('/project/update', upload.none(), updateProject)

// Delete Project
router.post('/project/delete', requireSignin, upload.none(), deleteProject)

//cCheck project request
router.post('/project/request', requireSignin, upload.none(), getallRequest)

//accept request
router.post('/project/request/:id', requireSignin, upload.none(), acceptRequest)

//Remove request
router.post('/project/refuse/:id', requireSignin, upload.none(), refuseRequest)

// get All Project

router.get('/project', requireSignin, upload.none(), ProjectRoute.GetAll)


module.exports = router;