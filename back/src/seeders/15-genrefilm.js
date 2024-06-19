'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('GenreFilm', [
      {
        id_film: 1,
        id_genre: 9,
      },
      {
        id_film: 1,
        id_genre: 10,
      },
      {
        id_film: 2,
        id_genre: 12,
      },
      {
        id_film: 2,
        id_genre: 15,
      },
      {
        id_film: 3,
        id_genre: 15,
      },
      {
        id_film: 3,
        id_genre: 17,
      },

      {
        id_film: 5,
        id_genre: 16,
      },
      {
        id_film: 5,
        id_genre: 28,
      },
      {
        id_film: 6,
        id_genre: 12,
      },
      {
        id_film: 6,
        id_genre: 25,
      },
      {
        id_film: 7,
        id_genre: 28,
      },
      {
        id_film: 7,
        id_genre: 30,
      },
      {
        id_film: 8,
        id_genre: 9,
      },
      {
        id_film: 8,
        id_genre: 10,
      },
      {
        id_film: 9,
        id_genre: 12,
      },
      {
        id_film: 9,
        id_genre: 25,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('GenreFilm', null, {})
  },
}
