var mongoose = require('mongoose');
var nodemailer = require('nodemailer')

// 连接数据库
var Mongoose = {
	url: 'mongodb://localhost:27017/miaomiao',
	connect() {
		mongoose.connect(this.url, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		}, err => {
			if (err) {
				console.log('数据连接失败')
				return
			}
			console.log('数据库连接成功')
		})
	}
}

// 发送邮箱验证码
var Email = {
	config:{
		host: 'smtp.qq.com',
		port: 587,
		auth: {
		    user: '465805993@qq.com', // generated ethereal user
		    pass: 'plhyjfvyeptdcbeb' // generated ethereal password
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config)
	},
	get verify(){
		return Math.random().toString().substring(2,6)
	}
}
module.exports = {
	Mongoose,
	Email
}
