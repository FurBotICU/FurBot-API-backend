/**
 * 获取 Bot 程序列表
 */

// 引入类型
const { Request, Response } = require('express');

// 引入控制器
const { getProgram } = require('../../../common/program');

// 引入数据模型
const Developer = require('../../../schemas/Developer');

/**
 * 获取 Bot 程序列表
 * @param {Request} req 
 * @param {Response} res
 */
module.exports = async function (req, res) {

    let { uid, uname } = req.query;

    if (uid && uname) {
        res.send({
            code: -402,
            msg: 'uid 和 uname 只能选其一'
        });
        return;
    }

    let r;

    if (uname) {
        
        r = await Developer.findOne({name: uname});

        if (!r) {
            res.send({
                code: -404,
                msg: "未找到对应开发者"
            });
            return;
        }

        uid = r.id;

    }

    r = await getProgram({
        $in: {
            contributor: uid
        }
    });

    res.send({
        code: 200,
        msg: null,
        data: r
    })

}