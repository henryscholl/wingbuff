const knex = require('../lib/connection.js');

let queries = {};

// index all places
queries.getAllPlaces = function() {
	return knex.select().from('places');
}

// get place info and wings by id
queries.getAllWingsByPlaceId = function(placeId) {
	return knex.select(
			'wings.name AS wingName', 'wings.id AS wingId', 
		  	'places.name AS placeName', 
		  	'places.location AS location', 
		  	'places.id AS placeId',
		  	knex.raw('round(avg(reviews.rating), 1) AS "rating"'))
		.from('places')
		.leftJoin('wings', 'places.id', 'wings.placeid')
		.leftJoin('reviews', 'wings.id', 'reviews.wing_id')
		.where('places.id', placeId)
		.groupBy('wings.id', 'places.name', 'places.location', 'places.id')
		.orderByRaw('avg(reviews.rating) DESC');
}

// create new place
queries.createPlace = function(name, location) {
	return knex.insert({name: name, location: location}, 'id').into('places');
}

// update place

// delete place

module.exports = queries;