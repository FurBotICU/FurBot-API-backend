/**
 * Secret
 */

import { Schema, model } from 'mongoose'

export default model('Secret', new Schema({
  maintainer: String,
  desc: String,
  expires: Number,
  bid: String,
  appId: {
    type: String,
    unique: true
  },
  secret: String,
  createTime: Date
}))