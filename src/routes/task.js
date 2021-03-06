const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { upload, requireSignin } = require('./../common-middleware/index');
const { createTask, initialData, updateTask, deleteTask, searchTask, getTaskDone } = require('../controller/task');


router.post('/task/create', requireSignin, upload.none(), createTask);


router.post('/task/update', requireSignin, upload.none(), updateTask);


router.post('/task/delete', requireSignin, upload.none(), deleteTask);


router.post('/task/search', requireSignin, upload.none(), searchTask);

// Get all data
router.post('/initialdata', requireSignin, upload.none(), initialData)

// Count total task done
router.post('/fetchtaskdone', requireSignin, upload.none(), getTaskDone)

module.exports = router;