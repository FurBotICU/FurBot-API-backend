/**
 * Bot API 索引路由
 * /bot
 */
import { Router } from 'express'
import getStatusRouter from './status.js'
// 控制器
import getToken from '../../controllers/bot/getToken.js'
import heartbeat from '../../controllers/bot/heartbeat.js'
export default () => {
  // 初始化路由
  const router = Router()

  // 子路由
  const statusRouter = getStatusRouter()

  router.use('/status', statusRouter)

  router.post('/getToken', getToken)
  router.post('/heartbeat', heartbeat)
  return router
}
