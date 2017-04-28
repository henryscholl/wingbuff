const knex = require('../db/connection.js');

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
		  	'places.address AS address',
		  	'places.city AS city',
		  	'places.state AS state',  
		  	'places.id AS placeId',
		  	knex.raw('round(avg(reviews.rating), 1) AS "rating"'))
		.from('places')
		.leftJoin('wings', 'places.id', 'wings.place_id')
		.leftJoin('reviews', 'wings.id', 'reviews.wing_id')
		.where('places.id', placeId)
		.groupBy('wings.id', 'places.name', 'places.address', 'places.city', 'places.state', 'places.id')
		.orderByRaw('avg(reviews.rating) DESC NULLS LAST');
}

// create new place
queries.createPlace = function(name, address, city, state, zipcode) {
	return knex.insert({
		name: name, 
		address: address, 
		city: city, 
		state: state, 
		zipcode: zipcode}, 'id').into('places');
}

// update place

// delete place

module.exports = queries;