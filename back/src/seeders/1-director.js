'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Director', [
      {
        id_director: 1,
        last_name: 'Спилберг',
        first_name: 'Стивен',
      },
      {
        id_director: 2,
        last_name: 'Кэмерон',
        first_name: 'Джеймс',
      },
      {
        id_director: 3,
        last_name: 'Скорсезе',
        first_name: 'Мартин',
      },
      {
        id_director: 4,
        last_name: 'Нолан',
        first_name: 'Кристофер',
      },
      {
        id_director: 5,
        last_name: 'Ричи',
        first_name: 'Гай',
      },
      {
        id_director: 6,
        last_name: 'Миядзак',
        first_name: 'Хаяо',
      },
      {
        id_director: 7,
        last_name: 'Ганн',
        first_name: 'Джеймс',
      },
      {
        id_director: 8,
        last_name: 'Рид',
        first_name: 'Пейтон',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Director', null, {})
  },
}
