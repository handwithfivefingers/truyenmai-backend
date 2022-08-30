const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createProject, updateProject, deleteProject, getallRequest, acceptRequest, refuseRequest } = require('../controller/project');
const ProjectRouter = require('../controller/Project/Project');

const ProjectRoute = new ProjectRouter();

// Create Project
router.post('/project/create', requireSignin, upload.array('projectImage'), createProject);

// Update Project
router.post('/project/update', upload.none(), updateProject);

// Delete Project
router.post('/project/delete', requireSignin, upload.none(), deleteProject);

//cCheck project request
router.post('/project/request', requireSignin, upload.none(), getallRequest);

//accept request
router.post('/project/request/:id', requireSignin, upload.none(), acceptRequest);

//Remove request
router.post('/project/refuse/:id', requireSignin, upload.none(), refuseRequest);

/**
 * @api {get} /project Fetch all task
 * @apiName GetAll
 * @apiGroup Project
 *
 * @apiSuccess { Array } data
 */

router.get('/project', requireSignin, upload.none(), ProjectRoute.GetAll);

/**
 * @api {post} /project Create a new project
 * @apiName createProject
 * @apiGroup Project
 *
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {String} status
 * @apiParam {Number} progress
 * @apiParam {String} userOwner
 *
 * @apiSuccess { Array } data
 */

router.post('/project', requireSignin, upload.none(), ProjectRoute.createProject);

/**
 * @api {post} /project/:id Update project
 * @apiName updateProject
 * @apiGroup Project
 *
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {String} status
 * @apiParam {Number} progress
 * @apiParam {String} userOwner
 *
 * @apiSuccess { [] } data
 */

router.post('/project/:id', requireSignin, upload.none(), ProjectRoute.updateProject);

/**
 * @api {delete} /project/:id Delete project
 * @apiName deleteProject
 * @apiGroup Project
 *
 * @apiSuccess { [] } data
 */
router.delete('/project/:id', requireSignin, upload.none(), ProjectRoute.deleteProject);

module.exports = router;
