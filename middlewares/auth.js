/**
 * 身份验证 中间件
 */

// 引入库
// import { Request, Response, next } from 'express'
import jsonwebtoken from 'jsonwebtoken'
const { verify: _verify } = jsonwebtoken

// 引入数据模型
import Developer from '../schemas/Developer.js'
import Secret from '../schemas/Secret.js'
const { findOne } = Secret

// 引入配置文件
import _config from '../config.json' assert { type: 'json' }
const { token: _token } = _config
/**
 * 判断登录态
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export async function status(req, res, next) {
  // 排除 /manage/developer/login
  if (req.path != '/developer/login') {
    if (!req.session.uid) {
      res.send({
        code: -401,
        msg: '未登录'
      })
      return
    }

    let r = await Developer.findOne({ id: req.session.uid })

    if (!r) {
      req.session.uid = null
      res.send({
        code: -401,
        msg: '账号不存在'
      })
      return
    }
  }

  // 跳回
  next()
}
/**
 * 验证是否认证
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export async function cert(req, res, next) {
  const r = await Developer.findOne({
    id: req.session.uid
  })

  if (!r || !r.certificate) {
    res.send({
      code: -403,
      msg: '账户未认证，前面的区域，以后再来探索吧！'
    })
    return
  }

  // 跳回
  next()
}
/**
 * 验证身份
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export async function verify(req, res, next) {
  const r = await Developer.findOne({
    id: req.session.uid
  })

  if (!r || r.role != 'admin') {
    res.send({
      code: -403,
      msg: '无权访问'
    })
    return
  }

  // 跳回
  next()
}
/**
 * 验证签名
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export async function verifySign(req, res, next) {
  // 排除 /bot/getToken
  if (req.path != '/getToken') {
    const { token } = req.headers

    if (!token) {
      res.send({
        code: -401,
        msg: '未登录'
      })
      return
    }

    const jwtSecret = _token.secret

    let r,
      data = {}

    try {
      data = _verify(token, jwtSecret)
    } catch (error) {
      let resp = {}

      switch (error.name) {
        case 'JsonWebTokenError':
          resp = {
            code: -403,
            msg: 'token 无效'
          }
          break

        case 'TokenExpiredError':
          resp = {
            code: -403,
            msg: 'token 已过期'
          }
          break

        default:
          resp = {
            code: -500,
            msg: '服务器内部错误'
          }
          console.log(error)
          break
      }

      res.send(resp)

      return
    }

    const { appId } = data

    if (!appId) {
      res.send({
        code: -403,
        msg: 'token 无效'
      })
      return
    }

    r = await findOne({ appId })

    if (!r) {
      res.send({
        code: -401,
        msg: 'secret 不存在'
      })
      return
    }

    req.bid = r.bid
    req.appId = r.appId
    req.uid = r.maintainer
  }

  next()
}
