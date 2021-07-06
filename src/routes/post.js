const express = require('express');
const { createPost } = require('../controller/post');
const router = express.Router();
const shortid = require('shortid');
const {upload} = require('./../common-middleware/index');

router.post('/post/create', upload.array('postImage'), createPost);

module.exports = router;