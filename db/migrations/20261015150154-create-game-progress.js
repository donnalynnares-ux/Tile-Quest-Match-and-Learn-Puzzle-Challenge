'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GameProgress', {
      progress_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'players', 
          key: 'player_id' // <-- Fixed: players primary key is 'player_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      level_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'levels', 
          key: 'id' // Correct: levels primary key is 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GameProgress');
  }
};