/**
 * Series
 */

import { Schema, model } from 'mongoose'

export default model(
  'Series',
  new Schema({
    id: {
      type: String,
      unique: true
    },
    name: String,
    maintainer: String,
    createTime: Date
  })
)
