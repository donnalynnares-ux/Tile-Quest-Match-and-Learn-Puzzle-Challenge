'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Levels', [
      {
        level_number: 1,
        difficulty: 'Easy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level_number: 2,
        difficulty: 'Medium',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Levels', null, {});
  }
};