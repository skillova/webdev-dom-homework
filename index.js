import { renderComments } from './modules/renderComments.js'
import { addCommentButtonListener } from './modules/initListeners.js'

export const url = `https://wedev-api.sky.pro/api/v1/skillova/comments`

renderComments()
addCommentButtonListener()
