/**
 * Bot 程序管理
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入通用控制器
import {
  getProgram,
  addProgram as _addProgram,
  updateProgram as _updateProgram,
  deleteProgram as _deleteProgram
} from '../../common/program'
/**
 * 获取当前帐号注册的程序列表
 * @param {Request} req
 * @param {Response} res
 */
export async function getProgramList(req, res) {
  // const { uid } = req.session

  const r = await getProgram({
    $in: {
      contributor: req.session.uid
    }
  })

  res.send(r)
}
/**
 * 增加 Bot 程序
 * @param {Request} req
 * @param {Response} res
 */
export async function addProgram(req, res) {
  const { uid } = req.session

  const { name, nick, intro, repo } = req.body

  let r

  r = await _addProgram({
    name,
    nick,
    intro,
    repo,
    contributor: uid
  })

  res.send(r)
}
/**
 * 更新 Bot 程序信息
 * @param {Request} req
 * @param {Response} res
 */
export async function updateProgram(req, res) {
  const { uid } = req.session

  const { pid, name, nick, intro, repo } = req.body

  let r

  r = await _updateProgram(
    {
      id: pid,
      $in: {
        contributor: uid
      }
    },
    {
      name,
      nick,
      intro,
      repo
    }
  )

  res.send(r)
}
/**
 * 删除 Bot 程序
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteProgram(req, res) {
  let r

  const { uid } = req.session

  const { pid } = req.body

  if (typeof pid != 'string') {
    res.send({
      code: -402,
      msg: '参数不正确'
    })
    return
  }

  r = await _deleteProgram({
    $in: {
      contributor: uid
    },
    id: pid
  })

  res.send(r)
}
