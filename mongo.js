/**
 * Mongo 数据库服务
 */

// 引入库
import { plugin, connect as _connect, connection } from 'mongoose'

// 引入配置文件
import { mongo } from './config.json'
const { host, user, pwd, db } = mongo

// 加载插件
export async function loadPlugin() {
  plugin(await import('@mylearningcloud/mongoose-beautiful-unique-validation'))
}

// 连接操作
export async function connect() {
  await new Promise(resolve => {
    console.log('初始化 moogoDB 连接')
    _connect(`mongodb://${user}:${pwd}@${host}/${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection.once('open', async err => {
      if (!err) {
        console.log('moogoDB 连接成功')
      } else {
        console.log('moogoDB 连接失败')
        console.log(err)
        // reject() ?
      }
      resolve()
    })
  })
}
