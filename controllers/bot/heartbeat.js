/**
 * 心跳包
 */

// 引入类型
const { Request, Response } = require('express');

/**
 * 心跳包
 * @param {Request} req 
 * @param {Response} res
 */
module.exports = async function (req, res) {

    const { appId, bid, uid } = req;

    res.send({
        code: 200,
        msg: null,
        data: {
            appId,
            bid,
            uid
        }
    })
    
}