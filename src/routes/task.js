const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createTask, initialData, updateTask, deleteTask, searchTask, getTaskDone } = require('../controller/task');

router.post('/task/create', requireSignin, upload.none(), createTask);

router.post('/task/update', requireSignin, upload.none(), updateTask);

router.post('/task/delete', requireSignin, upload.none(), deleteTask);

router.post('/task/search', upload.none(), searchTask);

router.post('/initialdata', requireSignin, upload.none(), initialData)

router.post('/fetchtaskdone', upload.none(), getTaskDone)
module.exports = router;