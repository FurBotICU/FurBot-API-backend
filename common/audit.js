/**
 * 通用控制器
 * 审核事件
 */

// 引入库
const { simpleflake } = require('simpleflakes');

const filter = require('../utils/filter');

// 引入数据模型
const Audit = require('../schemas/Audit');

module.exports = {

    /**
     * 新增事件
     * @param {String} uid 用户id
     * @param {String} type 类型
     * @return {Object}
     */
    async addAudit(uid, type) {

        if (
            typeof uid != 'string' ||
            typeof type != 'string'
        ) return {
            code: -402,
            msg: "参数错误"
        }

        let r;

        // 先查询是否有同类型申请
        if (type == 'certificate' || type == 'destroy') {

            r = await this.getAudit({
                uid,
                type
            });

            console.log(r);

            if (r.code != -404) {

                if (r.code != 200) return r;

                for (let [index, item] of Object.entries(r.data)) {
                    if (item.status == 'todo') return {
                        code: -411,
                        msg: "已存在未审核的该类型申请",
                        data: {
                            eid: item.eid
                        }
                    }
                }

            }

        }

        r = await Audit.create({
            eid: simpleflake().toString(),
            uid,
            type,
            status: "todo",
            createTime: new Date()
        })

        return {
            code: 200,
            msg: null,
            data: {
                eid: r.eid
            }
        }

    },

    /**
     * 获取所有事件
     * @param {Object} query
     * @param {Object} options
     * @return {Object}
     */
    async getAudit(query, options) {

        let r;

        query = filter.filterUndefined(query);

        if (!options) options = {};

        Object.assign(options, { _id: 0, __v: 0 });

        r = await Audit.find(query, options);

        if (r.length == 0) return {
            code: -404,
            msg: "什么也没找到"
        }

        return {
            code: 200,
            msg: null,
            data: r
        }
    },

    /**
     * 操作事件
     * @param {String} eid 事件id
     * @param {String} oid 操作者id
     * @param {Number} result 操作结果
     * @return {Object}
     */
    async operateAudit(eid, oid, result) {

        if (
            typeof eid != 'string' ||
            typeof oid != 'string' ||
            typeof result != 'number'
        ) return {
            code: -402,
            msg: "参数错误"
        }

        let r;

        // 获取 event 的 status
        r = this.getAudit({ eid });

        if (r.code != 200) return r;

        if (r.data[0].status == 'done') return {
            code: -411,
            msg: "该申请已操作"
        }

        r = await Audit.updateOne({
            eid
        }, {
            $set: {
                oid,
                status: 'done',
                result,
                operateTime: new Date()
            }
        }, {
            new: true
        });

        if (!r) return {
            code: -420,
            msg: "数据库操作出错"
        }

        return {
            code: 200,
            msg: null,
            data: {
                eid,
                result: r.result
            }
        }

    }

}