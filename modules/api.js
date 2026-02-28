// GET запрос. Возвращает масив объектов комментариев.
export const commentsList = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.comments)
}

//POST запрос. Отправляет объект для записи комментария.
export const commentCreate = (url, obj) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Ошибка сервера')
      }
      if (response.status === 400) {
        throw new Error('Неверный запрос')
      }
      if (response.status === 201) {
        return response.json()
      }
    })
}
