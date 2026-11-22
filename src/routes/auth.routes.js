'use strict';

const express = require('express');
const {
  registerRules,
  loginRules,
  roleRules,
  userIdParamRules,
} = require('../validators/auth.validator');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

function createAuthRoutes(authController) {
  const router = express.Router();

  router.post('/register', registerRules, authController.register);
  router.post('/login', loginRules, authController.login);
  router.get('/me', requireAuth, authController.me);
  router.patch(
    '/users/:id/role',
    requireAuth,
    requireRole('ADMIN'),
    userIdParamRules,
    roleRules,
    authController.updateRole
  );

  return router;
}

module.exports = createAuthRoutes;
