'use strict';

const { body, param } = require('express-validator');

const SCHOOL_ID_REGEX = /^[A-Za-z0-9_-]{3,30}$/;
const PASSWORD_LETTER_AND_NUMBER = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const ALLOWED_ROLES = ['PLAYER', 'HOST', 'ADMIN'];

const registerRules = [
  body('school_id')
    .trim()
    .notEmpty()
    .withMessage('school_id is required')
    .isString()
    .withMessage('school_id must be a string')
    .matches(SCHOOL_ID_REGEX)
    .withMessage('school_id must be 3-30 letters, numbers, hyphens, or underscores'),
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('full_name is required')
    .isString()
    .withMessage('full_name must be a string')
    .isLength({ min: 2, max: 120 })
    .withMessage('full_name must be between 2 and 120 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be a valid email address')
    .normalizeEmail(),
  body('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 8, max: 72 })
    .withMessage('password must be between 8 and 72 characters')
    .matches(PASSWORD_LETTER_AND_NUMBER)
    .withMessage('password must contain at least one letter and one number'),
];

const loginRules = [
  body('school_id')
    .trim()
    .notEmpty()
    .withMessage('school_id is required')
    .isString()
    .withMessage('school_id must be a string'),
  body('password')
    .isString()
    .withMessage('password must be a string')
    .notEmpty()
    .withMessage('password is required'),
];

const roleRules = [
  body('role')
    .trim()
    .notEmpty()
    .withMessage('role is required')
    .isString()
    .withMessage('role must be a string')
    .isIn(ALLOWED_ROLES)
    .withMessage('role must be PLAYER, HOST, or ADMIN'),
];

const userIdParamRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('id is required'),
];

module.exports = {
  registerRules,
  loginRules,
  roleRules,
  userIdParamRules,
};