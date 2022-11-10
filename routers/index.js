// 引入库
const express = require('express');

// 初始化路由
const router = express.Router();

// 子路由
const manageRouter = require('./manage');
const oauthRouter = require('./oauth');

// 中间件
const authMiddle = require('../middlewares/auth');

router.use('/manage', authMiddle.status, manageRouter);
router.use('/oauth', oauthRouter);

router.get('/', async (req, res) => {
    res.send({
        code: 200,
        msg: 'okkkkk'
    })
});

module.exports = router;