/**
 * Audit
 * 审核事件
 */

const { Schema, model } = require('mongoose');

module.exports = model('Audit', new Schema({
    eid: {
        type: String,
        require: true
    },
    uid: {
        type: String,
        require: true
    },
    // certificate | others
    type: {
        type: String,
        require: true
    },
    // todo | done
    status: {
        type: String,
        require: true
    },
    result: {
        type: Number
    },
    createTime: {
        type: Date,
        require: true
    },
    operateTime: {
        type: Date
    },
    oid: {
        type: String
    }
}))