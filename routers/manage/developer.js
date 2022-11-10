/**
 * 开发者管理
 * /developer
 */

// 初始化路由
const router = require('express').Router();

// 引入控制器
const developerCtrl = require('../../controllers/manage/developer');

router.get('/login', developerCtrl.login);
router.get('/logout', developerCtrl.logout);
router.post('/destroy', );

router.get('/info', developerCtrl.getInfo);
router.post('/info/update', );

router.get('/certificate/status', );
router.post('/certificate/submit', );

module.exports = router;