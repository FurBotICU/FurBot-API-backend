/**
 * 管理路由索引
 * /manage
 */
import { Router } from 'express'

// 子路由
import getDeveloperRouter from './developer.js'
import getProgramRouter from './program.js'
import getBotRouter from './bot.js'
import getSecretRouter from './secret.js'
// 中间件
import * as authMiddle from '../../middlewares/auth.js'
export default () => {
  // 初始化路由
  const router = Router()

  // 子路由
  const developerRouter = getDeveloperRouter()
  const programRouter = getProgramRouter()
  const botRouter = getBotRouter()
  const secretRouter = getSecretRouter()
  router.use('/developer', developerRouter)
  router.use('/program', authMiddle.cert, programRouter)
  router.use('/bot', botRouter)
  router.use('/secret', secretRouter)
  return router
}
