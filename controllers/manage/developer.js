/**
 * 开发者管理
 */

// 引入类型
const { Request, Response } = require('express');

// 引入数据模型
const Developer = require('../../schemas/Developer');

module.exports = {
    
    /**
     * 登录
     * @param {Request} req 
     * @param {Response} res
     */
    login: (req, res) => {
        res.redirect('/oauth/github');
    },
    
    /**
     * 登出
     * @param {Request} req 
     * @param {Response} res
     */
    logout: (req, res) => {
        req.session.destroy();
        res.send({
            code: 200,
            msg: null
        })
    },
    
    /**
     * 获取信息
     * @param {Request} req 
     * @param {Response} res 
     */
    getInfo: async (req, res) => {

        let r;

        const id = req.session.uid;

        r = await Developer.findOne({id}, {
            _id: 0,
            __v: 0
        });
        
        res.send({
            code: 200,
            msg: null,
            data: r
        })

    }

}