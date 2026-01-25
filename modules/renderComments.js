import {addLikeButtonListeners, clickComment} from "./initListeners.js"; // Импорт функций обработчиков событий

// Добавление комментария в массив
function addComment(commentObj) {
  commentsArr.push(commentObj);
  document.querySelector(".add-form-name").value = "";
  document.querySelector(".add-form-text").value = "";
}

// Функция рендеринга комментариев
export function renderComments(commentsArr) {
  // Поиск контейнера для комментариев
  const containerComments = document.querySelector(".comments");
  let commentsHTML = "";
  // Шаблон комментария
  const COMMENT_TEMPLATE = `
    <li data-index = {{index}} class="comment">
        <div class="comment-header">
          <div>{{author}}</div>
          <div>{{date}}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">{{text}}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">{{likes}}</span>
            <button class="like-button {{likedClass}}"></button>
          </div>
        </div>
      </li>
    `;
  // Заполнение шаблона комментария
  commentsArr.forEach((comment, index) => {
    // Деструктуризация объекта комментария
    const { author, pubDate, text, likesCount = 0, isLiked = false } = comment;
    // Класс для кнопки лайка
    const likedClass = isLiked ? "-active-like" : "";
    // Заполнение шаблона
    commentsHTML += COMMENT_TEMPLATE.replace("{{index}}", index)
      .replace("{{author}}", author)
      .replace("{{date}}", pubDate)
      .replace("{{text}}", text)
      .replace("{{likes}}", likesCount)
      .replace("{{likedClass}}", likedClass);
  });
  // Вставка в DOM
  containerComments.innerHTML = commentsHTML;
  // Обработчики на кнопки лайков
  addLikeButtonListeners();
  // Обработчик клика на карточку комментария
  clickComment();
}
