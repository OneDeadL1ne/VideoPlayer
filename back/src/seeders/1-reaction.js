'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Reaction', [
      {
        id_reaction: 1,
        reaction_name: 'Like',
        reaction_value: 1,
      },
      {
        id_reaction: 2,
        reaction_name: 'Dislike',
        reaction_value: -1,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Reaction', null, {})
  },
}
