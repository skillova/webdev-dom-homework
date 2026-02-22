import { addLikeButtonListeners, clickComment } from './initListeners.js'
import { formatDateUTC } from './utilites.js'
import { url } from '../index.js'

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
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const html = data.comments.map(commentTemplate).join('')
      container.innerHTML = html
    })

  addLikeButtonListeners()
  clickComment()
}
