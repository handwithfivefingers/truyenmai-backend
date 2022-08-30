const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

// Register
exports.signup = async (req, res) => {
	try {
		let _user = await User.findOne({
			email: req.body.email,
		});

		if (_user) {
			return res.status(400).json({
				message: 'Email đã được đăng kí, vui lòng đổi sang email khác !',
			});
		}
		const { firstName, lastName, email, password } = req.body;

		const hash_password = await bcrypt.hash(password, 10);

		const user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate(),
		});

		await user.save();

		await generateToken({ _id: user._id, role: user.role }, res);

		return res.status(201).json({
			message: 'Tạo tài khoản thành công',
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Something went wrong',
			err,
		});
	}
	// User.findOne({
	// 	email: req.body.email,
	// }).exec(async (error, user) => {
	// 	if (user)
	// 		return res.status(400).json({
	// 			message: 'Email đã được đăng kí, vui lòng đổi sang email khác !',
	// 		});
	// 	const { firstName, lastName, email, password } = req.body;

	// 	const hash_password = await bcrypt.hash(password, 10);

	// 	const _user = new User({
	// 		firstName,
	// 		lastName,
	// 		email,
	// 		hash_password,
	// 		username: shortid.generate(),
	// 	});
	// 	_user.save((error, data) => {
	// 		if (error) {
	// 			return res.status(400).json({
	// 				message: 'Something went wrong',
	// 				error,
	// 			});
	// 		}
	// 		if (data) {
	// 			await generateToken({ _id: user._id, role: user.role }, res);

	// 			return res.status(201).json({
	// 				message: 'Tạo tài khoản thành công',
	// 			});
	// 		}
	// 	});
	// });
};

// Login
exports.signin = async (req, res) => {
	// Check user in db
	try {
		let _user = await User.findOne({
			email: req.body.email,
		});
		if (_user) {
			let password = await user.authenticate(req.body.password);
			if (password) {
				await generateToken({ _id: user._id, role: user.role }, res);
				return res.status(200);
			}
			// If authen password wrong
			else {
				return res.status(400).json({
					message: 'Sai mật khẩu, vui lòng thử lại sau !',
				});
			}
		}
		return res.status(400).json({
			message: 'Sai mật khẩu, vui lòng thử lại sau !',
		});
	} catch (err) {
		return res.status(400).json({ message: 'Something went wrong', error: err });
	}
};

exports.signOut = (req, res) => {
	res.clearCookie('sessionID');
	res.status(200).json({
		message: 'Signout successfully !',
	});
};

//check Login
exports.checkUser = (req, res) => {
	res.status(200).json({
		message: 'Login Successfully',
	});
};

// Search user
exports.findUser = async (req, res) => {
	// console.log(req.body.name)
	const name = new RegExp(req.body.name, 'i');
	// const { name } = req.body;
	const user = await User.find({
		$or: [{ firstName: name }, { lastName: name }, { email: name }],
	})
		.select('_id firstName lastName username email role ')
		.exec();
	if (user)
		return res.status(200).json({
			user: user,
		});
};

exports.addUsertoProject = async (req, res) => {
	let user = req.body.user.split(',');
	let projectId = req.body.projectId;
	console.log(projectId);
	let allUser = [];
	checkUser(user)
		.then((response) => {
			response.map((item) => (item[0] ? allUser.push(item[0]) : ''));
		})
		.finally(() => {
			// console.log('done')
			// allUser -> _id role username
			if (allUser.length > 0) {
				// allUser.map(item => )
				let newpromise = allUser.map((item) => {
					return User.findOneAndUpdate(
						{ _id: item._id, request: { $ne: projectId } },
						{ $push: { request: [projectId] } },
						{ new: true }
					);
				});
				Promise.all(newpromise)
					.then((response) => {
						console.log('response', response);
					})
					.finally(() => {
						res.status(200).json({
							success: true,
						});
					});
			} else {
				res.status(200).json({
					success: false,
					message: 'User not found',
				});
			}
		});
};

checkUser = async (users) => {
	// Promise All -> return userArray [ { _id, role, username, } ]
	let promise = users.map((email) => {
		return User.find({ email: email.substring(1, email.length) })
			.select('_id role username')
			.exec()
			.then((user) => user);
	});
	return Promise.all(promise);
};

const generateToken = async (obj, res) => {
	const token = await jwt.sign(obj, process.env.SECRET, {
		expiresIn: process.env.JWT_EXPIRED,
	});
	var hour = 3600000;

	res.cookie('sessionID', token, {
		maxAge: 2 * 24 * hour,
		httpOnly: true,
	});
};
