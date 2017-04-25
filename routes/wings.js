const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  queries = require('../queries/wings');

// show wing by id
router.get('/:id', (req, res) => {
	let wingId = req.params.id;
	queries.getWingAndReviewsById(wingId, (result) => {
		let reviews = false;
		let avgRating = false;
		if (hasReviews(result)) {
			reviews = result.rows;
			avgRating = calculateAvgRating(reviews);
		}
		let wing = result.rows[0];
		res.render('wing', {title: wing.wingName, wing: wing, reviews: reviews, avgRating: avgRating});
	});
});

// create new wing
router.post('/', (req, res) => {
	let wingName = req.body.name;
	let placeId = req.params.placeId;
	queries.createWing(wingName, placeId, (result) => {
		let wing = result.rows[0];
		res.redirect(`/places/${placeId}/wings/${wing.id}`);
	});
});

// helper functions

function hasReviews(result) {
	return result.rows[0].review != null;
}

function calculateAvgRating(reviews) {
	let ratingSum = 0;
	reviews.forEach((review) => {
		ratingSum += review.rating;
	});
	return (ratingSum / reviews.length).toFixed(1);
}

module.exports = router;