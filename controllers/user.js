var mongoose = require('mongoose');
var MongoClient = require("mongodb").MongoClient;

var {
	Email
} = require('../untils/config.js')

// 登陆验证
var login = async (req, res) => {
	console.log(req.body)
	console.log(1)
	var url = 'mongodb://localhost:27017/miaomiao';
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, function(err, db) {
		if (err) {
			console.log("数据库连接失败");
			return;
		}
		console.log("数据库链接成功");
	
		//插入数据
		db.collection("user").findOne({
			"name": req.body.name,
			"password": req.body.password
		}, function(err, result) {
			if (err) {
				return;
			}
			console.log(result);
			if(result !== null){
			res.json({
				msg: 'ok',
				status: 0,
				info : result
			})
			}
			else{
				res.json({
					msg: '错误了',
					status: -1
				})
			}
			db.close();
		});
		
		
	});
}

var register = async (req, res) => {
	console.log(req.body)
	var url = 'mongodb://localhost:27017/miaomiao';
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, function(err, db) {
		if (err) {
			console.log("数据库连接失败");
			return;
		}
		console.log("数据库链接成功");

		//插入数据
		db.collection("user").insertOne({
			"name": req.body.name,
			"sex": req.body.sex,
			"password": req.body.password
		}, function(err, result) {
			if (err) {
				return;
			}
			console.log(result);
			res.json({
				msg: 'ok',
				status: 0
			})
			db.close();
		});
	});
}

// 查询重名接口
var verifyNm = async (req, res) => {
	console.log(req.query)
	var url = 'mongodb://localhost:27017/miaomiao';
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, function(err, db) {
		if (err) {
			console.log("数据库连接失败");
			return;
		}
		console.log("数据库链接成功");

		//插入数据
		db.collection("user").findOne({
			name: req.query.name
		}, function(err, result) {
			if (err) {
				return
			}
			console.log(result)
			if (result !== null) {
				res.send({
					msg: "ok",
					status: 0
				})
			}
			else{
				res.send({
					msg :'未查询到',
					status:-1
				})
			}
			db.close()
		})
	});
}



var verify = async (req, res) => {

	var email = req.query.email;

	Email.transporter.sendMail({
		from: '喵喵发送邮件👻', // sender address
		to: email, // list of receivers
		subject: '喵喵邮箱验证码 ✔', // Subject line
		text: '验证码' + Email.verify, // plain text body
	}, err => {
		if (err) {
			console.log(err)
			res.send({
				msg: '发送失败',
				status: -1
			})
		} else {
			res.send({
				msg: '发送成功',
				status: 0
			})
		}
	});

}
var logout = async (req, res) => {

}
var getUser = async (req, res) => {

}
var findPassword = async (req, res) => {

}

module.exports = {
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword,
	verifyNm
}
