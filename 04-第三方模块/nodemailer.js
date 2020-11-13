'use strict'
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '1697965700@qq.com', // generated ethereal user
    pass: 'tpfwvysrwydbdibb', // generated ethereal password
  },
})

// send mail with defined transport object
let info = {
  from: '"Fred Foo 👻" <1697965700@qq.com>', // sender address
  // to: '1697965700@qq.com, 244772935@qq.com', // list of receivers
  to: '1697965700@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: '您的验证码是123456，有效期五分钟。', // plain text body
  // text: 123456, // plain text body
  // html: '<b>Hello world?</b>', // html body
}

transporter.sendMail(info,(err,data)=>{
  console.log(err);
  console.log(data);
})
// 轰炸
// setInterval(()=>{
//   transporter.sendMail(info)
// },1000)
