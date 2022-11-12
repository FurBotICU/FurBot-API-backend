/**
 * 状态类
 * /status
 */

const getBotProgramList = require('../controllers/status/getBotProgramList');
const getBotProgram = require('../controllers/status/getBotProgram');
const getBotList = require('../controllers/status/getBotList');
const getBot = require('../controllers/status/getBot');

const router = require('express').Router();

router.get('/getBotProgramList', getBotProgramList);
router.get('/getBotProgram', getBotProgram);
router.get('/getBotList', getBotList);
router.get('/getBot', getBot);

module.exports = router;