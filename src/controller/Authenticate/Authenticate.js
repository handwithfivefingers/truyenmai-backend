const mongoose = require('mongoose');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const { notFoundHandler, successHandler, permissionHandler, errorHandler, existData } = require('../../helper/response');
const { generateToken } = require('../../helper/common');

module.exports = class Authenticate {
	constructor() {}

	Login = async (req, res) => {
		try {
			let { email, password } = req.body;

			let _user = await User.findOne({ email });

			if (!_user) return notFoundHandler(req, res);

			let isMatch = await _user.authenticate(password);

			console.log(isMatch);

			if (isMatch) {
				await generateToken({ _id: _user._id, role: _user.role }, res);

				return successHandler(req, res);
			}

			return permissionHandler(req, res);
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};

	Register = async (req, res) => {
		try {
			let _user = await User.findOne({
				email: req.body.email,
			});

			if (_user) {
				return existData(req, res, 'Email');
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

			return successHandler(req, res);
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	Authorization = (req, res) => {
		return successHandler(req, res);
	};

	Logout = (req, res) => {
		res.clearCookie();
		return res.redirect('/');
	};

	ResetPassword = async (req, res) => {
		try {
			let { email, password } = req.body;

			let _user = await User.findOne({ email });

			if (!_user) return notFoundHandler(req, res);

			let hash_password = await bcrypt.hash(password, 10);

			_user.hash_password = hash_password;

			await _user.save();

			return successHandler(req, res);
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};
};
