/**
 * Bot API 索引路由
 * /bot
 */

// 初始化路由
const router = require('express').Router();

// 子路由
const statusRouter = require('./status');

// 控制器
const getToken = require('../../controllers/bot/getToken');
const heartbeat = require('../../controllers/bot/heartbeat');

router.use('/status', statusRouter);

router.post('/getToken', getToken);
router.post('/heartbeat', heartbeat);

module.exports = router;