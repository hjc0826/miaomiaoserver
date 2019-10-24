var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 登陆验证
router.post('/login',userController.login);
router.post('/register',userController.register);
// 验证码邮箱
router.get('/verify',userController.verify);
// 验证重名
router.get('/verifyNm',userController.verifyNm);
router.get('/logout',userController.logout);
router.post('/getUser',userController.getUser);
router.post('/findPassword',userController.findPassword);

module.exports = router;
