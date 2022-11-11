/**
 * Bot 管理
 */

// 引入类型
const { Request, Response } = require('express');

// 引入库
const path = require('path');

// 引入数据模型
const Series = require('../../schemas/Series');
const Bot = require('../../schemas/Bot');

// 引入通用控制器
const botCtrl = require('../../common/bot');

module.exports = {

    /**
     * 获取 Bot 系列列表
     * @param {Request} req 
     * @param {Response} res
     */
    async getBotSeries(req, res) {

        const { uid } = req.session;

        let r;

        r = await botCtrl.getBotSeries({ maintainer: uid });

        res.send(r);

    },

    /**
     * 增加 Bot 系列列表
     * @param {Request} req 
     * @param {Response} res
     */
    async addBotSeries(req, res) {

        const { uid } = req.session;
        const { name } = req.body;

        let r;

        r = await botCtrl.addBotSeries({
            maintainer: uid,
            name
        });

        res.send(r);

    },

    /**
     * 更新 Bot 系列列表
     * @param {Request} req 
     * @param {Response} res
     */
    async updateBotSeries(req, res) {

        const { uid } = req.session;
        const { sid, name } = req.body;

        let r;

        r = await botCtrl.updateBotSeries({
            maintainer: uid,
            id: sid
        }, {
            $set: {
                name
            }
        })

        res.send(r);

    },

    /**
     * 删除 Bot 系列列表
     * @param {Request} req 
     * @param {Response} res
     */
    async deleteBotSeries(req, res) {

        const { uid } = req.session;
        const { sid } = req.body;

        let r;

        r = await botCtrl.deleteBotSeries({
            maintainer: uid,
            id: sid
        })

        res.send(r);

    },

    /**
     * 获取当前开发者 Bot 列表
     * @param {Request} req 
     * @param {Response} res
     */
    async getBotList(req, res) {

        const { uid } = req.session;

        let r;

        r = await botCtrl.getBotList({
            maintainer: uid
        });

        res.send(r);

    },

    /**
     * 通过 Bot ID 获取 Bot 详情
     * @param {Request} req 
     * @param {Response} res
     */
    async getBotById(req, res) {

        const { bid } = req.query;

        if (!bid) {
            res.send({
                code: -402,
                msg: "参数不完整"
            });
            return;
        }

        let r;

        r = await botCtrl.getBot({
            id: bid
        });

        res.send(r);

    },

    /**
     * 增加 Bot
     * @param {Request} req 
     * @param {Response} res
     */
    async addBot(req, res) {

        const { uid } = req.session;
        const { qq, name, intro, series, program } = req.body;

        let r;

        r = await botCtrl.addBot({
            maintainer: uid,
            qq,
            name,
            intro,
            series,
            program
        })

        res.send(r);

    },

    /**
     * 更新 Bot
     * @param {Request} req 
     * @param {Response} res
     */
    async updateBot(req, res) {

        const { uid } = req.session;
        const { bid, qq, name, intro, series, program } = req.body;

        let r;

        r = await botCtrl.updateBot({
            id: bid,
            maintainer: uid
        }, {
            qq,
            name,
            intro,
            series,
            program
        })

        res.send(r);

    },

    /**
     * 删除 Bot 系列列表
     * @param {Request} req 
     * @param {Response} res
     */
    async deleteBot(req, res) {

        const { uid } = req.session;
        const { bid } = req.body;

        let r;

        r = await botCtrl.deleteBot({
            maintainer: uid,
            id: bid
        });

        res.send(r);

    }


}