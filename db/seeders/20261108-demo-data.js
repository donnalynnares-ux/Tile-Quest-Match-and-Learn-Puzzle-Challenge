'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { username: 'testuser', email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Admins', [
      { username: 'superadmin', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Levels', [
      { name: 'Level 1', difficulty: 'easy', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Players', [
      { name: 'Player One', score: 100, createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Puzzles', [
      { title: 'Sample Puzzle', grid_data: '{}', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Questions', [
      { prompt: 'What is 2+2?', answer: '4', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Game_Progresses', [
      { progress_data: '{}', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });

    await queryInterface.bulkInsert('Seats', [
      { status: 'active', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
    await queryInterface.bulkDelete('Game_Progresses', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Puzzles', null, {});
    await queryInterface.bulkDelete('Players', null, {});
    await queryInterface.bulkDelete('Levels', null, {});
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};