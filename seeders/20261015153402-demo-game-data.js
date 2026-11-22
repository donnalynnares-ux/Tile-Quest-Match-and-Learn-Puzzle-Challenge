'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const db = queryInterface.sequelize;

    // Fetch level 1 from "levels" (primary key is "id")
    const [levels] = await db.query(
      "SELECT id FROM \"levels\" WHERE name = 'Level 1 - Easy' ORDER BY id ASC LIMIT 1;"
    );
    const level1 = levels[0];

    if (!level1) {
      throw new Error('Level 1 not found. Make sure demo-levels seeder runs before this file.');
    }

    const [alexRows] = await db.query(
      "SELECT player_id FROM \"players\" WHERE player_name = 'Alex_Pro';"
    );
    const [samRows] = await db.query(
      "SELECT player_id FROM \"players\" WHERE player_name = 'Sam_Winner';"
    );
    const [jordanRows] = await db.query(
      "SELECT player_id FROM \"players\" WHERE player_name = 'Jordan_P';"
    );

    const alex = alexRows[0];
    const sam = samRows[0];
    const jordan = jordanRows[0];

    // Seed Puzzles
    await queryInterface.bulkInsert(
      'Puzzles',
      [
        {
          level_id: level1.id,
          required_pairs: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Seed Questions
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          level_id: level1.id,
          question_text: 'What is the title matching rule?',
          answer: 'Match pairs',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Seed GameProgress only for players that actually exist
    const gameProgresses = [];
    if (alex) {
      gameProgresses.push({
        player_id: alex.player_id,
        level_id: level1.id,
        score: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    if (sam) {
      gameProgresses.push({
        player_id: sam.player_id,
        level_id: level1.id,
        score: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    if (jordan) {
      gameProgresses.push({
        player_id: jordan.player_id,
        level_id: level1.id,
        score: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (gameProgresses.length > 0) {
      await queryInterface.bulkInsert('GameProgress', gameProgresses, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GameProgress', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Puzzles', null, {});
  },
};
