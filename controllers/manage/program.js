/**
 * Bot 程序管理
 */

// 引入类型
const { Request, Response } = require('express');

// 引入通用控制器
const programCtrl = require('../../common/program');

module.exports = {

    /**
     * 获取当前帐号注册的程序列表
     * @param {Request} req 
     * @param {Response} res
     */
    async getProgramList(req, res) {

        const { uid } = req.session;

        let r;

        r = await programCtrl.getProgram({
            $in: {
                contributor: uid
            }
        });

        res.send(r);

    },

    /**
     * 增加 Bot 程序
     * @param {Request} req 
     * @param {Response} res
     */
    async addProgram(req, res) {

        const { uid } = req.session;

        const { name, nick, intro, repo } = req.body;

        let r;

        r = await programCtrl.addProgram({
            name,
            nick,
            intro,
            repo,
            contributor: uid
        });

        res.send(r);

    },

    /**
     * 更新 Bot 程序信息
     * @param {Request} req 
     * @param {Response} res
     */
    async updateProgram(req, res) {

        const { uid } = req.session;

        const { pid, name, nick, intro, repo } = req.body;

        let r;

        r = await programCtrl.updateProgram({
            id: pid,
            $in: {
                contributor: uid
            }
        }, {
            name,
            nick,
            intro,
            repo
        });

        res.send(r);

    },

    /**
     * 删除 Bot 程序
     * @param {Request} req 
     * @param {Response} res
     */
    async deleteProgram(req, res) {

        let r;

        const { uid } = req.session;

        const { pid } = req.body;

        if (typeof pid != 'string') {
            res.send({
                code: -402,
                msg: "参数不正确"
            });
            return;
        }

        r = await programCtrl.deleteProgram({
            $in: {
                contributor: uid
            },
            id: pid
        });

        res.send(r);

    },


}