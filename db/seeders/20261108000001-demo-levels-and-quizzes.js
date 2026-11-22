'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert initial levels (using lowercase 'levels' table name)
    await queryInterface.bulkInsert('levels', [
      {
        levelNumber: 1,
        title: 'Introduction to Matching',
        tileRequirements: JSON.stringify({ matchCount: 3, types: ['shape', 'color'] }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelNumber: 2,
        title: 'Memory Boost',
        tileRequirements: JSON.stringify({ matchCount: 5, types: ['number', 'symbol'] }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // 2. Fetch inserted levels using lowercase table name
    const [levelRows] = await queryInterface.sequelize.query(
      `SELECT id, "levelNumber" FROM levels;`
    );
    const level1 = levelRows.find(l => l.levelNumber === 1);
    const level2 = levelRows.find(l => l.levelNumber === 2);

    // 3. Insert quizzes linked to those levels (using lowercase 'quizzes' table name)
    await queryInterface.bulkInsert('quizzes', [
      {
        levelId: level1 ? level1.id : 1,
        question: 'What is 2 + 2?',
        options: JSON.stringify(['3', '4', '5']),
        correctAnswer: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelId: level2 ? level2.id : 2,
        question: 'Which geometric shape has exactly three sides?',
        options: JSON.stringify(['Square', 'Triangle', 'Circle']),
        correctAnswer: 'Triangle',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quizzes', null, {});
    await queryInterface.bulkDelete('levels', null, {});
  }
};