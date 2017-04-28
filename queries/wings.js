const knex = require('../db/connection.js');

let queries = {};

// get all wings and info for index
queries.getAllWings = function() {
	return knex.select(
			'wings.name AS wingName', 'wings.id AS wingId', 
		  	'places.name AS place', 
		  	'places.city AS city', 
		  	'places.state AS state', 
		  	'places.id AS placeId',
		  	knex.raw('round(avg(reviews.rating), 1) AS "rating"'))
		.from('wings')
		.innerJoin('places', 'places.id', 'wings.place_id')
		.leftJoin('reviews', 'wings.id', 'reviews.wing_id')
		.groupBy('wings.id', 'places.name', 'places.city', 'places.state', 'places.id')
		.orderByRaw('avg(reviews.rating) DESC NULLS LAST');
}

// get wing by id
queries.getWingAndReviewsById = function(wingId) {
	return knex.select(
			'wings.name AS wingName', 'wings.id AS wingId', 
		  	'places.name AS placeName', 
		  	'places.city AS city',
		  	'places.state AS state', 
		  	'places.id AS placeId',
		  	'reviews.description AS review',
		  	'reviews.rating AS rating',
		  	'reviews.id AS review_id')
		.from('wings')
		.innerJoin('places', 'places.id', 'wings.place_id')
		.leftJoin('reviews', 'wings.id', 'reviews.wing_id')
		.where('wings.id', wingId);
}

// create wing
queries.createWing = function(wingName, placeId) {
	return knex.insert({name: wingName, place_id: placeId}, 'id')
		.into('wings');
}

// update wing

// delete wing

module.exports = queries;