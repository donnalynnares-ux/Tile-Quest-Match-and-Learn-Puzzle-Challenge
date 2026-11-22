'use strict';

const { validationResult, matchedData } = require('express-validator');

function formatValidationErrors(errorsArray) {
  return errorsArray.map((err) => ({
    field: err.path || err.param,
    message: err.msg,
  }));
}

function createAuthController(authService) {
  async function register(req, res, next) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: formatValidationErrors(result.array()),
          },
        });
      }

      const data = matchedData(req, { locations: ['body'], onlyValidData: true });
      const payload = await authService.register({
        school_id: data.school_id,
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });

      return res.status(201).json(payload);
    } catch (err) {
      return next(err);
    }
  }

  async function login(req, res, next) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: formatValidationErrors(result.array()),
          },
        });
      }

      const data = matchedData(req, { locations: ['body'], onlyValidData: true });
      const payload = await authService.login({
        school_id: data.school_id,
        password: data.password,
      });

      return res.status(200).json(payload);
    } catch (err) {
      return next(err);
    }
  }

  async function me(req, res, next) {
    try {
      return res.status(200).json({ user: req.user });
    } catch (err) {
      return next(err);
    }
  }

  async function updateRole(req, res, next) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: formatValidationErrors(result.array()),
          },
        });
      }

      const paramsData = matchedData(req, { locations: ['params'], onlyValidData: true });
      const bodyData = matchedData(req, { locations: ['body'], onlyValidData: true });

      const user = await authService.updateUserRole(paramsData.id, bodyData.role);
      return res.status(200).json({ user });
    } catch (err) {
      return next(err);
    }
  }

  return {
    register,
    login,
    me,
    updateRole,
  };
}

module.exports = createAuthController;