'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Film', [
      {
        id_film: 1,
        film_title: 'Джентльмены',
        film_lenght_seconds: 6780,
        description:
          'Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.',
        rating: 4.7,
        subtitles: 0,
        release_year: 2019,
        release_year_russia: 2020,
        is_subscribe: 0,
        is_deleted: 0,
        id_age_limit: 5,
        trailer_path: 'http://localhost:3002/trailer/stream/TheGentlemen.m3u8',
        film_path: 'http://localhost:3002/trailer/film/TheGentlemen.m3u8',
        preview_path: 'http://localhost:3002/preview/TheGentlemen',
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Film', null, {})
  },
}
