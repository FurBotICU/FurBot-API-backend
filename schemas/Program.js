/**
 * Program
 */

import { Schema, model } from 'mongoose'

export default model(
  'Program',
  new Schema({
    id: {
      type: String,
      unique: true
    },
    nick: {
      type: String,
      require: true
    },
    name: {
      type: String,
      unique: true
    },
    intro: String,
    repo: {
      type: String,
      unique: true
    },
    contributor: [String],
    createTime: Date
  })
)
