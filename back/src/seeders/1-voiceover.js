'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Voiceover', [
      {
        id_voiceover: 1,
        voiceover_name: 'Русский',
      },
      {
        id_voiceover: 2,
        voiceover_name: 'Английский',
      },
      {
        id_voiceover: 3,
        voiceover_name: 'Японсий',
      },
      {
        id_voiceover: 4,
        voiceover_name: 'Казахский',
      },
      {
        id_voiceover: 5,
        voiceover_name: 'Английский',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Voiceover', null, {})
  },
}
