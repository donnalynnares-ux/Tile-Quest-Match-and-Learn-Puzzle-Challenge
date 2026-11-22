'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('levels', [
      {
        name: 'Level 1 - Easy',
        description: 'Easy starter level',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Level 2 - Medium',
        description: 'Medium challenge level',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('levels', null, {});
  },
};