/**
 * Program
 */

const { Schema, model } = require('mongoose');

module.exports = model('Program', new Schema({
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
    repo: String,
    contributor: [String],
    createTime: Date
}))