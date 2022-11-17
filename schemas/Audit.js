/**
 * Audit
 * 审核事件
 */

import { Schema, model } from 'mongoose'

export default model('Audit', new Schema({
  eid: {
    type: String,
    require: true
  },
  uid: {
    type: String,
    require: true
  },
  // certificate | others
  type: {
    type: String,
    require: true
  },
  // todo | done
  status: {
    type: String,
    require: true
  },
  result: {
    type: Number
  },
  createTime: {
    type: Date,
    require: true
  },
  operateTime: {
    type: Date
  },
  oid: {
    type: String
  }
}))