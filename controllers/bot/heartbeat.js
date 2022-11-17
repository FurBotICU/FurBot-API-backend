/**
 * 心跳包
 */

// 引入类型
const { Request, Response } = require('express');

// 引入数据模型
const { client } = require('../../redis');

/**
 * 心跳包
 * @param {Request} req 
 * @param {Response} res
 */
module.exports = async function (req, res) {

    const now = (new Date()).getTime();

    const { appId, bid, uid } = req;

    let r, ex;

    const rStr = `furbot-api:bot:${bid}`;

    // 判断是否存在
    r = await client.get(rStr);

    const ts = r ? r : now;

    r = await client.set(rStr, ts, {EX: 40});

    if (r != 'OK') {
        res.send({
            code: -500,
            msg: "服务器内部错误"
        });
        console.log(r);
        return;
    }

    res.send({
        code: 200,
        msg: null,
        data: {
            next_interval: 30,
            expires: now + 40 * 1000
        }
    })
    
}