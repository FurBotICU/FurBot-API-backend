/**
 * App 密钥管理
 * /secret
 */
import { Router } from 'express'
import * as secretCtrl from '../../controllers/manage/secret.js'
// 初始化路由
export default () => {
  const router = Router()
  // 引入控制器
  router.get('/list', secretCtrl.getSecretList)
  router.post('/add', secretCtrl.genSecret)
  router.post('/delete', secretCtrl.deleteSecret)
  return router
}
