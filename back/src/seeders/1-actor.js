'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Actor', [
      { id_actor: 1, last_name: 'Мортенсен', first_name: 'Вигго' }, // Зелёная книга
      { id_actor: 2, last_name: 'Али', first_name: 'Махершала' }, // Зелёная книга
      { id_actor: 3, last_name: 'Карделлини', first_name: 'Линда' }, // Зелёная книга
      { id_actor: 4, last_name: 'Манискалко', first_name: 'Себастьян' }, // Зелёная книга
      { id_actor: 5, last_name: 'Маринов', first_name: 'Димитер' }, // Зелёная книга

      { id_actor: 6, last_name: 'МакКонахи', first_name: 'Мэттью' }, // Джентльмены
      { id_actor: 7, last_name: 'Ханнэм', first_name: 'Чарли' }, // Джентльмены
      { id_actor: 8, last_name: 'Голдинг', first_name: 'Генри' }, // Джентльмены
      { id_actor: 9, last_name: 'Докери', first_name: 'Мишель' }, // Джентльмены
      { id_actor: 10, last_name: 'Стронг', first_name: 'Джереми' }, // Джентльмены
      { id_actor: 11, last_name: 'Фаррелл', first_name: 'Колин' }, // Джентльмены
      { id_actor: 12, last_name: 'Грант', first_name: 'Хью' }, // Джентльмены

      { id_actor: 13, last_name: 'Крэйг', first_name: 'Дэниел' }, // Достать ножи
      { id_actor: 14, last_name: 'Эванс', first_name: 'Крис' }, // Достать ножи
      { id_actor: 15, last_name: 'де Армас', first_name: 'Ана' }, // Достать ножи
      { id_actor: 16, last_name: 'Ли Кёртис', first_name: 'Джейми' }, // Достать ножи
      { id_actor: 17, last_name: 'Шеннон', first_name: 'Майкл' }, // Достать ножи
      { id_actor: 18, last_name: 'Джонсон', first_name: 'Дон' }, // Достать ножи
      { id_actor: 19, last_name: 'Коллетт', first_name: 'Тони' }, // Достать ножи
      { id_actor: 20, last_name: 'Стэнфилд', first_name: 'Лакит' }, // Достать ножи
      { id_actor: 21, last_name: 'Пламмер', first_name: 'Кристофер' }, // Достать ножи

      { id_actor: 22, last_name: 'Крэнстон', first_name: 'Брайан' }, // Во все тяжкое, Драйв
      { id_actor: 23, last_name: 'Пол', first_name: 'Аарон' }, // Во все тяжкое
      { id_actor: 24, last_name: 'Ганн', first_name: 'Анна' }, // Во все тяжкое
      { id_actor: 25, last_name: 'Норрис', first_name: 'Дин' }, // Во все тяжкое
      { id_actor: 26, last_name: 'Брандт', first_name: 'Бетси' }, // Во все тяжкое
      { id_actor: 27, last_name: 'Митт', first_name: 'Ар Джей' }, // Во все тяжкое
      { id_actor: 28, last_name: 'Оденкерк', first_name: 'Боб' }, // Во все тяжкое
      { id_actor: 29, last_name: 'Бэнкс', first_name: 'Джонатан' }, // Во все тяжкое
      { id_actor: 30, last_name: 'Эспозито', first_name: 'Джанкарло' }, // Во все тяжкое

      { id_actor: 31, last_name: 'Айзенберг', first_name: 'Джесси' }, // Иллюзия обмана
      { id_actor: 32, last_name: 'Руффало', first_name: 'Марк' }, // Иллюзия обмана
      { id_actor: 33, last_name: 'Харрельсон', first_name: 'Вуди' }, // Иллюзия обмана
      { id_actor: 34, last_name: 'Фишер', first_name: 'Айла' }, // Иллюзия обмана
      { id_actor: 35, last_name: 'Франко', first_name: 'Дэйв' }, // Иллюзия обмана
      { id_actor: 36, last_name: 'Лоран', first_name: 'Мелани' }, // Иллюзия обмана
      { id_actor: 37, last_name: 'Кейн', first_name: 'Майкл' }, // Иллюзия обмана
      { id_actor: 38, last_name: 'Фриман', first_name: 'Морган' }, // Иллюзия обмана

      { id_actor: 39, last_name: 'Де Ниро', first_name: 'Роберт' }, // Стажер
      { id_actor: 40, last_name: 'Хэтэуэй', first_name: 'Энн' }, // Стажер
      { id_actor: 41, last_name: 'Руссо', first_name: 'Рене' }, // Стажер
      { id_actor: 42, last_name: 'Рэннеллс', first_name: 'Эндрю' }, // Стажер
      { id_actor: 43, last_name: 'ДеВайн', first_name: 'Адам' }, // Стажер
      { id_actor: 44, last_name: 'Вулф', first_name: 'Нат' }, // Стажер

      { id_actor: 45, last_name: 'Гослинг', first_name: 'Райан' }, // Драйв
      { id_actor: 46, last_name: 'Маллиган', first_name: 'Кэри' }, // Драйв
      { id_actor: 47, last_name: 'Брукс', first_name: 'Альберт' }, // Драйв
      { id_actor: 48, last_name: 'Айзек', first_name: 'Оскар' }, // Драйв
      { id_actor: 49, last_name: 'Хендрикс', first_name: 'Кристина' }, // Драйв
      { id_actor: 50, last_name: 'Перлман', first_name: 'Рон' }, // Драйв

      { id_actor: 51, last_name: 'Клюзе', first_name: 'Франсуа' }, // 1+1
      { id_actor: 52, last_name: 'Си', first_name: 'Омар' }, // 1+1
      { id_actor: 53, last_name: 'Ле Ни', first_name: 'Анн' }, // 1+1
      { id_actor: 54, last_name: 'Флеро', first_name: 'Одри' }, // 1+1
      { id_actor: 55, last_name: 'де Мо', first_name: 'Жозефина' }, // 1+1
      { id_actor: 56, last_name: 'Молле', first_name: 'Клотильда' }, // 1+1
      { id_actor: 57, last_name: 'Беллуги', first_name: 'Альба Гайя Крагеде' }, // 1+1
      { id_actor: 58, last_name: 'Менди', first_name: 'Сирил' }, // 1+1
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Actor', null, {})
  },
}
