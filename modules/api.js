export const commentsList = async (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.comments)
}

export const commentsCreate = async (url, obj) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
  })
}
