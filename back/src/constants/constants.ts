export const EMAIL = 'test@test.ru'
export const EMAIL_ORDER_CLOSE_HTML = `
  <b>Ваша задача выполнена, спасибо!</b>
`

export const OrderStatuses = {
  CREATED: 1, // Создана
  ASSIGNED: 2, // Назначена
  IN_WORK: 3, // В работе
  ON_CHECKING: 4, // На проверке
  CLOSED: 5, // Закрыта
  CANCELED: 6, // Отменена
  CLOSED_OUT_OF_DATE: 7, // Закрыта с нарушением дедлайна
  FOR_REVISION: 8, // Необходима доработка
  NOT_ASSIGNED: 9, // Не назначена
}

export const OrderPriorities = {
  HIGH: 1, // Высокий
  MEDIUM: 2, // Средний
  LOW: 3, // Низкий
}
