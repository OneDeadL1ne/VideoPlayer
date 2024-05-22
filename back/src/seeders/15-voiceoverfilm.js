'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('VoiceoverFilm', [
      {
        id_film: 1,
        id_voiceover: 1,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('VoiceoverFilm', null, {})
  },
}
