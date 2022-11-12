/**
 * 身份验证 中间件
 */

// 引入库
const { Request, Response, next } = require('express');

// 引入数据模型
const Developer = require('../schemas/Developer');

module.exports = {

    /**
     * 判断登录态
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     */
    async status(req, res, next) {

        // 排除 /manage/developer/login
        if (req.path != '/developer/login') {

            if (!req.session.uid) {
                res.send({
                    code: -401,
                    msg: "未登录"
                });
                return;
            }

            let r = await Developer.findOne({ id: req.session.uid });

            if (!r) {
                req.session.uid = null;
                res.send({
                    code: -401,
                    msg: "账号不存在"
                });
                return;
            }

        }


        // 跳回
        next();
    },

    /**
     * 验证是否认证
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     */
    async cert(req, res, next) {

        const r = await Developer.findOne({
            id: req.session.uid
        })

        if (!r || !r.certificate) {
            res.send({
                code: -403,
                msg: "账户未认证，前面的区域，以后再来探索吧！"
            });
            return;
        }

        // 跳回
        next();
    },

    /**
     * 验证身份
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     */
    async verify(req, res, next) {

        const r = await Developer.findOne({
            id: req.session.uid
        })

        if (!r || r.role != 'admin') {
            res.send({
                code: -403,
                msg: "无权访问"
            });
            return;
        }

        // 跳回
        next();
    },

    /**
     * 验证签名
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     */
    async verifySign(req, res, next) {

        
        next();

    }

}