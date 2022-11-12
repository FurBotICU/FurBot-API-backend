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
    repo: {
        type: String,
        unique: true
    },
    contributor: [String],
    createTime: Date
}))