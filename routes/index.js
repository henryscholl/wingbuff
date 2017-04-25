const express = require('express'),
	  router = express.Router(),
	  queries = require('../queries/wings');

// render home page and index all wings

router.get('/', (req, res) => {
	queries.getAllWings((result) => {
		res.render('index', {title: 'Wingbuff', wings: result.rows});
	});
});

router.get('/about', (req, res) => {
	res.render('about', {title: 'About'});
});

module.exports = router;