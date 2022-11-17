/**
 * FurBot-API
 * @author colour93 <colour_93@furry.top>
 */

// 加载预处理
require('./preload');

// 初始化
init();

async function init () {

    // 先初始化redis
    const redis = require('./redis');
    await redis.connect();

    // 继而初始化mongo
    const mongo = require('./mongo');
    await mongo.connect();

    // 最后初始化express
    const express = require('./express');

    // 挂载退出监控
    require('./exit');
}