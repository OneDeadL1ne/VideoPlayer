'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Actor', [
      {
        id_actor: 1,
        last_name: 'МакКонахи',
        first_name: 'Мэттью',
      },
      {
        id_actor: 2,
        last_name: 'Ханнэм',
        first_name: 'Чарли',
      },
      {
        id_actor: 3,
        last_name: 'Голдинг',
        first_name: 'Генри',
      },
      {
        id_actor: 4,
        last_name: 'Грант',
        first_name: 'Хью',
      },
      {
        id_actor: 5,
        last_name: 'Докери',
        first_name: 'Мишель',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Actor', null, {})
  },
}
