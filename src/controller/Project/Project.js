const Project = require('../../models/project');
const { notFoundHandler, successHandler, permissionHandler, errorHandler, existData } = require('../../helper/response');
const { generateToken } = require('../../helper/common');

module.exports = class ProjectRouter {
	constructor() {}
	GetAll = async (req, res, next) => {
		try {
			let _project = await Project.find({
				userOwner: req.id,
			}).populate('userOwner', 'firstName lastName');

			return res.status(200).json({
				data: _project,
			});
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};
	createProject = async (req, res) => {
		try {
			const projectObj = {
				name: req.body.name,
				desc: req.body.desc,
				status: req.body.status,
				progress: req.body.progress,
				userOwner: req.body.userid,
				slug: slugify(req.body.name).toLowerCase() + '-' + shortid.generate(),
			};

			const project = new Project(projectObj);
			await project.save();

			return successHandler(req, res);
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	updateProject = async (req, res) => {
		try {
			const { id } = req.params;

			let _project = await Task.findById({ _id: id, userOwner: req.id });

			if (_project) {
				for (let key in req.body) {
					_project[key] = req.body[key];
				}

				await _project.save();

				return successHandler(req, res);
			}

			throw 'Project not found';
		} catch (err) {
			return errorHandler(req, res, err);
		}
	};

	deleteProject = async (req, res) => {
		try {
			const { id } = req.params;

			await Project.findOneAndUpdate({ _id: id }, { delete: 1 });

			return res.status(200).json({ message: 'Delete success' });
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};
};
