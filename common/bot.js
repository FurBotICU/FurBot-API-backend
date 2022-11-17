/**
 * 通用控制器
 * Bot
 */

// 引入库
import { simpleflake } from 'simpleflakes'
import { client } from '../redis'
import { filterUndefined } from '../utils/filter'

// 引入数据模型
import {
  find,
  create,
  findOneAndUpdate,
  findOneAndDelete,
  findOne
} from '../schemas/Series'
import {
  findOne as _findOne,
  find as _find,
  create as _create,
  findOneAndUpdate as _findOneAndUpdate,
  findOneAndDelete as _findOneAndDelete
} from '../schemas/Bot'
import { findOne as __findOne } from '../schemas/Program'
/**
 * 获取 Bot 系列列表
 * @param {Object} query
 * @return {Object}
 */
export async function getBotSeries(query) {
  let r

  query = filterUndefined(query)

  r = await find(query, {
    _id: 0,
    __v: 0
  })

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 增加 Bot 系列列表
 * @param {Object} data
 * @return {Object}
 */
export async function addBotSeries(data) {
  let r

  const { name, maintainer } = data

  if (typeof name != 'string')
    return {
      code: -402,
      msg: '参数不正确'
    }

  r = await create({
    id: simpleflake().toString(36),
    name,
    maintainer,
    createTime: new Date()
  })

  console.log(`增加 Bot 系列: ${maintainer} - ${r.name} (${r.id})`)

  return {
    code: 200,
    msg: null,
    data: {
      sid: r.id
    }
  }
}
/**
 * 更新 Bot 系列列表
 * @param {Object} query 自定义 query，可以是 id 也可以是 name
 * @param {Object} data
 * @return {Object}
 */
export async function updateBotSeries(query, data) {
  let r

  r = await findOneAndUpdate(query, data, {
    new: true,
    projection: {
      __v: 0,
      _id: 0
    }
  })

  if (!r)
    return {
      code: -404,
      msg: '未找到对应系列'
    }

  console.log(
    `更新 Bot 系列: ${query.maintainer ? query.maintainer : ''} ${r.name} (${
      r.id
    })`
  )

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 删除 Bot 系列列表
 * @param {Object} query
 * @return {Object}
 */
export async function deleteBotSeries(query) {
  let r

  r = await findOneAndDelete(query)

  if (!r)
    return {
      code: -404,
      msg: '未找到对应系列'
    }

  console.log(
    `删除 Bot 系列: ${query.maintainer ? query.maintainer : ''} ${r.name} (${
      r.id
    })`
  )

  return {
    code: 200,
    msg: null
  }
}
/**
 * 获取 Bot
 * @param {Object} query
 * @return {Object}
 */
export async function getBot(query) {
  let r

  query = filterUndefined(query)

  r = await _findOne(query, {
    _id: 0,
    __v: 0
  }).lean()

  if (!r)
    return {
      code: -404,
      msg: '未找到对应 Bot'
    }

  r = await getBotItemStatus(r)

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 获取 Bot 列表
 * @param {Object} query
 * @return {Object}
 */
export async function getBotList(query) {
  let r

  query = filterUndefined(query)

  r = await _find(query, {
    _id: 0,
    __v: 0
  }).lean()

  r = await getBotItemStatus(r)

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 增加 Bot
 * @param {Object} data
 * @return {Object}
 */
export async function addBot(data) {
  let r

  const { qq, name, intro, series, maintainer, program } = data

  if (
    typeof qq != 'number' ||
    typeof name != 'string' ||
    typeof maintainer != 'string' ||
    (program && typeof program != 'object') ||
    (series &&
      (typeof series != 'object' ||
        typeof series.id != 'string' ||
        typeof series.serialId != 'number'))
  )
    return {
      code: -402,
      msg: '参数不正确'
    }

  let type = series ? 'series' : 'single'

  if (series) {
    // 先判断 series 是否存在
    r = await findOne({
      id: series.id
    })

    if (!r)
      return {
        code: -404,
        msg: '未找到对应系列'
      }

    // 再判断是否有重复 serialId
    r = await _findOne({
      series
    })

    if (r)
      return {
        code: -402,
        msg: '该系列已存在重复系列ID'
      }
  }

  if (program) {
    for (const [, item] of Object.entries(program)) {
      r = await __findOne({
        id: item
      })

      if (!r)
        return {
          code: -404,
          msg: '包含如下不存在的 Bot 程序',
          data: {
            pid: item
          }
        }
    }
  }

  r = await _create({
    id: simpleflake().toString(36),
    qq,
    name,
    intro,
    type,
    series,
    maintainer,
    program,
    createTime: new Date()
  })

  console.log(`增加 Bot: ${maintainer} - ${r.name} (${r.id})`)

  return {
    code: 200,
    msg: null,
    data: {
      bid: r.id
    }
  }
}
/**
 * 更新 Bot
 * @param {Object} query
 * @param {Object} data
 * @return {Object}
 */
export async function updateBot(query, data) {
  let r

  const maintainer = query.maintainer || data.maintainer

  const { qq, name, intro, series, program } = data

  if (
    (qq && typeof qq != 'number') ||
    (name && typeof name != 'string') ||
    (maintainer && typeof maintainer != 'string') ||
    (program && typeof program != 'object') ||
    (series &&
      (typeof series != 'object' ||
        typeof series.id != 'string' ||
        typeof series.serialId != 'number'))
  )
    return {
      code: -402,
      msg: '参数不正确'
    }

  let type = series ? 'series' : 'single'

  if (series) {
    // 先判断 series 是否存在
    r = await findOne({
      id: series.id
    })

    if (!r)
      return {
        code: -404,
        msg: '未找到对应系列'
      }

    // 再判断是否有重复 serialId
    r = await _findOne({
      series
    })

    if (r)
      return {
        code: -402,
        msg: '该系列已存在重复系列ID'
      }
  }

  if (program) {
    for (const [, item] of Object.entries(program)) {
      r = await __findOne({
        id: item
      })

      if (!r)
        return {
          code: -404,
          msg: '包含如下不存在的 Bot 程序',
          data: {
            pid: item
          }
        }
    }
  }

  r = await _findOneAndUpdate(
    query,
    {
      qq,
      name,
      intro,
      type,
      series,
      maintainer,
      program
    },
    {
      new: true,
      projection: {
        _id: 0,
        __v: 0
      }
    }
  )

  console.log(
    `更新 Bot: ${query.maintainer ? query.maintainer : ''} ${r.name} (${r.id})`
  )

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 删除 Bot 系列列表
 * @param {Object} query
 * @return {Object}
 */
export async function deleteBot(query) {
  let r

  r = await _findOneAndDelete(query)

  if (!r)
    return {
      code: -404,
      msg: '未找到对应 Bot'
    }

  console.log(
    `删除 Bot: ${query.maintainer ? query.maintainer : ''} ${r.name} (${r.id})`
  )

  return {
    code: 200,
    msg: null
  }
}

/**
 * 获取 Bot 状态
 * @param {Array | String} bots
 * @return {Array | Number | null}
 */
export async function getBotStatus(bot) {
  const rStr = 'furbot-api:bot:'

  let r

  switch (typeof bot) {
    case 'object':
      if (!bot.length) return bot

      bot = bot.map(e => {
        return rStr + e
      })

      r = await client.mGet(bot)

      break

    case 'string':
      r = await client.get(rStr + bot)

      break

    default:
      return bot
  }

  return r
}

/**
 * 获取 Bot Item 列表状态
 * @param {Array | Object} botItem
 * @return {Array | Object}
 */
export async function getBotItemStatus(botItem) {
  const rStr = 'furbot-api:bot:'

  let r
  if (Array.isArray(botItem)) {
    r = []

    let botList = botItem.map(e => {
      return rStr + e.id
    })

    botList = await client.mGet(botList)

    for (let i = 0; i < botItem.length; i++) {
      const bot = botList[i]
      r.push(
        Object.assign(botItem[i], {
          status: bot ? 'online' : 'offline',
          startTime: bot ? parseInt(bot) : null
        })
      )
    }
  } else {
    if (typeof botItem != 'object') return botItem

    r = await client.get(rStr + botItem.id)

    r = Object.assign(botItem, {
      status: r ? 'online' : 'offline',
      startTime: r ? parseInt(r) : null
    })
  }

  console.log(r)

  return r
}
