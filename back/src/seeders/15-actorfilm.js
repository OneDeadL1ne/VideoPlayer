'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('ActorFilm', [
      { id_film: 1, id_actor: 1, position_role: 1 }, // Вигго Мортенсен - Зелёная книга
      { id_film: 1, id_actor: 2, position_role: 2 }, // Махершала Али - Зелёная книга
      { id_film: 1, id_actor: 3, position_role: 3 }, // Линда Карделлини - Зелёная книга
      { id_film: 1, id_actor: 4, position_role: 4 }, // Себастьян Манискалко - Зелёная книга
      { id_film: 1, id_actor: 5, position_role: 5 }, // Димитер Маринов - Зелёная книга

      { id_film: 2, id_actor: 6, position_role: 1 }, // Мэттью МакКонахи - Джентльмены
      { id_film: 2, id_actor: 7, position_role: 2 }, // Чарли Ханнэм - Джентльмены
      { id_film: 2, id_actor: 8, position_role: 3 }, // Генри Голдинг - Джентльмены
      { id_film: 2, id_actor: 9, position_role: 4 }, // Мишель Докери - Джентльмены
      { id_film: 2, id_actor: 10, position_role: 5 }, // Джереми Стронг - Джентльмены
      { id_film: 2, id_actor: 11, position_role: 6 }, // Колин Фаррелл - Джентльмены
      { id_film: 2, id_actor: 12, position_role: 7 }, // Хью Грант - Джентльмены

      { id_film: 3, id_actor: 13, position_role: 1 }, // Дэниел Крэйг - Достать ножи
      { id_film: 3, id_actor: 14, position_role: 2 }, // Крис Эванс - Достать ножи
      { id_film: 3, id_actor: 15, position_role: 3 }, // Ана де Армас - Достать ножи
      { id_film: 3, id_actor: 16, position_role: 4 }, // Джейми Ли Кёртис - Достать ножи
      { id_film: 3, id_actor: 17, position_role: 5 }, // Майкл Шеннон - Достать ножи
      { id_film: 3, id_actor: 18, position_role: 6 }, // Дон Джонсон - Достать ножи
      { id_film: 3, id_actor: 19, position_role: 7 }, // Тони Коллетт - Достать ножи
      { id_film: 3, id_actor: 20, position_role: 8 }, // Лакит Стэнфилд - Достать ножи
      { id_film: 3, id_actor: 21, position_role: 9 }, // Кристофер Пламмер - Достать ножи

      { id_film: 4, id_actor: 22, position_role: 1 }, // Брайан Крэнстон - Во все тяжкое
      { id_film: 4, id_actor: 23, position_role: 2 }, // Аарон Пол - Во все тяжкое
      { id_film: 4, id_actor: 24, position_role: 3 }, // Анна Ганн - Во все тяжкое
      { id_film: 4, id_actor: 25, position_role: 4 }, // Дин Норрис - Во все тяжкое
      { id_film: 4, id_actor: 26, position_role: 5 }, // Бетси Брандт - Во все тяжкое
      { id_film: 4, id_actor: 27, position_role: 6 }, // Ар Джей Митт - Во все тяжкое
      { id_film: 4, id_actor: 28, position_role: 7 }, // Боб Оденкерк - Во все тяжкое
      { id_film: 4, id_actor: 29, position_role: 8 }, // Джонатан Бэнкс - Во все тяжкое
      { id_film: 4, id_actor: 30, position_role: 9 }, // Джанкарло Эспозито - Во все тяжкое

      { id_film: 5, id_actor: 31, position_role: 1 }, // Джесси Айзенберг - Иллюзия обмана
      { id_film: 5, id_actor: 32, position_role: 2 }, // Марк Руффало - Иллюзия обмана
      { id_film: 5, id_actor: 33, position_role: 3 }, // Вуди Харрельсон - Иллюзия обмана
      { id_film: 5, id_actor: 34, position_role: 4 }, // Айла Фишер - Иллюзия обмана
      { id_film: 5, id_actor: 35, position_role: 5 }, // Дэйв Франко - Иллюзия обмана
      { id_film: 5, id_actor: 36, position_role: 6 }, // Мелани Лоран - Иллюзия обмана
      { id_film: 5, id_actor: 37, position_role: 7 }, // Майкл Кейн - Иллюзия обмана
      { id_film: 5, id_actor: 38, position_role: 8 }, // Морган Фриман - Иллюзия обмана

      { id_film: 6, id_actor: 39, position_role: 1 }, // Роберт Де Ниро - Стажер
      { id_film: 6, id_actor: 40, position_role: 2 }, // Энн Хэтэуэй - Стажер
      { id_film: 6, id_actor: 41, position_role: 3 }, // Рене Руссо - Стажер
      { id_film: 6, id_actor: 42, position_role: 4 }, // Эндрю Рэннеллс - Стажер
      { id_film: 6, id_actor: 43, position_role: 5 }, // Адам ДеВайн - Стажер
      { id_film: 6, id_actor: 44, position_role: 6 }, // Нат Вулф - Стажер

      { id_film: 7, id_actor: 45, position_role: 1 }, // Райан Гослинг - Драйв
      { id_film: 7, id_actor: 46, position_role: 2 }, // Кэри Маллиган - Драйв
      { id_film: 7, id_actor: 47, position_role: 3 }, // Альберт Брукс - Драйв
      { id_film: 7, id_actor: 48, position_role: 4 }, // Оскар Айзек - Драйв
      { id_film: 7, id_actor: 49, position_role: 5 }, // Кристина Хендрикс - Драйв
      { id_film: 7, id_actor: 50, position_role: 6 }, // Рон Перлман - Драйв
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('ActorFilm', null, {})
  },
}
