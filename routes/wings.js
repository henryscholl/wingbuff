const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  queries = require('../queries/wings');
	  helpers = require('../helpers/validation');
	  authHelpers = require('../auth/_helpers');

// show wing by id
router.get('/:id', helpers.validateId, (req, res, next) => {
	let wingId = req.params.id;
	queries.getWingAndReviewsById(wingId)
		.then((result) => {
			let reviews = false;
			let avgRating = false;
			if (hasReviews(result)) {
				reviews = result;
				avgRating = calculateAvgRating(reviews);
			}
			let wing = result[0];
			res.render('wing', {title: wing.wingName, wing: wing, reviews: reviews, avgRating: avgRating});
		})	
		.catch((err) => {
			next(err);
		});
});

// create new wing
router.post('/', authHelpers.loginRequired, (req, res, next) => {
	let wingName = req.body.name;
	let placeId = req.params.placeId;
	let userId = req.user.id;
	queries.createWing(wingName, placeId, userId)
	.then((result) => {
		let id = result;
		res.redirect(`/places/${placeId}/wings/${id}`);
	})
	.catch((err) => {
		next(err);
	});
});

// helper functions

function hasReviews(result) {
	return result[0].review != null;
}

function calculateAvgRating(reviews) {
	let ratingSum = 0;
	reviews.forEach((review) => {
		ratingSum += review.rating;
	});
	return (ratingSum / reviews.length).toFixed(1);
}

module.exports = router;