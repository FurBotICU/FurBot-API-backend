/**
 * Developer
 */

import { Schema, model } from 'mongoose'

export default model('Developer', new Schema({
  id: {
    type: String,
    unique: true
  },
  nick: String,
  name: {
    type: String,
    unique: true
  },
  certificate: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'developer'
  },
  avatar: String,
  email: String,
  qq: Number,
  createTime: Date
}))