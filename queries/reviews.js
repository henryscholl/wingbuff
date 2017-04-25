const pool = require('../lib/db');

let queries = {};

// create new review
queries.createReview = function(description, rating, wingId, callback) {
	pool.query(`INSERT INTO reviews(wing_id, description, rating) 
				VALUES(${wingId}, '${description}', ${rating}) 
				RETURNING review_id, wing_id, description, rating;`, 
				function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						callback(result);
				});
}

// update review
queries.updateReview = function(description, rating, reviewId, callback) {
	pool.query(`UPDATE reviews
				SET description = '${description}', rating = ${rating}
				WHERE review_id = ${reviewId}
				RETURNING review_id, description, rating;`, 
				function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						callback(result);
				});
}

// delete review
queries.deleteReview = function(reviewId, callback) {
	pool.query(`DELETE FROM ONLY reviews
				WHERE review_id = ${reviewId};`, 
				function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						callback(result);
				});
}

module.exports = queries;