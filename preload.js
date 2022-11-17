/**
 * 初始化前的预处理
 */

import simpleflakes from 'simpleflakes'
const { simpleflake } = simpleflakes
import { writeFileSync } from 'fs'

export default () => {
  // 初始化环境变量
  if (process.env.NODE_ENV == 'development') process.env.dev = 1

  // console.log(`

  //       Author: 玖叁 @colour93
  //       GitHub: https://github.com/colour93
  // `)
  if (process.env.dev) {
    console.log('当前为开发环境')
    console.log(
      '风险警示: 非开发用途请勿使用dev环境，该环境具有随机固定token用于接口测试'
    )

    // 生成随机token
    const token = simpleflake().toString(16)
    writeFileSync('.temp.json', JSON.stringify({ token }))

    console.log(`token: ${token}`)
  }
}
