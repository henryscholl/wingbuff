const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  queries = require('../queries/reviews');

// create new review
router.post('/', (req, res, next) => {
	let description = req.body.description;
	let rating = req.body.rating;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.createReview(description, rating, wingId)
		.then((result) => {
			res.redirect(`/places/${placeId}/wings/${wingId}`);
		})
		.catch((err) => {
			next(err);
		});
});

// update review
router.put('/:reviewId', (req, res, next) => {
	let description = req.body.description;
	let rating = req.body.rating;
	let reviewId = req.params.reviewId;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.updateReview(description, rating, reviewId)
		.then(() => {
			res.redirect(`/places/${placeId}/wings/${wingId}`);
		})
		.catch((err) => {
			next(err);
		});
});

// delete review
router.delete('/:reviewId', (req, res, next) => {
	let reviewId = req.params.reviewId;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	queries.deleteReview(reviewId)
		.then(() => {
			res.redirect(`/places/${placeId}/wings/${wingId}`);
		})
		.catch((err) => {
			next(err);
		});
})

module.exports = router;