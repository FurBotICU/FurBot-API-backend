/**
 * 状态类
 * /status
 */

import getBotProgramList from '../../controllers/bot/status/getBotProgramList.js'
import getBotProgram from '../../controllers/bot/status/getBotProgram.js'
import getBotList from '../../controllers/bot/status/getBotList.js'
import getBot from '../../controllers/bot/status/getBot.js'
import { Router } from 'express'
export default () => {
  const router = Router()

  router.get('/getBotProgramList', getBotProgramList)
  router.get('/getBotProgram', getBotProgram)
  router.get('/getBotList', getBotList)
  router.get('/getBot', getBot)
  return router
}
