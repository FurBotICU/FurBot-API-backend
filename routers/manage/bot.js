/**
 * Bot 管理
 * /bot
 */

import { Router } from 'express'
// 引入控制器
import * as botCtrl from '../../controllers/manage/bot'
// 初始化路由
export default () => {
  const router = Router()

  router.get('/series/list', botCtrl.getBotSeries)
  router.post('/series/add', botCtrl.addBotSeries)
  router.post('/series/update', botCtrl.updateBotSeries)
  router.post('/series/delete', botCtrl.deleteBotSeries)

  router.get('/list', botCtrl.getBotList)
  router.get('/detail', botCtrl.getBotById)
  router.post('/add', botCtrl.addBot)
  router.post('/update', botCtrl.updateBot)
  router.post('/delete', botCtrl.deleteBot)
  return router
}
