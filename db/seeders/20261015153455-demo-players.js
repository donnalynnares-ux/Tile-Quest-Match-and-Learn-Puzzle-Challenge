'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players', [
      { player_name: 'Alex_Pro', total_score: 150, createdAt: new Date(), updatedAt: new Date() },
      { player_name: 'Sam_Winner', total_score: 150, createdAt: new Date(), updatedAt: new Date() },
      { player_name: 'Jordan_P', total_score: 120, createdAt: new Date(), updatedAt: new Date() },
      { player_name: 'Taylor_Quit', total_score: 0, createdAt: new Date(), updatedAt: new Date() },
      { player_name: 'Ghost_Account', total_score: 0, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  }
};