/**
 * Bot
 */

const { Schema, model } = require('mongoose');

module.exports = model('Bot', new Schema({
    id: {
        type: String,
        unique: true
    },
    qq: Number,
    name: String,
    intro: String,
    // single | series
    type: String,
    series: {
        id: String,
        serialId: Number
    },
    maintainer: String,
    program: [String]
}))