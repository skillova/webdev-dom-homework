import { renderComments } from './modules/renderComments.js'
import { addCommentButtonListener } from './modules/initListeners.js'
import { loader } from './modules/renderComments.js'

export const url = `https://wedev-api.sky.pro/api/v1/skillova/comments`

loader()
renderComments()
addCommentButtonListener()
