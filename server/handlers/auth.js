const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
	try {
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username, profileImageUrl, email, apiKey, savedViews } = user;
		let isMatch = await user.comparePassword(req.body.password);
		if(isMatch){
			let token = jwt.sign(
			{
				id,
				username,
				profileImageUrl,
			},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				email,
				apiKey,
				savedViews,
				token
			});
		} else {
			return next({
				status: 400,
				message: 'Invalid email or password'
			})
		}
	} catch(err) {
		return next({
			status: 400,
			message: 'Invalid email or password'
		})
	}
};

exports.signup = async function(req, res, next){
	try {
		let invitationCheck = await db.Invitation.findOne({email: req.body.email})
		if (invitationCheck === null) {
			return next({
				status: 400,
				message: 'To create an account you must be invited',
			})
		}
		if (req.body.password.length <= 6) {
			return next({
				status: 400,
				message: 'Choose a password longer than 6 characters',
			})
		}
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl, email, apiKey, savedViews } = user;
		let token = jwt.sign(
		{
			id,
			username,
			profileImageUrl,
		},
		process.env.SECRET_KEY
		);
		await invitationCheck.remove();
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			email,
			apiKey,
			savedViews,
			token
		});
	} catch(err) {
		if(err.code === 11000) {
			err.message = 'Sorry, that username and/or email has been taken.'
		}
		if(err._message === 'User validation failed') {
			err.message = `Sorry, we can't create an account with this information. Double check the feilds and try again.`
		}
		return next({
			status:400,
			message: err.message
		});
	}
};
