/**
 * Program
 */

const { Schema, model } = require('mongoose');

module.exports = model('Program', new Schema({
    id: {
        type: String,
        unique: true
    },
    nick: String,
    name: {
        type: String,
        unique: true
    },
    intro: String,
    repo: String,
    contributor: [String]
}))