const User = require('../../models/user');

const bcrypt = require('bcryptjs');

const { notFoundHandler, successHandler, permissionHandler, errorHandler, existData } = require('../../helper/response');
// const { default: mongoose } = require('mongoose');
const { uniq } = require('lodash');
module.exports = class UserRouter {
	constructor() {}

	InviteFriends = async (req, res, next) => {
		try {
			/**
			 * 2 case
			 * 1: check valid request
			 * 2: save request, project ID
			 */

			// let hostUser = req.id;

			// if (!hostUser) throw 'User not found';

			let userInvite = req.body._id; // User need to invite;

			let projectID = req.body.project_id;

			if (!projectID) throw 'Project not found';

			if (!userInvite) throw 'User not found';

			let _user = await User.findOneAndUpdate(
				{ _id: userInvite, request: { $ne: projectID }, userAccess: { $ne: projectID } },
				{ $push: { request: [projectID] } },
				{ new: true }
			);

			if (!_user) throw 'User not found or request have been send';

			return res.status(200).json({
				data: _user,
			});
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	AcceptFriends = async (req, res, next) => {
		try {
			let hostUser = req.id;

			if (!hostUser) throw 'User not found';

			let projectID = req.body._id;

			if (!projectID) throw 'Project not found';

			let _user = await User.findOneAndUpdate(
				{ _id: hostUser, userAccess: { $ne: projectID }, request: { $in: [projectId] } },
				{ $pull: { request: [projectID] }, $push: { userAccess: [projectID] } },
				{ new: true }
			);

			return res.status(200).json({
				data: _user,
			});
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	RefuseInvite = async (req, res, next) => {
		try {
			let hostUser = req.id;

			if (!hostUser) throw 'User not found';

			let projectID = req.body._id;

			if (!projectID) throw 'Project not found';

			let _user = await User.findOneAndUpdate(
				{ _id: hostUser, userAccess: { $ne: projectID }, request: { $in: [projectId] } },
				{ $pull: { request: [projectID] } },
				{ new: true }
			);

			return res.status(200).json({
				data: _user,
			});
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	LeaveProject = async (req, res, next) => {
		try {
			let hostUser = req.id;

			if (!hostUser) throw 'User not found';

			let projectID = req.body._id;

			if (!projectID) throw 'Project not found';

			let _user = await User.findOneAndUpdate(
				{ _id: hostUser, userAccess: { $in: [projectID] }, request: { $ne: [projectId] } },
				{ $pull: { userAccess: [projectID] } },
				{ new: true }
			);

			return res.status(200).json({
				data: _user,
			});
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};
};
