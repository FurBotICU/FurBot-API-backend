/**
 * FurBot-API
 * @author colour93 <colour_93@furry.top>
 * @author FurryR <nu11ptr@foxmail.com>
 */

import preload from './preload'
import * as redis from './redis'
import * as mongo from './mongo'
import express from './express'
import exit_handler from './exit'

// 加载预处理
preload()
// 初始化
;(async () => {
  const client = redis.createClient()
  await redis.connect(client)
  await mongo.loadPlugin()
  await mongo.connect()
  express()
  exit_handler(client)
})()
