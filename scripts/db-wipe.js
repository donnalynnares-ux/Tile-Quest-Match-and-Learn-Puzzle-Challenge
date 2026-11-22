'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// ADD THIS LINE TO DEBUG:
console.log('DEBUG DB_PASSWORD:', process.env.DB_PASSWORD);

const { sequelize } = require('../src/models');
const env = require('../src/config/env');