/**
 * FurBot-API
 * @author colour93 <colour_93@furry.top>
 * @author FurryR <nu11ptr@foxmail.com>
 */

import preload from './preload.js'
import * as redis from './redis.js'
import * as mongo from './mongo.js'
import express from './express.js'
import exit_handler from './exit.js'

// 加载预处理
preload()
// 初始化
;(async () => {
  // const client = redis.createClient()
  await redis.connect(redis.client)
  await mongo.loadPlugin()
  await mongo.connect()
  express('./')
  exit_handler(redis.client)
})()
