const Post = require('../models/post');
const slugify = require('slugify');
const shortid = require('shortid');
const Category = require('../models/category');

exports.createPost = (req, res) => {
	const { title, slug, excerpt, content, status, category, author } = req.body;
	let postImage = [];
	if (req.files.length > 0) {
		postImage = req.files.map((file) => {
			return { img: file.filename };
		});
	}

	return res.status(200).json({ postImage });
};
