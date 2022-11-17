/**
 * 获取 Bot 列表
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入控制器
import { getProgram } from '../../../common/program'
import { getBotList } from '../../../common/bot'

// 引入数据模型
import Developer from '../../../schemas/Developer'

/**
 * 获取 Bot 列表
 * @param {Request} req
 * @param {Response} res
 */
export default async (req, res) => {
  let { sid, uid, uname, pid, pname, prepo } = req.query

  let query = {}

  if (uid && uname) {
    res.send({
      code: -402,
      msg: 'uid 和 uname 只能选其一'
    })
    return
  }

  let r

  // 运营者
  if (uname || uid) {
    if (uname) {
      r = await Developer.findOne({ name: uname })

      if (!r) {
        res.send({
          code: -404,
          msg: '未找到对应运营者'
        })
        return
      }

      uid = r.id
    }

    query['maintainer'] = uid
  }

  // 通过程序查找
  if (pid || pname || prepo) {
    if (pname || prepo) {
      r = await getProgram({
        id: pid,
        name: pname,
        repo: prepo
      })

      if (r.data.length == 0) {
        res.send({
          code: -404,
          msg: '未找到对应程序'
        })
        return
      }

      pid = r.data[0].id
    }

    query['$in']['program'] = pid
  }

  Object.assign(query, {
    'series.id': sid
  })

  r = await getBotList(query)

  res.send(r)
}
