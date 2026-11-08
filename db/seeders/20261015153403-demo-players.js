'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('game_progresses', {
  fields: ['session_id', 'player_id'], // or game_id, user_id depending on your table columns
  type: 'unique',
  name: 'unique_seat_per_user_per_game'
});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {});
  }
};