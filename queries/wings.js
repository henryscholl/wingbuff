const pool = require('../lib/db');

let queries = {};

// get all wings
queries.getAllWings = function(callback) {
	pool.query(`SELECT wings.name AS "wingName", wings.id AS "wingId", 
				places.name AS "place", places.location AS "location", places.id AS "placeId",
				round(avg(reviews.rating), 1) AS "rating"
				FROM wings INNER JOIN places 
				ON places.id = wings.placeid
				INNER JOIN reviews
				ON wings.id = reviews.wing_id
				GROUP BY wings.id, places.name, places.location, places.id
				ORDER BY avg(reviews.rating) DESC;`, 
				function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					callback(result);
				});
}

// get wing by id
queries.getWingAndReviewsById = function(wingId, callback) {
	pool.query(`SELECT wings.name AS "wingName", wings.id AS "wingId", 
				places.name AS "placeName", places.location AS "placeLocation", places.id AS "placeId",
				reviews.description AS "review", reviews.rating AS "rating", reviews.review_id AS "review_id"
				FROM wings INNER JOIN places 
				ON places.id = wings.placeid
				LEFT JOIN reviews
				ON wings.id = reviews.wing_id
				WHERE wings.id = ${wingId};`, 
				function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					callback(result);
				});
}

// create wing
queries.createWing = function(wingName, placeId, callback) {
	pool.query(`INSERT INTO wings(name, placeid) 
				VALUES('${wingName}', ${placeId}) RETURNING id, name, placeid;`, 
				function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						callback(result);
				});
	
}

// update wing

// delete wing

module.exports = queries;