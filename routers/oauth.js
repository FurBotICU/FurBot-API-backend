/**
 * OAuth
 * /oauth
 */
import {Router} from 'express'
import * as githubCtrl from '../controllers/oauth/github.js'
export default () => {
  const router = Router()

  router.get('/github', githubCtrl.request)
  router.get('/github/callback', githubCtrl.callback)

  return router
}
