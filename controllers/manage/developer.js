/**
 * 开发者管理
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入库
import { resolve } from 'path'

// 引入数据模型
import Developer from '../../schemas/Developer.js'
const { findOne, findOneAndUpdate } = Developer

// 引入通用控制器
import { getAudit, addAudit } from '../../common/audit.js'

export function login(_, res) {
  res.redirect('/oauth/github')
}
/**
 * 开发登录
 * @param {Request} req
 * @param {Response} res
 */
export async function devLogin(req, res) {
  const { token, id } = req.body

  let r

  if (!token || !id) {
    res.send({
      code: -402,
      msg: '请传递正确的参数'
    })
    return
  }

  const originToken = (
    await import(resolve('.temp.json'), {
      assert: { type: 'json' }
      })
  ).token

  if (token != originToken) {
    res.send({
      code: -403,
      msg: '无权访问'
    })
    return
  }

  // 判断 id 是否存在
  r = await findOne({ id })

  if (!r) {
    res.send({
      code: -404,
      msg: 'ID 不存在'
    })
    return
  }

  console.log(`开发登录 - ${r.name}`)

  req.session.uid = id
  res.send({
    code: 200,
    msg: null
  })
}
export function logout(req, res) {
  req.session.destroy()
  res.send({
    code: 200,
    msg: null
  })
}
/**
 * 获取信息
 * @param {Request} req
 * @param {Response} res
 */
export async function getInfo(req, res) {
  let r

  const id = req.session.uid

  r = await findOne(
    { id },
    {
      _id: 0,
      __v: 0
    }
  )

  res.send({
    code: 200,
    msg: null,
    data: r
  })
}
/**
 * 更新信息
 * @param {Request} req
 * @param {Response} res
 */
export async function updateInfo(req, res) {
  let r

  const id = req.session.uid

  // TOOD: 数据校验
  const { nick, name, qq, email, avatar } = req.body

  r = await findOneAndUpdate(
    { id },
    {
      $set: {
        nick,
        name,
        qq,
        email,
        avatar
      }
    },
    {
      new: true,
      projection: {
        __v: 0,
        _id: 0
      }
    }
  )

  res.send({
    code: 200,
    msg: null,
    data: r
  })
}
/**
 * 获取认证申请状态
 * @param {Request} req
 * @param {Response} res
 */
export async function getCertificate(req, res) {
  const query = {
    uid: req.session.uid,
    type: 'certificate'
  }

  const filter = {
    operator: 0
  }

  let r

  r = await getAudit(query, filter)

  res.send({
    code: 200,
    msg: null,
    data: r
  })
}
/**
 * 提交认证申请
 * @param {Request} req
 * @param {Response} res
 */
export async function submitCertificate(req, res) {
  const uid = req.session.uid
  const type = 'certificate'

  let r

  // 判断是否绑定 QQ 和 email
  r = await findOne({ id: uid })

  if (!r.qq || !r.email) {
    res.send({
      code: -402,
      msg: '请先绑定 QQ 和 邮箱'
    })
    return
  }

  r = await addAudit(uid, type)

  console.log(`开发者认证请求 - ${uid} - ${r.data.eid}`)

  res.send(r)
}
/**
 * 提交注销申请
 * @param {Request} req
 * @param {Response} res
 */
export async function destroyAccount(req, res) {
  const uid = req.session.uid
  const type = 'destroy'

  let r = await addAudit(uid, type)

  console.log(`开发者注销账号请求 - ${uid} - ${r.data.eid}`)

  res.send(r)
}
