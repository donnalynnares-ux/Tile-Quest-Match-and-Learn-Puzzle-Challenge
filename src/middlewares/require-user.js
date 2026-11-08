const { unauthorized, forbidden } = require('../errors/app-error');

function requireUser(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      throw unauthorized('You must be logged in with a valid X-Demo-User header.');
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      throw forbidden('You do not have permission to access this resource.');
    }
    next();
  };
}

module.exports = requireUser;