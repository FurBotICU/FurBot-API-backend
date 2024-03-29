/**
 * 通用控制器
 * Bot 程序
 */

// 引入库
import simpleflakes from 'simpleflakes'
const { simpleflake } = simpleflakes

import { commonName } from '../utils/regex.js'
import { filterUndefined } from '../utils/filter.js'

// 引入数据模型
import Program from '../schemas/Program.js'
const { create, find, findOneAndUpdate, findOneAndDelete } = Program
/**
 * 新增 Bot 程序
 * @param {Object} data
 * @return {Object}
 */
export async function addProgram(data) {
  const { nick, name, intro, repo, contributor } = data

  if (
    typeof nick != 'string' ||
    typeof name != 'string' ||
    typeof contributor != 'string'
  )
    return {
      code: -402,
      msg: '参数错误'
    }

  if (!commonName.test(name))
    return {
      code: -402,
      msg: '名称不符合要求'
    }

  let r

  try {
    r = await create({
      id: simpleflake().toString(36),
      nick,
      name,
      intro,
      repo,
      contributor: [contributor],
      createTime: new Date()
    })
  } catch (error) {
    if (error._message == 'Validation failed') {
      return {
        code: -422,
        msg: '程序名称重复'
      }
    }
  }

  console.log(`增加 Bot 程序: ${contributor} - ${r.name} (${r.id})`)

  return {
    code: 200,
    msg: null,
    data: {
      pid: r.id
    }
  }
}
/**
 * 获取 Bot 程序
 * @param {Object} query
 * @param {Object} options
 * @return {Object}
 */
export async function getProgram(query, options) {
  let r

  query = filterUndefined(query)

  if (!options) options = {}

  Object.assign(options, { _id: 0, __v: 0 })

  r = await find(query, options)

  return {
    code: 200,
    msg: null,
    data: r
  }
}
/**
 * 更新 Bot 程序
 * @param {Object} query 自定义 query，可以是 id 也可以是 name
 * @param {Object} data
 * @return {Object}
 */
export async function updateProgram(query, data) {
  let r

  const { nick, name, intro, repo } = data

  try {
    r = await findOneAndUpdate(
      query,
      {
        $set: {
          nick,
          name,
          intro,
          repo
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
  } catch (error) {
    if (error._message == 'Validation failed') {
      return {
        code: -422,
        msg: '程序名称重复'
      }
    }
  }

  if (!r)
    return {
      code: -404,
      msg: '未找到对应程序'
    }

  console.log(
    `更新 Bot 程序: ${query.maintainer ? query.maintainer : ''} ${r.name} (${
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
 * 删除 Bot 程序
 * @param {Object} query 自定义 query，可以是 id 也可以是 name
 * @return {Object}
 */
export async function deleteProgram(query) {
  let r

  r = await findOneAndDelete(query)

  if (!r)
    return {
      code: -404,
      msg: '未找到对应程序'
    }

  console.log(
    `更新 Bot 程序: ${query.maintainer ? query.maintainer : ''} ${r.name} (${
      r.id
    })`
  )

  return {
    code: 200,
    msg: null
  }
}
