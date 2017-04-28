function validateId(req, res, next) {
	if (isValidId(req.params.id)) {
		return next();
	} else {
		handleError('Wing not found', 404, next)
	}
}

function validateWing(req, res, next) {
	let wingName = req.body.name;
	let placeId = req.params.placeId;
	if (isValidId(placeId) && typeof wingName == 'string' && wingName.trim() != '') {
			return next();
	} else {
		handleError('Invalid wing', 500, next)
	}
}

// helpers

function isValidId(id) {
	return !isNaN(id);
}

function handleError(msg, code, next) {
	let err = new Error(msg);
  	err.status = code;
  	next(err);
}

module.exports = {
	validateId,
	validateWing
}
