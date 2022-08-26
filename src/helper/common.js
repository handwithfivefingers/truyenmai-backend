const jwt = require('jsonwebtoken');

const generateToken = async (obj, res) => {
	const token = await jwt.sign(obj, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRED,
	});
	var hour = 3600000;

	res.cookie('sessionID', token, {
		maxAge: 2 * 24 * hour,
		httpOnly: true,
	});
};


module.exports = {
	generateToken,
};
