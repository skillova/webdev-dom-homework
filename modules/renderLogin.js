import { login, setToken, setName } from './api.js'
import { renderComments } from './renderComments.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
  const container = document.querySelector('.container')
  container.innerHTML = `
    <section class="add-form">
        <h1>Форма входа</h1>
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="login" required/>
    <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required/>
    <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">Войти</button>
        <u class="add-form-button-link registry">Регистрация</u>
    </fieldset>
    </section>
  `
  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const buttonEl = document.querySelector('.button-main')

  document.querySelector('.registry').addEventListener('click', () => {
    renderRegistration()
  })

  buttonEl.addEventListener('click', () => {
    if (loginEl.value === '' || passwordEl.value === '') {
      return alert('Введите логин и пароль')
    }
    login(loginEl.value, passwordEl.value)
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
