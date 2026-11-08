const { validationResult } = require('express-validator');
const { badRequest } = require('../errors/app-error');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Pick the first validation error message and return 400 VALIDATION_FAILED
  const firstError = errors.array()[0];
  throw badRequest('VALIDATION_FAILED', firstError.msg);
}

module.exports = validate;