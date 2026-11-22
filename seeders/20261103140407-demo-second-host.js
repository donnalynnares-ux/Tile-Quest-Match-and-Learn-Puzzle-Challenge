'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
   module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { school_id: '2099-0003', full_name: 'Ben Castro', email: 'ben.castro@aklatarena.test', role: 'HOST' },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0003' }, {});
  },
};

  }
};
