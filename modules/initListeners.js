import { renderComments } from './renderComments.js'
import { sanitizeHtml } from './sanitizaHtml.js'
import { commentsCreate } from './api.js'
import { url } from '../index.js'

// Функция обработки кликов на кнопки лайков
export const addLikeButtonListeners = () => {
  document.querySelectorAll('.like-button').forEach((btn) =>
    btn.addEventListener('click', (event) => {
      event.stopPropagation()
      const comment = btn.closest('.comment')
      const counter = comment.querySelector('.likes-counter')
      const newCounter = Number(counter.textContent)
      const isLiked = btn.classList.contains('-active-like')

      counter.textContent = isLiked ? newCounter - 1 : newCounter + 1
      btn.classList.toggle('-active-like', !isLiked)
    })
  )
}

// Обработчик клика на элемент добавить комментарий
export const addCommentButtonListener = () =>
  document.querySelector('.add-form-button').addEventListener('click', () => {
    const name = sanitizeHtml(document.querySelector('.add-form-name').value)
    const text = sanitizeHtml(document.querySelector('.add-form-text').value)
    if (!name || !text) {
      alert('Заполните все поля!')
      return
    }
    commentsCreate(url, { name: name, text: text })
    document.querySelector('.add-form-name').value = ''
    document.querySelector('.add-form-text').value = ''
    renderComments(url)
  })

// Обработчик клика на карточку комментария
export function clickComment() {
  document.querySelectorAll('.comment').forEach((comment) => {
    comment.addEventListener('click', () => {
      const author = comment.querySelector('.comment-header > div').textContent
      const text = comment.querySelector('.comment-text').textContent
      const form = document.querySelector('.add-form')
      const textInput = form.querySelector('.add-form-text')
      textInput.value = `@${author}: ${text} - `
      textInput.focus()
    })
  })
}
