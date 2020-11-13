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

function send (mail, code) {
  // send mail with defined transport object
  let info = {
    from: '"Fred Foo 👻" <1697965700@qq.com>', // sender address
    // to: '1697965700@qq.com, 244772935@qq.com', // list of receivers
    to: mail, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: `您的验证码是${code}，有效期五分钟。`, // plain text body
    // text: 123456, // plain text body
    // html: '<b>Hello world?</b>', // html body
  }
  // 发送邮件异步的要用promise处理
  return new Promise((resolve,reject)=>{
    transporter.sendMail(info, (err, data) => {
      if(err){
        reject()
      }else{
        resolve()
      }
    })
  })

}
module.exports = { send }
