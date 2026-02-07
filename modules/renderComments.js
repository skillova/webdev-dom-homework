import { addLikeButtonListeners, clickComment } from './initListeners.js'
import { commentsList } from './api.js'
import { formatDateUTC } from './utilites.js'

export async function renderComments(url) {
  const container = document.querySelector('.comments')
  const commentsArr = await commentsList(url)

  const html = commentsArr
    .map(
      ({ id, date, likes = 0, isLiked = false, text, author }, index) => `
    <li data-index="${index}" data-id="${id}" class="comment">
      <div class="comment-header">
        <div>${author.name}</div>
        <div>${formatDateUTC(date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${likes}</span>
          <button class="like-button ${isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>
  `
    )
    .join('')

  container.innerHTML = html
  addLikeButtonListeners()
  clickComment()
}
