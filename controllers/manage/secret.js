/**
 * App 密钥管理
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入库
import { simpleflake } from 'simpleflakes'
import srs from 'secure-random-string'

// 引入数据模型
// import Developer from '../../schemas/Developer'
// import Program from '../../schemas/Program'
import { find, create, findOneAndDelete } from '../../schemas/Secret'
/**
 * 获取 Secret 列表
 * @param {Request} req
 * @param {Response} res
 */
export async function getSecretList(req, res) {
  const { uid } = req.session

  let r

  r = await find(
    {
      maintainer: uid
    },
    {
      _id: 0,
      __v: 0,
      secret: 0
    }
  )

  res.send({
    code: 200,
    msg: null,
    data: r
  })
}
/**
 * 生成 Secret
 * @param {Request} req
 * @param {Response} res
 */
export async function genSecret(req, res) {
  const timestamp = new Date()

  const { uid } = req.session
  const { bid, desc, expires } = req.body

  if (
    typeof bid != 'string' ||
    typeof expires != 'number' ||
    (desc && typeof desc != 'string')
  ) {
    res.send({
      code: -402,
      msg: '参数错误'
    })
    return
  }

  if (timestamp.getTime() > expires) {
    res.send({
      code: -402,
      msg: '请使用正确的过期时间'
    })
    return
  }

  const appId = simpleflake().toString(16)
  const secret = srs()

  //   const r = await create({
  //     appId,
  //     secret,
  //     maintainer: uid,
  //     desc,
  //     expires,
  //     bid,
  //     createTime: timestamp
  //   })

  await create({
    appId,
    secret,
    maintainer: uid,
    desc,
    expires,
    bid,
    createTime: timestamp
  })
  res.send({
    code: 200,
    msg: null,
    data: {
      appId,
      secret
    }
  })
}
/**
 * 删除 Secret
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteSecret(req, res) {
  const { uid } = req.session
  const { appId } = req.body

  if (typeof appId != 'string') {
    res.send({
      code: -402,
      msg: '参数错误'
    })
    return
  }

  let r

  r = await findOneAndDelete({
    appId,
    maintainer: uid
  })

  if (!r) {
    res.send({
      code: -404,
      msg: '未找到对应 appId'
    })
    return
  }

  res.send({
    code: 200,
    msg: null
  })
}
