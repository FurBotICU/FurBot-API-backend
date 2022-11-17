/**
 * 获取 Bot
 */

// 引入类型
// import { Request, Response } from 'express'

// 引入控制器
import { getBot } from '../../../common/bot.js'

/**
 * 获取 Bot
 * @param {Request} req
 * @param {Response} res
 */
export default async (req, res) => {
  const { bid, qq } = req.query

  let r

  const query = {
    id: bid,
    qq
  }

  r = await getBot(query)

  res.send(r)
}
