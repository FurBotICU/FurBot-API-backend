// 引入库
const express = require('express');

// 初始化路由
const router = express.Router();

router.get('/', async (req, res) => {
    res.send({
        code: 0,
        msg: 'okkkkk'
    })
});


module.exports = router;