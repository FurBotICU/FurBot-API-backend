/**
 * Bot 管理
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入通用控制器
import {
  getBotSeries as _getBotSeries,
  addBotSeries as _addBotSeries,
  updateBotSeries as _updateBotSeries,
  deleteBotSeries as _deleteBotSeries,
  getBotList as _getBotList,
  getBot,
  addBot as _addBot,
  updateBot as _updateBot,
  deleteBot as _deleteBot
} from '../../common/bot'
/**
 * 获取 Bot 系列列表
 * @param {Request} req
 * @param {Response} res
 */
export async function getBotSeries(req, res) {
  const { uid } = req.session

  let r

  r = await _getBotSeries({ maintainer: uid })

  res.send(r)
}
/**
 * 增加 Bot 系列列表
 * @param {Request} req
 * @param {Response} res
 */
export async function addBotSeries(req, res) {
  const { uid } = req.session
  const { name } = req.body

  let r

  r = await _addBotSeries({
    maintainer: uid,
    name
  })

  res.send(r)
}
/**
 * 更新 Bot 系列列表
 * @param {Request} req
 * @param {Response} res
 */
export async function updateBotSeries(req, res) {
  const { uid } = req.session
  const { sid, name } = req.body

  let r

  r = await _updateBotSeries(
    {
      maintainer: uid,
      id: sid
    },
    {
      $set: {
        name
      }
    }
  )

  res.send(r)
}
/**
 * 删除 Bot 系列列表
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteBotSeries(req, res) {
  const { uid } = req.session
  const { sid } = req.body

  let r

  r = await _deleteBotSeries({
    maintainer: uid,
    id: sid
  })

  res.send(r)
}
/**
 * 获取当前开发者 Bot 列表
 * @param {Request} req
 * @param {Response} res
 */
export async function getBotList(req, res) {
  const { uid } = req.session

  let r

  r = await _getBotList({
    maintainer: uid
  })

  res.send(r)
}
/**
 * 通过 Bot ID 获取 Bot 详情
 * @param {Request} req
 * @param {Response} res
 */
export async function getBotById(req, res) {
  const { bid } = req.query

  if (!bid) {
    res.send({
      code: -402,
      msg: '参数不完整'
    })
    return
  }

  let r

  r = await getBot({
    id: bid
  })

  res.send(r)
}
/**
 * 增加 Bot
 * @param {Request} req
 * @param {Response} res
 */
export async function addBot(req, res) {
  const { uid } = req.session
  const { qq, name, intro, series, program } = req.body

  let r

  r = await _addBot({
    maintainer: uid,
    qq,
    name,
    intro,
    series,
    program
  })

  res.send(r)
}
/**
 * 更新 Bot
 * @param {Request} req
 * @param {Response} res
 */
export async function updateBot(req, res) {
  const { uid } = req.session
  const { bid, qq, name, intro, series, program } = req.body

  let r

  r = await _updateBot(
    {
      id: bid,
      maintainer: uid
    },
    {
      qq,
      name,
      intro,
      series,
      program
    }
  )

  res.send(r)
}
/**
 * 删除 Bot 系列列表
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteBot(req, res) {
  const { uid } = req.session
  const { bid } = req.body

  let r

  r = await _deleteBot({
    maintainer: uid,
    id: bid
  })

  res.send(r)
}
