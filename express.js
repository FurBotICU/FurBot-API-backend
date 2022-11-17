/**
 * Express 服务
 */

// 引入库
import express, { static as _static } from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import getRouter from './routers'

// 引入配置文件
import { express as _express } from './config.json'
const { port, session: {
  domain, secret
} } = _express

import { resolve } from 'path'

// 错误处理
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' 需要提升权限')
      void process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' 端口已在使用中')
      void process.exit(1)
      break // eslint 精巧骗术？
    default:
      throw error
  }
}

// 监听处理
function onListening() {
  // let addr = server.address()
  /// unused variable
  // let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
}

// 初始化
export default () => {
  console.log('初始化 Express')

  // 引入路由
  const router = getRouter()

  // 初始化 Express 实例
  const app = express()

  // 处理跨域
  const allowCors = (_req, _res, next) => {
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Credentials','true');
    next()
  }
  app.use(allowCors)

  // 使用数据处理中间件
  app.use(json())
  app.use(cookieParser())
  app.use(
    session({
      secret: secret,
      name: 'sid',
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain
      }
    })
  )

  // 调试输出
  if (process.env.MORGAN && process.env.MORGAN == 'true') {
    console.log('已启用 HTTP 记录调试输出')
    app.use(morgan('dev'))
  }

  // 前端
  app.use('/public', _static(resolve(__dirname, 'public')))

  // 设置路由
  app.use('/', router)

  // 设置端口
  console.log(`Epxress 运行于 ${port}`)
  app.set('port', port)

  // 创建 HTTP 服务实例
  const server = createServer(app)

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}
