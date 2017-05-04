const express = require('express'),
	  router = express.Router(),
	  queries = require('../queries/wings');

const authHelpers = require('../auth/_helpers');


// render home page and index all wings

router.get('/', (req, res, next) => {
	queries.getAllWings()
	.then((result) => {
		res.render('index', {title: 'Wingbuff', wings: result});
	})
	.catch((err) => {
		next(err);
	});
});

router.get('/about', (req, res) => {
	res.render('about', {title: 'About'});
});

router.get('/user', authHelpers.loginRequired, (req, res, next) => {
	res.render('user');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;