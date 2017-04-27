const knex = require('../lib/connection.js');

let queries = {};

// create new review
queries.createReview = function(description, rating, wingId) {
	return knex.insert({ description: description, rating: rating, wing_id: wingId }, 'wing_id')
			.into('reviews');
}

// update review
queries.updateReview = function(description, rating, reviewId) {
	return knex('reviews')
			.where('id', reviewId)
			.update({
				description: description,
				rating: rating
			});
}

// delete review
queries.deleteReview = function(reviewId) {
	return knex('reviews')
			.where('id', reviewId)
			.del()
}

module.exports = queries;