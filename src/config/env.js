'use strict';

const dotenv = require('dotenv');
dotenv.config(); // <--- This loads your .env file into process.env immediately

const REQUIRED = [
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'HUB_API_KEY',
  'JWT_SECRET',
  'CORS_ORIGINS',
];

for (const key of REQUIRED) {
  if (!process.env[key] || String(process.env[key]).trim() === '') {
    throw new Error(`Missing required .env keys: ${key}`);
  }
}

const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

module.exports = {
  REQUIRED,
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name:
      process.env.NODE_ENV === 'test' && process.env.DB_NAME
        ? `${process.env.DB_NAME}_test`
        : process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Must pull the string from process.env
    url: process.env.DATABASE_URL || null,
    ssl: process.env.DB_SSL === 'true',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  cors: {
    origins: corsOrigins,
  },
  hubApiKey: process.env.HUB_API_KEY,
};