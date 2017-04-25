const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  queries = require('../queries/reviews');

// create new review
router.post('/', (req, res) => {
	let description = req.body.description;
	let rating = req.body.rating;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.createReview(description, rating, wingId, (result) => {
		res.redirect(`/places/${placeId}/wings/${wingId}`);
		// or just trigger w/ ajax and send json to append immediately?
	});
});

// update review
router.put('/:reviewId', (req, res) => {
	let description = req.body.description;
	let rating = req.body.rating;
	let reviewId = req.params.reviewId;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.updateReview(description, rating, reviewId, (result) => {
		res.redirect(`/places/${placeId}/wings/${wingId}`);
	});
});

// delete review
router.delete('/:reviewId', (req, res) => {
	let reviewId = req.params.reviewId;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.deleteReview(reviewId, (result) => {
		res.redirect(`/places/${placeId}/wings/${wingId}`);
	})
})

module.exports = router;