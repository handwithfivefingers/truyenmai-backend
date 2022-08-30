const Task = require('../../models/tasks');
const { notFoundHandler, successHandler, permissionHandler, errorHandler, existData } = require('../../helper/response');
const { generateToken } = require('../../helper/common');

module.exports = class TaskRouter {
	getAll = async (req, res) => {
		try {
			
			const { search, _id } = req.body;

			const searchReg = new RegExp(search, 'i');

			const query = {
				$and: [
					{
						$or: [{ name: searchReg }, { desc: searchReg }],
					},
					{ project: _id },
					{
						delete: {
							$ne: 1,
						},
					},
				],
			};

			let _task = await Task.find(query).select('-__v');

			return res.status(200).json({
				data: _task,
			});
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};

	createTask = async (req, res) => {
		try {
			let taskObj = {
				name: req.body.name,
				desc: req.body.desc,
				status: req.body.status,
				project: req.body.project,
				issue: req.body.issue,
				progress: req.body.progress,
			};

			let _task = new Task(taskObj);
			await _task.save();

			return successHandler(req, res);
		} catch (err) {
			return errorHandler(req, res, err);
		}

	};

	updateTask = async (req, res) => {
		try {

			const { id } = req.params;

			await Task.findOneAndUpdate({ _id: id }, { ...req.body });

			return successHandler(req, res);

			throw 'Task not found';
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};

	deleteTask = async (req, res) => {
		try {
			const { id } = req.params;

			await Task.findOneAndUpdate({ _id: id }, { delete: 1 });

			return res.status(200).json({ message: 'Delete success' });
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};
};
