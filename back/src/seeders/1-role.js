'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Role', [
      {
        id_role: 1,
        role_name: 'Пользователь',
      },
      {
        id_role: 2,
        role_name: 'Главный Редактор',
      },
      {
        id_role: 3,
        role_name: 'Младший Редактор',
      },
      {
        id_role: 4,
        role_name: 'Администратор',
      },
      {
        id_role: 5,
        role_name: 'Разработчик',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Role', null, {})
  },
}
