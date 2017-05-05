const express = require('express'),
	  router = express.Router({mergeParams: true}),
	  queries = require('../queries/reviews'),
	  authHelpers = require('../auth/_helpers');

// create new review
router.post('/', authHelpers.loginRequired, (req, res, next) => {
	let description = req.body.description;
	let rating = req.body.rating;
	let wingId = req.params.wingId;
	let placeId = req.params.placeId;
	let userId = req.user.id;
	queries.createReview(description, rating, wingId, userId)
		.then((result) => {
			res.redirect(`/places/${placeId}/wings/${wingId}`);
		})
		.catch((err) => {
			next(err);
		});
});

// update review
router.put('/:reviewId', authHelpers.checkReviewOwnership, (req, res, next) => {
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
router.delete('/:reviewId', authHelpers.checkReviewOwnership, (req, res, next) => {
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