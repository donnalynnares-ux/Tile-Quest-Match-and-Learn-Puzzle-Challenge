'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        username: 'admin_demo',
        password_hash: 'hashed_secret_123',
        role: 'SuperAdmin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};