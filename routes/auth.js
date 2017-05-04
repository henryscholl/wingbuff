const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

// register new user
router.post('/register', (req, res, next) => {
	return authHelpers.createUser(req, res)
	.then((response) => {
		passport.authenticate('local', (err, user, info) => {
			if (user) { res.redirect('/'); }
    })(req, res, next);
  })
  .catch((err) => { next(err); });
});

// login user
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) { handleResponse(res, 500, 'error'); }
		if (!user) { handleResponse(res, 404, 'User not found'); }
		if (user) {
			req.logIn(user, function(err) {
				if (err) { handleResponse(res, 500, 'error'); }
				res.redirect('/user');
				//handleResponse(res, 200, 'success');
			});
		}
	})(req, res, next);
});

// logout
router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;