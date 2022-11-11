/**
 * 管理路由索引
 * /manage
 */

// 初始化路由
const router = require('express').Router();

// 子路由
const developerRouter = require('./developer');
const programRouter = require('./program');

// 中间件
const authMiddle = require('../../middlewares/auth');

router.use('/developer', developerRouter);
router.use('/program', authMiddle.cert, programRouter)

router.get('/', async (req, res) => {
    res.send({
        code: 200,
        msg: 'okkkkk'
    })
});

module.exports = router;