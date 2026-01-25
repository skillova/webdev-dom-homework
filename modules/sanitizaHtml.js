    // Валидтор текста комментариев
    export function sanitizeHtml(text) {
      return text.replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;")
    }