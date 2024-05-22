'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Film', [
      {
        id_film: 1,
        film_title: 'Джентльмены',
        film_length_seconds: 6780,
        description:
          'Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.',
        rating: 4.7,
        subtitles: false,
        release_year: 2019,
        release_year_russia: 2020,
        is_subscribe: false,
        is_deleted: false,
        is_processed: 1,
        id_age_limit: 5,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Film', null, {})
  },
}
