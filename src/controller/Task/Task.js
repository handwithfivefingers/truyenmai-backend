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

	updateTask = async (req, res) => {
		try {
			// const taskObj = {
			// 	name: req.body.name,
			// 	desc: req.body.desc,
			// 	status: req.body.status,
			// 	issue: req.body.issue,
			// 	progress: req.body.progress,
			// };
			console.log(req.params);
			const { id } = req.params;

			let _task = await Task.findById({ _id: id });

			// Object.keys(req.body)

			if (_task) {
				for (let key in req.body) {
					_task[key] = req.body[key];
				}
				await _task.save();

				return successHandler(req, res);
			}

			throw 'Task not found';
		} catch (err) {
			console.log(err);
			return errorHandler(req, res, err);
		}
	};
};
