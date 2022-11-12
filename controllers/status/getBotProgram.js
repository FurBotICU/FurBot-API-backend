/**
 * 获取 Bot 程序
 */

// 引入类型
const { Request, Response } = require('express');

// 引入控制器
const { getProgram } = require('../../common/program');

/**
 * 获取 Bot 程序
 * @param {Request} req 
 * @param {Response} res
 */
module.exports = async function (req, res) {

    const { pid, pname, prepo } = req.query;

    let r;

    const query = {
        id: pid,
        name: pname,
        repo: prepo
    };

    r = await getProgram(query);

    if (r.data.length == 0) {
        res.send({
            code: -404,
            msg: "未找到对应程序"
        });
        return;
    }

    r.data = r.data[0];

    res.send(r);

}