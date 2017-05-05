const bcrypt = require('bcryptjs');
const knex = require('../db/connection')

function comparePass(userPassword, databasePassword) {
	return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.password, salt);
	return knex('users')
	.insert({
		username: req.body.username,
		password: hash
	})
	.returning('*');
}

function loginRequired(req, res, next) {
	if(!req.user) return res.redirect('/auth/login');
	return next();
}

function checkReviewOwnership(req, res, next) {
	if(req.user) {
		let reviewId = req.params.reviewId;
		knex.select('user_id')
		.from('reviews')
		.where('id', reviewId)
		.then((reviewUserId) => {
			console.log(reviewUserId, req.user.id)
			if(reviewUserId[0].user_id == req.user.id) {
				next();
			} else {
				res.redirect('/');
			} 	
		});
	} else {
		res.redirect('/');
	}
}

module.exports = {
	comparePass,
	createUser,
	loginRequired,
	checkReviewOwnership
}