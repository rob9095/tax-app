require('dotenv').load();
const jwt = require('jsonwebtoken');
const db = require('../models');

// make sure user is logged in - authentication

exports.loginRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Please login first'
				});
			}
		})
	} catch(err) {
		return next({
			status: 401,
			message: 'Please login first'
		});
	}
};

// make sure we get correct user - authorization

exports.ensureCorrectUser = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
			if (decoded && decoded.id) {
				//lookup id to make sure user exists
				let foundUser = db.User.findById(decoded.id);
				if (!foundUser) {
					return next({
						status: 401,
						message: 'Unauthorized'
					});
				}
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});
	} catch(err) {
		return next({
			status: 401,
			message: 'Unauthorized'
		});
	}
}
