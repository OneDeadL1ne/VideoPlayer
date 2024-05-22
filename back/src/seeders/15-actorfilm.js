'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('ActorFilm', [
      {
        id_film: 1,
        id_actor: 1,
        position_role: 1,
      },
      {
        id_film: 1,
        id_actor: 2,
        position_role: 2,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('ActorFilm', null, {})
  },
}
