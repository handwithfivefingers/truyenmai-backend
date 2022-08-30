const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');

const { createTask, initialData, updateTask, deleteTask, searchTask, getTaskDone } = require('../controller/task');

const TaskRouter = require('../controller/Task/Task');
const { validate, taskUpdate, taskFetch } = require('../validator/task');

const TaskRoute = new TaskRouter();

/**
 * @api {post} /task Fetch all task
 * @apiName getAll
 * @apiGroup Task
 *
 * @apiParam {String} _id User's unique ID
 * @apiParam {String} search params
 *
 * @apiSuccess { Array } data
 */

router.post('/task', requireSignin, validate(taskFetch), upload.none(), TaskRoute.getAll);

/**
 * @api {post} /task/create Create a new task
 * @apiName createTask
 * @apiGroup Task
 *
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {Number} status
 * @apiParam {String} project "project id"
 * @apiParam {String} issue
 * @apiParam {Number} progress
 *
 * @apiSuccess { [] } data
 */

router.post('/task/create', requireSignin, upload.none(), TaskRoute.createTask);

/**
 * @api {delete} /task/:id Delete task
 * @apiName deleteTask
 * @apiGroup Task
 *
 * @apiSuccess { [] } data
 */

router.delete('/task/:id', requireSignin, upload.none(), TaskRoute.deleteTask);

/**
 * @api {post} /task/:id Update Task
 * @apiName updateTask
 * @apiGroup Task
 *
 * @apiParam {String} name
 * @apiParam {String} desc
 * @apiParam {Number} status
 * @apiParam {String} project "project id"
 * @apiParam {String} issue
 * @apiParam {Number} progress
 *
 * @apiSuccess { [] } data
 */

router.post('/task/:id', requireSignin, validate(taskUpdate), upload.none(), TaskRoute.updateTask);

module.exports = router;
