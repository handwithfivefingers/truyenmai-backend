const successHandler = (req, res) => {
	return res.status(200).json({
		message: 'ok',
	});
};
const errorHandler = (req, res, err) => {
	return res.status(400).json({
		error: err ? err : '',
		message: 'Something went wrong',
	});
};
const permissionHandler = (req, res) => {
	return res.status(401).send({ message: 'Authentication failed' });
};

const notFoundHandler = (req, res) => {
	return res.status(404).send({
		message: 'User not found',
	});
};

const existData = (req, res, field) => {
	return res.status(400).json({
		message: `${field ? field : 'data'} đã được đăng kí !`,
	});
};

module.exports = {
	successHandler,
	errorHandler,
	permissionHandler,
	notFoundHandler,
    existData
};
