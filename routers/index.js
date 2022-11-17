// 引入库
import { Router } from 'express'

// 子路由
import manageRouter from './manage'
import oauthRouter from './oauth'
import botRouter from './bot'

// 中间件
import { status, verifySign } from '../middlewares/auth'
/**
 * 初始化路由。
 * @returns 路由
 */
export default () => {
  // 初始化路由
  const router = Router()
  router.use('/manage', status, manageRouter)
  router.use('/oauth', oauthRouter)
  router.use('/bot', verifySign, botRouter)

  router.get('/', async (_req, res) => {
    res.redirect('https://dash.api.furbot.icu')
  })
  return router
}
