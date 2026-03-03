import { registration, setToken, setName } from './api.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
  const container = document.querySelector('.container')
  container.innerHTML = `
    <section class="add-form">
        <h1>Форма регистрации</h1>
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name" required/>
    <input type="text" class="add-form-name" placeholder="Введите ваш логин" id="login" required/>
    <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required/>
    <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">Войти</button>
        <u class="add-form-button-link entry">Войти</u>
    </fieldset>
    </section>
  `

  document
    .querySelector('.entry')
    .addEventListener('click', () => renderLogin())

  const nameEl = document.querySelector('#name')
  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const buttonEl = document.querySelector('.button-main')

  buttonEl.addEventListener('click', () => {
    if (nameEl.value === '' || loginEl.value === '' || passwordEl.value === '') {
      return alert('Все поля обязательны для заполнения')
    }
    registration(nameEl.value, loginEl.value, passwordEl.value)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setToken(data.user.token)
        setName(data.user.name)
        renderComments()
      })
  })
}
