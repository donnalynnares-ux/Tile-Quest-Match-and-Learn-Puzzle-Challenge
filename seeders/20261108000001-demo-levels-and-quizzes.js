'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [levelRows] = await queryInterface.sequelize.query(
      'SELECT id, name FROM "levels" ORDER BY id ASC;'
    );
    const level1 = levelRows[0];
    const level2 = levelRows[1] || levelRows[0];

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
        levelId: level2 ? level2.id : 1,
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
  }
};
