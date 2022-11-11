/**
 * Bot 管理
 * /bot
 */

// 初始化路由
const router = require('express').Router();

// 引入控制器
const botCtrl = require('../../controllers/manage/bot');

router.get('/series/list', botCtrl.getBotSeries);
router.post('/series/add', botCtrl.addBotSeries);
router.post('/series/update', botCtrl.updateBotSeries);
router.post('/series/delete', botCtrl.deleteBotSeries);

router.get('/list', botCtrl.getBotList);
router.get('/detail', botCtrl.getBotById);
router.post('/add', botCtrl.addBot);
router.post('/update', botCtrl.updateBot);
router.post('/delete', botCtrl.deleteBot);

module.exports = router;