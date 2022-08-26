const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

// Setup Uploads folder
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname);
	},
});

exports.upload = multer({ storage });

// Config Validate Signin
exports.requireSignin = async (req, res, next) => {
	let token = req.cookies['sessionID'];
	if (!token) return res.status(401).json({ message: 'Authorization required' });
	else {
		try {
			const decoded = await jwt.verify(token, process.env.JWT_SECRET);
			if (decoded) {
				const newToken = jwt.sign({ _id: decoded._id, role: decoded.role }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRED,
				});
				req.role = decoded.role;
				req.id = decoded._id;

				var hour = 3600000;

				res.cookie('create-company-token', newToken, {
					maxAge: 2 * 24 * hour,
					httpOnly: true,
				});
				next();
			} else {
				res.clearCookie();
				return res.status(400).json({ message: 'Login attempt failed', error: err });
			}
		} catch (err) {
			res.clearCookie();
			return res.status(400).json({ message: 'something went wrong', error: err });
		}
	}
};
