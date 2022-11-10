/**
 * OAuth
 * /oauth
 */

const router = require('express').Router();

const githubCtrl = require('../controllers/oauth/github');

router.get('/github', githubCtrl.request);
router.get('/github/callback', githubCtrl.callback);

module.exports = router;