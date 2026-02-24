import { addLikeButtonListeners, clickComment } from './initListeners.js'
import { formatDateUTC } from './utilites.js'
import { url } from '../index.js'
import { commentsList } from './api.js'

export const renderComments = async () => {
  const container = document.querySelector('.comments')
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
  const commentsArr = await commentsList(url)
  const combinedHtml  = commentsArr.map(commentTemplate).join('')
  container.innerHTML = combinedHtml 

  addLikeButtonListeners()
  clickComment()
}

export const loader = () => {
  document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите, загружаю комментарии...'
}
