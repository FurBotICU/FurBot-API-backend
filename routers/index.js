// 引入库
import { Router } from 'express'

// 子路由
import getManageRouter from './manage/index.js'
import getOAuthRouter from './oauth.js'
import getBotRouter from './bot/index.js'

// 中间件
import { status, verifySign } from '../middlewares/auth.js'
/**
 * 初始化路由。
 * @returns 路由
 */
export default () => {
  // 初始化路由
  const router = Router()
  router.use('/manage', status, getManageRouter())
  router.use('/oauth', getOAuthRouter())
  router.use('/bot', verifySign, getBotRouter())

  router.get('/', async (_req, res) => {
    res.redirect('https://dash.api.furbot.icu')
  })
  return router
}
