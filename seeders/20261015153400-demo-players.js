'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // If this is a migration that creates a table or inserts data, put it here:
    // e.g., await queryInterface.bulkInsert('Players', [ ... ]);
  },

  async down(queryInterface, Sequelize) {
    // e.g., await queryInterface.bulkDelete('Players', null, {});
  }
};