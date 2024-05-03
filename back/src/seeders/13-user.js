'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('User', [
      {
        id_user: 1,
        id_person: 1,
        email: '1@mail.ru',
        nickname: '1@mail.ru',
        password: '$2b$10$4CZ0VehhDCyL4WT4CmA2z.gwC2QCNMR9rRpVcWkYgNtMCaJwny/jq',
        is_subscrition: false,
        is_deleted: false,
        id_role: 1,
      },
      {
        id_user: 2,
        id_person: 2,
        email: '2@mail.ru',
        nickname: '2@mail.ru',
        password: '$2b$10$4CZ0VehhDCyL4WT4CmA2z.gwC2QCNMR9rRpVcWkYgNtMCaJwny/jq',
        is_subscrition: false,
        is_deleted: false,
        id_role: 2,
      },
      {
        id_user: 3,
        id_person: 3,
        email: '3@mail.ru',
        nickname: '3@mail.ru',
        password: '$2b$10$4CZ0VehhDCyL4WT4CmA2z.gwC2QCNMR9rRpVcWkYgNtMCaJwny/jq',
        is_subscrition: false,
        is_deleted: false,
        id_role: 3,
      },
      {
        id_user: 4,
        id_person: 4,
        email: '4@mail.ru',
        nickname: '4@mail.ru',
        password: '$2b$10$4CZ0VehhDCyL4WT4CmA2z.gwC2QCNMR9rRpVcWkYgNtMCaJwny/jq',
        is_subscrition: false,
        is_deleted: false,
        id_role: 3,
      },
      {
        id_user: 5,
        id_person: 5,
        email: '5@mail.ru',
        nickname: '5@mail.ru',
        password: '$2b$10$4CZ0VehhDCyL4WT4CmA2z.gwC2QCNMR9rRpVcWkYgNtMCaJwny/jq',
        is_subscrition: false,
        is_deleted: false,
        id_role: 4,
      },
    ])
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('User', null, {})
  },
}
