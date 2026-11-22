'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const BCRYPT_ROUNDS = 10;

function createHttpError(status, message, code) {
  const err = new Error(message);
  err.status = status;
  err.statusCode = status;
  if (code) {
    err.code = code;
  }
  return err;
}

function signAuthToken(user) {
  const secret = env.JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw createHttpError(500, 'JWT_SECRET is not configured', 'AUTH_CONFIG_ERROR');
  }

  const expiresIn = env.JWT_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '1h';

  return jwt.sign(
    {
      sub: user.id,
      school_id: user.school_id,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
}

function sanitizeUser(user) {
  const plain = typeof user.get === 'function' ? user.get({ plain: true }) : { ...user };
  delete plain.password_hash;
  return plain;
}

function createAuthService(models) {
  const User = models.User || models.users;
  if (!User) {
    throw new Error('User model is not available on models');
  }

  async function register({ school_id, full_name, email, password }) {
    const existingBySchoolId = await User.findOne({ where: { school_id } });
    if (existingBySchoolId) {
      throw createHttpError(409, 'school_id is already registered', 'DUPLICATE_SCHOOL_ID');
    }

    const existingByEmail = await User.findOne({ where: { email } });
    if (existingByEmail) {
      throw createHttpError(409, 'email is already registered', 'DUPLICATE_EMAIL');
    }

    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const created = await User.create({
      school_id,
      full_name,
      email,
      password_hash,
      role: 'PLAYER',
    });

    const user = sanitizeUser(created);
    const token = signAuthToken(user);

    return { user, token };
  }

  async function login({ school_id, password }) {
    const found = await User.findOne({ where: { school_id } });
    if (!found || !found.password_hash) {
      throw createHttpError(401, 'Invalid school_id or password', 'INVALID_CREDENTIALS');
    }

    const isMatch = await bcrypt.compare(password, found.password_hash);
    if (!isMatch) {
      throw createHttpError(401, 'Invalid school_id or password', 'INVALID_CREDENTIALS');
    }

    const user = sanitizeUser(found);
    const token = signAuthToken(user);

    return { user, token };
  }

  async function updateUserRole(userId, role) {
    const found = await User.findByPk(userId);
    if (!found) {
      throw createHttpError(404, 'User not found', 'USER_NOT_FOUND');
    }

    found.role = role;
    await found.save();

    return sanitizeUser(found);
  }

  return {
    register,
    login,
    updateUserRole,
  };
}

module.exports = createAuthService;