import { renderComments } from './modules/renderComments.js'
import { loader } from './modules/renderComments.js'

export const url = `https://wedev-api.sky.pro/api/v2/skillova`
export const authUrl = 'https://wedev-api.sky.pro/api/user'

loader()
renderComments()
