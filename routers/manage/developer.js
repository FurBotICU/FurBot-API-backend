/**
 * 开发者管理
 * /developer
 */

// 初始化路由
const router = require('express').Router();

// 引入控制器
const developerCtrl = require('../../controllers/manage/developer');

router.get('/login', developerCtrl.login);
if (process.env.dev) router.post('/login', developerCtrl.devLogin);
router.get('/logout', developerCtrl.logout);
router.post('/destroy', developerCtrl.destroyAccount);

router.get('/info', developerCtrl.getInfo);
router.post('/info/update', developerCtrl.updateInfo);

router.get('/certificate/status', developerCtrl.getCertificate);
router.post('/certificate/submit', developerCtrl.submitCertificate);

module.exports = router;