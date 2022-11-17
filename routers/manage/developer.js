/**
 * 开发者管理
 * /developer
 */
import { Router } from 'express'
import * as developerCtrl from '../../controllers/manage/developer.js'
// 初始化路由
export default () => {
  const router = Router()
  router.get('/login', developerCtrl.login)
  if (process.env.dev) router.post('/login', developerCtrl.devLogin)
  router.get('/logout', developerCtrl.logout)
  router.post('/destroy', developerCtrl.destroyAccount)

  router.get('/info', developerCtrl.getInfo)
  router.post('/info/update', developerCtrl.updateInfo)

  router.get('/certificate/status', developerCtrl.getCertificate)
  router.post('/certificate/submit', developerCtrl.submitCertificate)
  return router
}
