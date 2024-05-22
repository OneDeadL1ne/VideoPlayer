'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('DirectorFilm', [
      {
        id_film: 1,
        id_director: 5,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('DirectorFilm', null, {})
  },
}
