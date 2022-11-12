/**
 * App 密钥管理
 * /secret
 */

// 初始化路由
const router = require('express').Router();

// 引入控制器
const secretCtrl = require('../../controllers/manage/secret');

router.get('/list', secretCtrl.getSecretList);
router.post('/add', secretCtrl.genSecret);
router.post('/delete', secretCtrl.deleteSecret);

module.exports = router;