// 引入库
const express = require('express');

// 初始化路由
const router = express.Router();

// 子路由
const manageRouter = require('./manage');
const oauthRouter = require('./oauth');
const botRouter = require('./bot');

// 中间件
const authMiddle = require('../middlewares/auth');

router.use('/manage', authMiddle.status, manageRouter);
router.use('/oauth', oauthRouter);
router.use('/bot', authMiddle.verifySign, botRouter);

router.get('/', async (req, res) => {
    res.redirect("https://dash.api.furbot.icu");
});

module.exports = router;