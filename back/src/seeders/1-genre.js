'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Genre', [
      {
        id_genre: 1,
        genre_name: 'аниме',
      },
      {
        id_genre: 2,
        genre_name: 'биографический',
      },
      {
        id_genre: 3,
        genre_name: 'боевик',
      },
      {
        id_genre: 4,
        genre_name: 'вестерн',
      },
      {
        id_genre: 5,
        genre_name: 'военный',
      },
      {
        id_genre: 6,
        genre_name: 'детектив',
      },
      {
        id_genre: 7,
        genre_name: 'детский',
      },
      {
        id_genre: 8,
        genre_name: 'документальный',
      },
      {
        id_genre: 9,
        genre_name: 'драма',
      },
      {
        id_genre: 10,
        genre_name: 'исторический',
      },
      {
        id_genre: 11,
        genre_name: 'кинокомикс',
      },
      {
        id_genre: 12,
        genre_name: 'комедия',
      },
      {
        id_genre: 13,
        genre_name: 'концерт',
      },
      {
        id_genre: 14,
        genre_name: 'короткометражный',
      },
      {
        id_genre: 15,
        genre_name: 'криминал',
      },
      {
        id_genre: 16,
        genre_name: 'мелодрама',
      },
      {
        id_genre: 17,
        genre_name: 'мистика',
      },
      {
        id_genre: 18,
        genre_name: 'музыка',
      },
      {
        id_genre: 19,
        genre_name: 'мультфильм',
      },
      {
        id_genre: 20,
        genre_name: 'мюзикл',
      },
      {
        id_genre: 21,
        genre_name: 'научный',
      },
      {
        id_genre: 22,
        genre_name: 'нуар',
      },
      {
        id_genre: 23,
        genre_name: 'приключения',
      },
      {
        id_genre: 24,
        genre_name: 'реалити-шоу',
      },
      {
        id_genre: 25,
        genre_name: 'семейный',
      },
      {
        id_genre: 26,
        genre_name: 'спорт',
      },
      {
        id_genre: 27,
        genre_name: 'ток-шоу',
      },
      {
        id_genre: 28,
        genre_name: 'триллер',
      },
      {
        id_genre: 29,
        genre_name: 'ужасы',
      },
      {
        id_genre: 30,
        genre_name: 'фантастика',
      },
      {
        id_genre: 31,
        genre_name: 'фэнтези',
      },
      {
        id_genre: 32,
        genre_name: 'эротика',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Genre', null, {})
  },
}
