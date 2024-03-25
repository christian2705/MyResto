'use strict';

const cuisines = require('../data/cuisines.json')

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

    cuisines.map((el) => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    queryInterface.bulkInsert(`Cuisines`,cuisines)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(`Cuisines`,cuisines)
  }
};
