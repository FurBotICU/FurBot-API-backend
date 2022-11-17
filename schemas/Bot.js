/**
 * Bot
 */

import { Schema, model } from 'mongoose'

export default model('Bot', new Schema({
  id: {
    type: String,
    unique: true
  },
  qq: {
    type: Number,
    unique: true
  },
  name: String,
  intro: String,
  // single | series
  type: {
    type: String,
    require: true
  },
  series: {
    id: String,
    serialId: Number
  },
  maintainer: String,
  program: [String],
  createTime: Date
}))