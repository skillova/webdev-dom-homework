import { renderComments } from "./renderComments.js";
import { commentsArr } from "./comments.js";
import { sanitizeHtml } from "./sanitizaHtml.js";
import { getNowDate } from "./utilites.js";

// Функция обработки кликов на кнопки лайков
export function addLikeButtonListeners() {
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      // Индекс и значения из массива по индексу
      const commentItem = this.closest(".comment");
      const index = Number(commentItem.dataset.index);
      const isLiked = commentsArr[index].isLiked;
      const counter = Number(commentsArr[index].likesCount);
      // Новые значения лайков
      const counterNew = isLiked ? counter - 1 : counter + 1;
      const isLikedNew = !isLiked;
      // Импорт изменений в массив комментариев
      commentsArr[index].isLiked = isLikedNew;
      commentsArr[index].likesCount = counterNew;
      renderComments(commentsArr);
    });
  });
}

// Обработчик клика на элемент добавить комментарий
export function addCommentButtonListener() {
  document.querySelector(".add-form-button").addEventListener("click", function () {
    // Получение данных из формы
    const author = sanitizeHtml(document.querySelector(".add-form-name").value);
    const text = sanitizeHtml(document.querySelector(".add-form-text").value);
    const pubDate = getNowDate();
    // Добавление в массив
    if (author && text) {
      const commentObj = { author, text, pubDate, likesCount: 0, isLiked: false };
      commentsArr.push(commentObj);
      document.querySelector(".add-form-name").value = "";
      document.querySelector(".add-form-text").value = "";
    } else {
      alert("Заполните все поля!");
    }
    renderComments(commentsArr);
  });
}

// Обработчик клика на карточку комментария
export function clickComment() {
  document.querySelectorAll(".comment").forEach((comment) => {
    comment.addEventListener("click", function () {
      const commentItem = this.closest(".comment");
      const index = Number(commentItem.dataset.index);
      const form = document.querySelector(".add-form");
      const input = form.querySelector(".add-form-name");
      const text = form.querySelector(".add-form-text");
      text.value = `${commentsArr[index].author}: ${commentsArr[index].text}`;
    });
  });
}
