'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Person', [
      {
        id_person: 1,
        last_name: 'Усачёв',
        first_name: 'Тимофей',
        patronymic: 'Феоктистович',
        phone: '+79001234567',
        id_gender: 1,
      },
      {
        id_person: 2,
        last_name: 'Марин',
        first_name: 'Иван',
        patronymic: 'Макарович',
        phone: '+79007976431',
        id_gender: 1,
      },
      {
        id_person: 3,
        last_name: 'Смелоча',
        first_name: 'Аполлинария',
        patronymic: 'Даниловна',
        phone: '+79007895498',
        id_gender: 2,
      },
      {
        id_person: 4,
        last_name: 'Нужнова',
        first_name: 'Полина',
        patronymic: 'Тарасовна',
        phone: '+78004596587',
        id_gender: 2,
      },
      {
        id_person: 5,
        last_name: 'Полякова',
        first_name: 'Оксана',
        patronymic: 'Якововна',
        phone: '+77778756532',
        id_gender: 2,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Person', null, {})
  },
}
