'use strict';

const express = require('express');
const models = require('../models');
const createAuthService = require('../services/auth.service');
const createAuthController = require('../controllers/auth.controller');
const createAuthRoutes = require('./auth.routes');

const router = express.Router();

const authService = createAuthService(models);
const authController = createAuthController(authService);

router.use('/auth', createAuthRoutes(authController));

module.exports = router;