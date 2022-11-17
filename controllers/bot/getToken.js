/**
 * 换取 Token
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入库
import { sign as _sign } from 'jsonwebtoken'
import md5 from 'md5'

// 引入配置文件
import { token as config } from '../../config.json'

// 引入数据模型
import Secret from '../../schemas/Secret'

/**
 * 换取 Token
 * @param {Request} req
 * @param {Response} res
 */
export default async (req, res) => {
  const { appId, timestamp, sign } = req.body

  let r

  const ts = new Date().getTime()

  if (
    typeof appId != 'string' ||
    typeof timestamp != 'number' ||
    typeof sign != 'string'
  ) {
    res.send({
      code: -402,
      msg: '参数不正确'
    })
    return
  }

  if (timestamp < ts - 10 * 60 * 1000 || timestamp > ts + 10 * 60 * 1000) {
    res.send({
      code: -402,
      msg: '签名已过期'
    })
    return
  }

  r = await Secret.findOne({
    appId
  })

  if (!r) {
    res.send({
      code: -404,
      msg: '未找到对应 appId'
    })
    return
  }

  const originSecret = r.secret

  let flag = req.originalUrl.indexOf('?')

  if (flag == -1) flag = req.originalUrl.length

  const path = req.originalUrl.substring(0, flag)

  // timestamp + path + secret

  const originSign = md5(timestamp + path + originSecret)

  if (originSign != sign.toLocaleLowerCase()) {
    res.send({
      code: -403,
      msg: '签名无效'
    })
    return
  }

  // 签发 24h
  const token = _sign(
    {
      appId
    },
    config.secret,
    {
      expiresIn: 24 * 60 * 60
    }
  )

  const expires = ts + 24 * 60 * 60 * 1000

  res.send({
    code: 200,
    msg: null,
    data: {
      token,
      expires
    }
  })

  console.log(`获取 token: ${appId} - ${expires}`)
}
