'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Gender', [
      {
        id_gender: 1,
        gender_name: 'Мужской',
      },
      {
        id_gender: 2,
        gender_name: 'Женский',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Gender', null, {})
  },
}
