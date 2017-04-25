const express = require('express'),
	  router = express.Router(),
	  queries = require('../queries/places');

// index all places
router.get('/', (req, res) => {
	queries.getAllPlaces((result) => {
		let places = result.rows;
		res.render('places', {title: 'Browse Wing Places', places: places});
	});
});

// show place by id
router.get('/:id', (req, res) => {
	let placeId = req.params.id;
	queries.getAllWingsByPlaceId(placeId, (result) => {
		let wings = false;
		if (hasWings(result)) wings = result.rows;
		let place = result.rows[0];
		res.render('place', {title: place.placeName, place: place, wings: wings});
	})
});

// create new place
router.post('/', (req, res) => {
	let name = req.body.name;
	let location = req.body.location;
	queries.createPlace(name, location, (result) => {
		let place = result.rows[0];
		res.redirect('/places/' + place.id);
	});
});

// helper functions

function hasWings(result) {
	return result.rows[0].wingName != null;
}

module.exports = router;