import {
  addLikeButtonListeners,
  clickComment,
  btnLoginListener,
  addCommentButtonListener,
} from './initListeners.js'
import { formatDateUTC } from './utilites.js'
import { url } from '../index.js'
import { commentsList, token, name } from './api.js'

export const renderComments = async () => {
  const container = document.querySelector('.container')
  const commentTemplate = (comment, index) => `
   <li data-index="${index}" data-id="${comment.id}" class="comment">
    <div class="comment-header">
      <div>${comment.author?.name || 'Аноним'}</div>
      <div>${formatDateUTC(comment.date) || 'Дата недоступна'}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">${comment.text || 'Текст комментария недоступен'}</div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likes || 0}</span>
        <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
      </div>
    </div>
  </li>
`
  const addCommentsHtml = `
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          value= ${name}
          readonly
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
      <span class="status-message none">Комментарий добавляется...</span>
      `

  const commentsArr = await commentsList(url)
  const commentsHtml = commentsArr.map(commentTemplate).join('')
  const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span>`
  const combinedHtml = `<ul class="comments">${commentsHtml}</ul>${token ? addCommentsHtml : linkToLoginText}`
  container.innerHTML = combinedHtml

  if (token) {
    addCommentButtonListener()
    addLikeButtonListeners()
    clickComment()
  } else {
    btnLoginListener()
  }
}

export const loader = () => {
  document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите, загружаю комментарии...'
}
