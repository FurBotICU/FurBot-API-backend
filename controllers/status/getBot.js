/**
 * 获取 Bot
 */

// 引入类型
const { Request, Response } = require('express');

// 引入控制器
const { getBot } = require('../../common/bot');

/**
 * 获取 Bot
 * @param {Request} req 
 * @param {Response} res
 */
module.exports = async function (req, res) {

    const { bid, qq } = req.query;

    let r;

    const query = {
        id: bid,
        qq
    };

    r = await getBot(query);

    res.send(r);

}