/**
 * 捏 过滤器
 */

export function filterUndefined(origin) {
  let temp = {}
  for (let [key, value] of Object.entries(origin)) {
    if (typeof value == 'object') {
      value = filterUndefined(value)
      if (Object.keys(value).length == 0) continue
    }
    if (typeof value != 'undefined') {
      temp[key] = value
    }
  }
  return temp
}
