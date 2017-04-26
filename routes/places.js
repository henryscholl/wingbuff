const express = require('express'),
	  router = express.Router(),
	  queries = require('../queries/places');

// index all places
router.get('/', (req, res, next) => {
	queries.getAllPlaces()
		.then((result) => {
			res.render('places', {title: 'Browse Wing Places', places: result});
		})
		.catch((err) => {
			next(err);
		});
});

// show place by id
router.get('/:id', (req, res, next) => {
	let placeId = req.params.id;
	queries.getAllWingsByPlaceId(placeId)
	.then((result) => {
		let wings = false;
		if (hasWings(result)) wings = result;
		let place = result[0];
		res.render('place', {title: place.placeName, place: place, wings: wings});
	})
	.catch((err) => {
		next(err);
	});
});

// create new place
router.post('/', (req, res, next) => {
	let name = req.body.name;
	let location = req.body.location;
	queries.createPlace(name, location)
	.then((result) => {
		let placeId = result;
		res.redirect('/places/' + placeId);
	})
	.catch((err) => {
		next(err);
	});
});

// helper functions

function hasWings(result) {
	return result[0].wingName != null;
}

module.exports = router;