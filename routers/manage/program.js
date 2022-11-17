/**
 * Bot 程序管理
 * /program
 */

// 初始化路由
const router = require('express').Router();

// 引入控制器
const programCtrl = require('../../controllers/manage/program');

router.get('/list', programCtrl.getProgramList);
router.post('/add', programCtrl.addProgram);
router.post('/update', programCtrl.updateProgram);
router.post('/delete', programCtrl.deleteProgram);

module.exports = router;