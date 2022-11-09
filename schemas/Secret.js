/**
 * Secret
 */

const { Schema, model } = require('mongoose');

module.exports = model('Secret', new Schema({
    developer: String,
    desc: String,
    expires: Number,
    botId: String,
    appId: {
        type: String,
        unique: true
    },
    secret: String
}))