'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      school_id: 'S001',
      full_name: 'Donnalyn Nares',
      email: 'donnalyn@example.com',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Seats', [{
      game: 'Tournament 1',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
