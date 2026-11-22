'use strict';

const bcrypt = require('bcryptjs');

const DEMO_PASSWORD = 'DemoPass123!'; // Replace with your chosen demo password

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    await queryInterface.bulkUpdate(
      'users',
      { password_hash: hash },
      { password_hash: null }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      'users',
      { password_hash: null },
      { password_hash: { [Sequelize.Op.ne]: null } }
    );
  },
};
