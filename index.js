import { renderComments } from './modules/renderComments.js'
import { commentsArr } from './modules/comments.js'
import { addCommentButtonListener } from './modules/initListeners.js'

renderComments(commentsArr)
addCommentButtonListener()
