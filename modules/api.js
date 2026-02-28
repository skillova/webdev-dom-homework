import { authUrl } from '../index.js'

export let token = ''
export let name = ''
export const setToken = (newToken) => {
  token = newToken
}
export const setName = (newName) => {
  name = newName
}

// GET запрос. Возвращает масив объектов комментариев.
export const commentsList = async (url) => {
  return fetch(`${url}/comments`)
    .then((response) => response.json())
    .then((data) => data.comments)
}

//POST запрос. Отправляет объект для записи комментария.
export const commentCreate = (url, obj) => {
  return fetch(`${url}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
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

//
export const login = (login, password) => {
  return fetch(`${authUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
}

//
export const registration = (name, login, password) => {
  return fetch(`${authUrl}`, {
    method: 'POST',
    body: JSON.stringify({ name, login, password }),
  })
}
