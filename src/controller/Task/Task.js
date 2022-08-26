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
};
