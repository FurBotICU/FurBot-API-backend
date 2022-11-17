/**
 * Bot 程序管理
 * /program
 */
import { Router } from 'express'
// 引入控制器
import * as programCtrl from '../../controllers/manage/program'
// 初始化路由
export default () => {
  const router = Router()
  router.get('/list', programCtrl.getProgramList)
  router.post('/add', programCtrl.addProgram)
  router.post('/update', programCtrl.updateProgram)
  router.post('/delete', programCtrl.deleteProgram)
  return router
}
