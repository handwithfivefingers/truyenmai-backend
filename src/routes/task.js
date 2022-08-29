const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');

const { createTask, initialData, updateTask, deleteTask, searchTask, getTaskDone } = require('../controller/task');

const TaskRouter = require('../controller/Task/Task');
const { validate, taskUpdate , taskFetch} = require('../validator/task');

const TaskRoute = new TaskRouter();

// router.post('/task/create', requireSignin, upload.none(), createTask);

// router.post('/task/update', requireSignin, upload.none(), updateTask);

// router.post('/task/delete', requireSignin, upload.none(), deleteTask);

// router.post('/task/search', requireSignin, upload.none(), searchTask);

// // Get all data
// router.post('/initialdata', requireSignin, upload.none(), initialData);

// Count total task done
// router.post('/fetchtaskdone', requireSignin, upload.none(), getTaskDone);

router.post('/task', requireSignin, validate(taskFetch), upload.none(), TaskRoute.getAll);

router.post('/task/create', requireSignin, upload.none(), TaskRoute.createTask);

router.delete('/task/:id', requireSignin, upload.none(), TaskRoute.deleteTask);

router.post('/task/:id', requireSignin, validate(taskUpdate), upload.none(), TaskRoute.updateTask);

module.exports = router;
