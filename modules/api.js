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
}
