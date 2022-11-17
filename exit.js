/**
 * 退出前释放
 */

import * as mongoose from 'mongoose'
export default redis => {
  process.on('SIGINT', async () => {
    console.log('正在断开 Redis 连接')
    await redis.disconnect()
    console.log('正在断开 mongoDB 连接')
    await mongoose.disconnect()
    process.exit()
  })
}
