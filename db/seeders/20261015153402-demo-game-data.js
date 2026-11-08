'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const db = queryInterface.sequelize;

    // Fetch parent IDs dynamically using double quotes for capitalized table names
    const [[level1]] = await db.query('SELECT level_id FROM "Levels" WHERE level_number = 1;');
    const [[alex]] = await db.query('SELECT player_id FROM "Players" WHERE player_name = \'Alex_Pro\';');
    const [[sam]] = await db.query('SELECT player_id FROM "Players" WHERE player_name = \'Sam_Winner\';');
    const [[jordan]] = await db.query('SELECT player_id FROM "Players" WHERE player_name = \'Jordan_P\';');

    // Seed Puzzles
    await queryInterface.bulkInsert('Puzzles', [
      { level_id: level1.level_id, required_pairs: 6, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Seed Questions
    await queryInterface.bulkInsert('Questions', [
      {
        level_id: level1.level_id,
        question_text: 'What is the title matching rule?',
        answer: 'Match pairs',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Seed Game Progresses
    await queryInterface.bulkInsert('Game_Progresses', [
      { player_id: alex.player_id, level_id: level1.level_id, score: 150, createdAt: new Date(), updatedAt: new Date() },
      { player_id: sam.player_id, level_id: level1.level_id, score: 150, createdAt: new Date(), updatedAt: new Date() },
      { player_id: jordan.player_id, level_id: level1.level_id, score: 120, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Game_Progresses', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Puzzles', null, {});
  }
};