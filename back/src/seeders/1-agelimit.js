'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Agelimit', [
      {
        id_age_limit: 1,
        age_limit_name: 0,
      },
      {
        id_age_limit: 2,
        age_limit_name: 6,
      },
      {
        id_age_limit: 3,
        age_limit_name: 12,
      },
      {
        id_age_limit: 4,
        age_limit_name: 16,
      },
      {
        id_age_limit: 5,
        age_limit_name: 18,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Agelimit', null, {})
  },
}
