/**
 * 状态类
 * /status
 */

import getBotProgramList from '../../controllers/bot/status/getBotProgramList'
import getBotProgram from '../../controllers/bot/status/getBotProgram'
import getBotList from '../../controllers/bot/status/getBotList'
import getBot from '../../controllers/bot/status/getBot'
import { Router } from 'express'
export default () => {
  const router = Router()

  router.get('/getBotProgramList', getBotProgramList)
  router.get('/getBotProgram', getBotProgram)
  router.get('/getBotList', getBotList)
  router.get('/getBot', getBot)
  return router
}
