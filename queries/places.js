const pool = require('../lib/db');

let queries = {};

// index all places
queries.getAllPlaces = function(callback) {
	pool.query(`SELECT * FROM places;`, 
				function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					callback(result);
				});
}

// get place info and wings by id
queries.getAllWingsByPlaceId = function(placeId, callback) {
	pool.query(`SELECT wings.name AS "wingName", wings.id AS "wingId", 
				places.name AS "placeName", places.location AS "location", places.id AS "placeId",
				round(avg(reviews.rating), 1) AS "rating"
				FROM places LEFT JOIN wings 
				ON places.id = wings.placeid
				LEFT JOIN reviews
				ON wings.id = reviews.wing_id
				WHERE places.id = ${placeId}
				GROUP BY wings.id, places.name, places.location, places.id
				ORDER BY avg(reviews.rating) DESC;`, 
				function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						callback(result);
				});
}

// create new place
queries.createPlace = function(name, location, callback) {
	pool.query(`INSERT INTO places(name, location) 
				VALUES('${name}', '${location}') RETURNING id, name, location;`, 
				function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					callback(result);
				});
}

// update place

// delete place

module.exports = queries;