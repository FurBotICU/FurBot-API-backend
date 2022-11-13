/**
 * Series
 */

const { Schema, model } = require('mongoose');

module.exports = model('Series', new Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    maintainer: String,
    createTime: Date
}))