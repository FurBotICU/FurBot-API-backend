/**
 * 管理路由索引
 * /manage
 */

// 初始化路由
const router = require('express').Router();

// 子路由
const developerRouter = require('./developer');

router.use('/developer', developerRouter);

router.get('/', async (req, res) => {
    res.send({
        code: 200,
        msg: 'okkkkk'
    })
});

module.exports = router;