/**
 * Secret
 */

const { Schema, model } = require('mongoose');

module.exports = model('Secret', new Schema({
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