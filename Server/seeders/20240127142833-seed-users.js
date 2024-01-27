'use strict';

const{ hashPassword } = require('../Helpers/bcrypt')
const users = require('../data/users.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   users.map((el) => {
    el.createdAt = el.updatedAt = new Date()
    el.password = hashPassword(el.password)
    return el
   })
   await queryInterface.bulkInsert(`Users`,users)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(`Users`,users)
  }
};
