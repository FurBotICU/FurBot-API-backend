/**
 * Developer
 */

const { Schema, model } = require('mongoose');

module.exports = model('Developer', new Schema({
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
        default: "developer"
    },
    avatar: String,
    email: String,
    qq: Number,
    createDate: Date
}))