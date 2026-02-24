import { renderComments } from './renderComments.js'
import { sanitizeHtml } from './sanitizaHtml.js'
import { url } from '../index.js'
import { commentCreate } from './api.js'

// Функция обработки кликов на кнопки лайков
export const addLikeButtonListeners = () => {
  const delay = (interval = 3000) =>
    new Promise((resolve) => setTimeout(resolve, interval))

  document.querySelectorAll('.like-button').forEach((btn) =>
    btn.addEventListener('click', async (event) => {
      event.stopPropagation()
      btn.classList.add('-loading-like')
      await delay()

      const comment = btn.closest('.comment')
      const counter = comment.querySelector('.likes-counter')
      const isLiked = btn.classList.contains('-active-like')

      counter.textContent = isLiked
        ? Number(counter.textContent) - 1
        : Number(counter.textContent) + 1
      btn.classList.toggle('-active-like', !isLiked)
      btn.classList.remove('-loading-like')
    })
  )
}

// Обработчик клика на элемент добавить комментарий
export const addCommentButtonListener = () => {
  const toggleVisibleForm = () => {
    document
      .querySelectorAll('.add-form, .status-message')
      .forEach((el) => el.classList.toggle('none'))
  }

  document.querySelector('.add-form-button').addEventListener('click', () => {
    const commentData = {
      text: sanitizeHtml(document.querySelector('.add-form-text').value),
      name: sanitizeHtml(document.querySelector('.add-form-name').value),
    }

    document
      .querySelectorAll('.add-form-name, .add-form-text')
      .forEach((el) => (el.value = ''))

    toggleVisibleForm()

    commentCreate(url, commentData)
      .then(() => {
        renderComments()
      })
      .finally(() => {
        toggleVisibleForm()
      })
  })
}

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
