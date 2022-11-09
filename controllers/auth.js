/**
 * 通用身份认证
 */

// 引入类型
const { Request, Response } = require('express');

// 引入数据模型
const Developer = require('../schemas/Developer');

module.exports = {

    // OAuth登录换取userInfo
    oauth: {

        /**
         * GitHub OAuth
         * @param {Object} userInfoObj OAuth返回数据
         * @param {Request} req express.req 用于设置session
         */
        github: async (userInfoObj, req) => {
    
            let r;
    
            if (process.env.dev) console.log(`OAuth 登录请求: GitHub - ${userInfoObj.name}`);
    
            let queryObject = {
                name: userInfoObj.name
            };
    
            // 查找用户
            r = await Developer.findOne(queryObject, {
                _id: 0,
                __v: 0
            });
    
            // 新用户注册（？
            if (!r) {
                let userInfo = {
                    createDate: new Date()
                }
                Object.assign(userInfo, userInfoObj);
                try {
                    r = await Developer.create(userInfo);
                } catch (error) {
                    console.log(error);
                }
            }
    
            req.session.userInfo = r;
    
            return;
        }

    }


}