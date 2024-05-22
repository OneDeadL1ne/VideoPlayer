'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('GenreFilm', [
      {
        id_film: 1,
        id_genre: 2,
      },
      {
        id_film: 1,
        id_genre: 3,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('GenreFilm', null, {})
  },
}
