/**
 * 通用控制器
 * Bot
 */

// 引入库
const { simpleflake } = require('simpleflakes');

const regex = require('../utils/regex');

// 引入数据模型
const Series = require('../schemas/Series');
const Bot = require('../schemas/Bot');
const Program = require('../schemas/Program');

module.exports = {

    /**
     * 获取 Bot 系列列表
     * @param {Object} query
     * @return {Object}
     */
    async getBotSeries(query) {

        let r;

        r = await Series.find(query, {
            _id: 0,
            __v: 0
        });

        return {
            code: 200,
            msg: null,
            data: r
        }

    },

    /**
     * 增加 Bot 系列列表
     * @param {Object} data
     * @return {Object}
     */
    async addBotSeries(data) {

        let r;

        const { name, maintainer } = data;

        if (typeof name != 'string') return {
            code: -402,
            msg: "参数不正确"
        };

        r = await Series.create({
            id: simpleflake().toString(36),
            name,
            maintainer,
            createTime: new Date()
        });

        return {
            code: 200,
            msg: null,
            data: {
                sid: r.id
            }
        }

    },

    /**
     * 更新 Bot 系列列表
     * @param {Object} query 自定义 query，可以是 id 也可以是 name
     * @param {Object} data
     * @return {Object}
     */
    async updateBotSeries(query, data) {

        let r;

        r = await Series.findOneAndUpdate(query, data, {
            new: true,
            projection: {
                __v: 0,
                _id: 0
            }
        });

        if (!r) return {
            code: -404,
            msg: "未找到对应系列"
        }

        return {
            code: 200,
            msg: null,
            data: r
        }

    },

    /**
     * 删除 Bot 系列列表
     * @param {Object} query
     * @return {Object}
     */
    async deleteBotSeries(query) {

        let r;

        r = await Series.findOneAndDelete(query);

        if (!r) return {
            code: -404,
            msg: "未找到对应系列"
        }

        return {
            code: 200,
            msg: null
        }

    },

    /**
     * 获取 Bot
     * @param {Object} query
     * @return {Object}
     */
    async getBot(query) {

        let r;

        r = await Bot.findOne(query, {
            _id: 0,
            __v: 0
        });

        if (!r) return {
            code: -404,
            msg: "未找到对应 Bot"
        }

        return {
            code: 200,
            msg: null,
            data: r
        }

    },

    /**
     * 获取 Bot 列表
     * @param {Object} query
     * @return {Object}
     */
    async getBotList(query) {

        let r;

        r = await Bot.find(query, {
            _id: 0,
            __v: 0
        });

        return {
            code: 200,
            msg: null,
            data: r
        }

    },

    /**
     * 增加 Bot
     * @param {Object} data
     * @return {Object}
     */
    async addBot(data) {

        let r;

        const { qq, name, intro, series, maintainer, program } = data;

        if (
            typeof qq != 'number' ||
            typeof name != 'string' ||
            typeof maintainer != 'string' ||
            (program && typeof program != 'object') ||
            (
                series &&
                (
                    typeof series != 'object' ||
                    typeof series.id != 'string' ||
                    typeof series.serialId != 'number'
                )

            )
        ) return {
            code: -402,
            msg: "参数不正确"
        };

        let type = series ? 'series' : 'single';

        if (series) {

            // 先判断 series 是否存在
            r = await Series.findOne({
                id: series.id
            });

            if (!r) return {
                code: -404,
                msg: "未找到对应系列"
            };

            // 再判断是否有重复 serialId
            r = await Bot.findOne({
                series
            });

            if (r) return {
                code: -402,
                msg: "该系列已存在重复系列ID"
            }

        }

        if (program) {

            for (const [index, item] of Object.entries(program)) {

                r = await Program.findOne({
                    id: item
                });

                if (!r) return {
                    code: -404,
                    msg: "包含如下不存在的 Bot 程序",
                    data: {
                        pid: item
                    }
                }

            }

        }

        r = await Bot.create({
            id: simpleflake().toString(36),
            qq,
            name,
            intro,
            type,
            series,
            maintainer,
            program,
            createTime: new Date()
        });

        return {
            code: 200,
            msg: null,
            data: {
                bid: r.id
            }
        }

    },

    /**
     * 更新 Bot
     * @param {Object} query
     * @param {Object} data
     * @return {Object}
     */
    async updateBot(query, data) {

        let r;

        const maintainer = query.maintainer || data.maintainer;

        const { qq, name, intro, series, program } = data;

        if (
            (qq && typeof qq != 'number') ||
            (name && typeof name != 'string') ||
            (maintainer && typeof maintainer != 'string') ||
            (program && typeof program != 'object') ||
            (
                series &&
                (
                    typeof series != 'object' ||
                    typeof series.id != 'string' ||
                    typeof series.serialId != 'number'
                )

            )
        ) return {
            code: -402,
            msg: "参数不正确"
        };

        let type = series ? 'series' : 'single';

        if (series) {

            // 先判断 series 是否存在
            r = await Series.findOne({
                id: series.id
            });

            if (!r) return {
                code: -404,
                msg: "未找到对应系列"
            };

            // 再判断是否有重复 serialId
            r = await Bot.findOne({
                series
            });

            if (r) return {
                code: -402,
                msg: "该系列已存在重复系列ID"
            }

        }

        if (program) {

            for (const [index, item] of Object.entries(program)) {

                r = await Program.findOne({
                    id: item
                });

                if (!r) return {
                    code: -404,
                    msg: "包含如下不存在的 Bot 程序",
                    data: {
                        pid: item
                    }
                }

            }

        }

        r = await Bot.findOneAndUpdate(query, {
            qq,
            name,
            intro,
            type,
            series,
            maintainer,
            program
        }, {
            new: true,
            projection: {
                _id: 0,
                __v: 0
            }
        });

        return {
            code: 200,
            msg: null,
            data: r
        }

    },

    /**
     * 删除 Bot 系列列表
     * @param {Object} query
     * @return {Object}
     */
    async deleteBot(query) {

        let r;

        r = await Bot.findOneAndDelete(query);

        if (!r) return {
            code: -404,
            msg: "未找到对应 Bot"
        }

        return {
            code: 200,
            msg: null
        }

    },

}