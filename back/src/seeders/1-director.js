'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Director', [
      { id_director: 1, last_name: 'Фаррелли', first_name: 'Питер' }, // Зелёная книга
      { id_director: 2, last_name: 'Ричи', first_name: 'Гай' }, // Джентльмены
      { id_director: 3, last_name: 'Джонсон', first_name: 'Райан' }, // Достать ножи
      { id_director: 4, last_name: 'Гиллиган', first_name: 'Винс' }, // Во все тяжкое
      { id_director: 5, last_name: 'Летерье', first_name: 'Луи' }, // Иллюзия обмана
      { id_director: 6, last_name: 'Майерс', first_name: 'Нэнси' }, // Стажер
      { id_director: 7, last_name: 'Рефн', first_name: 'Николас Виндинг' }, // Драйв
      { id_director: 8, last_name: 'Накаш', first_name: 'Оливье' }, // 1+1
      { id_director: 9, last_name: 'Толедано', first_name: 'Эрик' }, // 1+1
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Director', null, {})
  },
}
