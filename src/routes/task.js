const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const {upload, requireSignin} = require('./../common-middleware/index');
const { createTask, initialData, updateTask, deleteTask } = require('../controller/task');

router.post('/task/create', requireSignin, createTask);

router.post('/task/update', requireSignin, updateTask);

router.post('/task/delete', requireSignin, deleteTask);

router.get('/initialdata', initialData)

module.exports = router;