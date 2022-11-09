/**
 * Redis 服务
 */

// 引入库
const redis = require('redis');

// 引入配置文件
const {host, port, pwd} = require('./config.json').redis;

// 连接Redis
console.log("初始化 Redis 连接");

const client = redis.createClient({
    socket: {
        host,
        port
    },
    password: pwd,
    legacyMode: true
})

function connect () {
    return new Promise (async (resolve, reject) => {
        
        client.connect();
        
        client.on('ready', async(e) => {
            console.log('Redis 连接成功')
            resolve();
        })
        
        client.on('error', async(err) => {
            console.error(err);
            resolve();
        })

    })

}

// 暴露接口
module.exports = {
    connect,
    client
};