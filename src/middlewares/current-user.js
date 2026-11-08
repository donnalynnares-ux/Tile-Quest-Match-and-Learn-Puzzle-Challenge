const userRepository = require('../repositories/user.repository');

async function currentUser(req, res, next) {
  const schoolId = req.header('X-Demo-User');
  if (!schoolId) {
    req.user = null;
    return next();
  }
  
  try {
    const user = await userRepository.findBySchoolId(schoolId);
    req.user = user || null;
  } catch (error) {
    req.user = null;
  }
  next();
}

module.exports = currentUser;