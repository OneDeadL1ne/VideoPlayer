'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('DirectorFilm', [
      { id_film: 1, id_director: 1 }, // Зелёная книга - Питер Фаррелли
      { id_film: 2, id_director: 2 }, // Джентльмены - Гай Ричи
      { id_film: 3, id_director: 3 }, // Достать ножи - Райан Джонсон
      { id_film: 5, id_director: 5 }, // Иллюзия обмана - Луи Летерье
      { id_film: 6, id_director: 6 }, // Стажер - Нэнси Майерс
      { id_film: 7, id_director: 7 }, // Драйв - Николас Виндинг Рефн
      { id_film: 8, id_director: 8 }, // 1+1 - Оливье Накаш
      { id_film: 8, id_director: 9 }, // 1+1 - Эрик Толедано
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('DirectorFilm', null, {})
  },
}
