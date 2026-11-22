'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add your unique constraint inside the up function
    await queryInterface.addConstraint('Seats', {
      fields: ['game', 'user_id'],
      type: 'unique',
      name: 'unique_game_user_seat'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};