/**
 * Redis 服务
 */

// 引入库
import { createClient as _createClient } from 'redis'

// 引入配置文件
import { redis as config } from './config.json'
const { host, port, pwd } = config

// 连接Redis
/**
 * 创建 redis 客户端。
 * @returns redis 客户端
 */
export function createClient() {
  console.log('初始化 Redis 连接')

  return _createClient({
    socket: {
      host,
      port
    },
    password: pwd
  })
}

/**
 * 配置 redis 连接。
 * @param {RedisClient} client
 * @return redis 客户端。
 */
export function connect(client) {
  return new Promise(resolve => {
    client.connect()

    client.on('ready', async () => {
      console.log('Redis 连接成功')
      resolve()
    })

    client.on('error', async err => {
      console.error('发生错误', err)
      resolve() // reject() ?
    })
  })
}
