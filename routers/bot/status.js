/**
 * 状态类
 * /status
 */

const getBotProgramList = require('../../controllers/bot/status/getBotProgramList');
const getBotProgram = require('../../controllers/bot/status/getBotProgram');
const getBotList = require('../../controllers/bot/status/getBotList');
const getBot = require('../../controllers/bot/status/getBot');

const router = require('express').Router();

router.get('/getBotProgramList', getBotProgramList);
router.get('/getBotProgram', getBotProgram);
router.get('/getBotList', getBotList);
router.get('/getBot', getBot);

module.exports = router;